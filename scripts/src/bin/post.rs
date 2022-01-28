use color_eyre::{eyre::eyre, Result};
use dialoguer::{theme::ColorfulTheme, Confirm, Input, Select};
use scripts::{get_current_date, get_file_info, ContentType};
use serde::Serialize;
use std::{fs, path::PathBuf};

const TYPE_CHOICES: [&str; 2] = ["prose", "tutorial"];
const CATEGORY_CHOICES: [&str; 5] = ["Community", "Design", "Gatsby", "JavaScript", "React"];

const BODY_TEMPLATE: &str = r#"

Context: What are you talking about?
Relevance: Why should I care about that?
Application: How do I do it?

Learning goals => Assessment => Lesson Plan
"#;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Frontmatter {
    title: String,
    subtitle: String,
    date: String,
    last_updated: String,
    description: String,
    r#type: String,
    category: String,
    image: String,
    published: bool,
}

fn main() -> Result<()> {
    color_eyre::install()?;

    let theme = ColorfulTheme::default();
    let current_date = get_current_date();

    let title: String = Input::with_theme(&theme)
        .with_prompt("Title")
        .interact_text()?;

    let date: String = Input::with_theme(&theme)
        .with_prompt("Date")
        .default(current_date.to_string())
        .interact_text()?;

    let slug = slug::slugify(&title);

    let subtitle: String = Input::with_theme(&theme)
        .with_prompt("Subtitle")
        .allow_empty(true)
        .interact_text()?;

    let description: String = Input::with_theme(&theme)
        .with_prompt("Description")
        .interact_text()?;

    let chosen_type = Select::with_theme(&theme)
        .with_prompt("Pick a type")
        .items(&TYPE_CHOICES)
        .interact()
        .map(|choice| TYPE_CHOICES[choice])?;

    let chosen_category = Select::with_theme(&theme)
        .with_prompt("Pick an category")
        .items(&CATEGORY_CHOICES)
        .interact()
        .map(|choice| CATEGORY_CHOICES[choice])?;

    let (directory_path, filepath, filename): (PathBuf, PathBuf, String) =
        get_file_info(current_date.to_string(), slug, ContentType::Writing)?;

    let fm = Frontmatter {
        title,
        subtitle,
        date,
        last_updated: current_date.to_string(),
        description,
        r#type: chosen_type.to_string(),
        category: chosen_category.to_string(),
        image: String::from("file-name-inside-og-images-folder.png"),
        published: false,
    };

    let frontmatter = format!("{}---", serde_yaml::to_string(&fm)?);

    println!(
        r#"
The file "{}" will be created with:

{}
    "#,
        filename, frontmatter
    );

    if !Confirm::with_theme(&theme)
        .with_prompt("Do you want to continue?")
        .interact()?
    {
        return Err(eyre!("Aborting..."));
    }

    let file_content = format!("{}{}", frontmatter, BODY_TEMPLATE);

    fs::create_dir_all(directory_path).unwrap();
    fs::write(&filepath, file_content).unwrap();

    println!("Successfully created {}", filepath.display());

    Ok(())
}
