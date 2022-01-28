use color_eyre::{eyre::eyre, Result};
use dialoguer::{theme::ColorfulTheme, Confirm, Input, MultiSelect, Select};
use scripts::{get_current_date, get_file_info, ContentType};
use serde::Serialize;
use std::{fs, path::PathBuf};

const TAGS_CHOICES: [&str; 12] = [
    "CLI",
    "Disord",
    "elitepvpers",
    "Freebie",
    "Gatsby",
    "General",
    "JavaScript",
    "MDX",
    "Python",
    "React",
    "Tooling",
    "TypeScript",
];

const ICON_CHOICES: [&str; 10] = [
    "cli",
    "discord",
    "elitepvpers",
    "gatsby",
    "general",
    "javascript",
    "mdx",
    "python",
    "react",
    "typescript",
];

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Frontmatter {
    title: String,
    date: String,
    last_updated: String,
    icon: String,
    tags: Vec<String>,
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

    let tags = MultiSelect::with_theme(&theme)
        .with_prompt("Choose your tags")
        .items(&TAGS_CHOICES)
        .interact()?
        .into_iter()
        .map(|tag_index| TAGS_CHOICES[tag_index]);

    let icon = Select::with_theme(&theme)
        .with_prompt("Pick an icon")
        .items(&ICON_CHOICES)
        .interact()
        .map(|choice| ICON_CHOICES[choice])?;

    let (directory_path, filepath, filename): (PathBuf, PathBuf, String) =
        get_file_info(current_date.to_string(), slug, ContentType::Garden)?;

    let fm = Frontmatter {
        title,
        date,
        last_updated: current_date.to_string(),
        icon: icon.to_string(),
        tags: tags.map(|s| s.to_string()).collect::<Vec<String>>(),
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

    fs::create_dir_all(directory_path)?;
    fs::write(&filepath, frontmatter)?;

    println!("Successfully created {}", filepath.display());

    Ok(())
}
