use chrono::{DateTime, Local};
use color_eyre::Result;
use dialoguer::{theme::ColorfulTheme, Confirm, Input, MultiSelect, Select};
use std::fs;

fn main() -> Result<()> {
    color_eyre::install()?;

    let tags_choices = [
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

    let icon_choices = [
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

    let theme = ColorfulTheme::default();

    let now: DateTime<Local> = Local::now();
    let current_date = now.format("%Y-%m-%d");
    let cwd = std::env::current_dir().unwrap();
    let current_dir = String::from(cwd.to_string_lossy());

    let title: String = Input::with_theme(&theme)
        .with_prompt("Title")
        .interact_text()
        .unwrap();
    let date: String = Input::with_theme(&theme)
        .with_prompt("Date")
        .default(current_date.to_string())
        .interact_text()
        .unwrap();
    let last_updated = &date;
    let slug = slug::slugify(&title);
    // Returns indexes of selected values
    let tags = MultiSelect::with_theme(&theme)
        .with_prompt("Choose your tags")
        .items(&tags_choices)
        .interact()
        .unwrap();
    // Returns index of selected value
    let icon = Select::with_theme(&theme)
        .with_prompt("Pick an icon")
        .items(&icon_choices)
        .interact()
        .unwrap();

    let filename = format!("{}--{}", current_date.to_string(), slug);
    let directory_path = format!("{}/www/content/garden/{}", current_dir, filename);
    let filepath = format!("{}/index.mdx", directory_path);

    let mut tags_frontmatter = String::new();
    for tag in tags {
        let line = format!("\n  - {}", tags_choices[tag]);
        tags_frontmatter.push_str(&line);
    }

    let frontmatter = format!(
        r#"---
title: "{}"
date: {}
lastUpdated: {}
icon: "{}"
tags: {}
---
    "#,
        title,
        current_date.to_string(),
        last_updated,
        icon_choices[icon],
        &tags_frontmatter
    );

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
        println!("Aborting...");
        return Ok(());
    }

    fs::create_dir_all(directory_path).unwrap();
    fs::write(&filepath, frontmatter).unwrap();

    println!("Successfully created {}", &filepath);

    Ok(())
}
