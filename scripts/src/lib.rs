use chrono::{
    format::{DelayedFormat, StrftimeItems},
    DateTime, Utc,
};
use color_eyre::{Report, Result};
use std::path::PathBuf;

pub fn get_current_date<'a>() -> DelayedFormat<StrftimeItems<'a>> {
    let now: DateTime<Utc> = Utc::now();
    now.format("%Y-%m-%d")
}

pub enum ContentType {
    Garden,
    Writing,
}

pub fn get_file_info(
    date: String,
    slug: String,
    content_type: ContentType,
) -> Result<(PathBuf, PathBuf, String), Report> {
    let current_dir = std::env::current_dir()?;
    let content_dir = match content_type {
        ContentType::Garden => String::from("garden"),
        ContentType::Writing => String::from("writing"),
    };

    let filename = format!("{}--{}", date, slug);
    let directory_path = current_dir
        .join("www/content")
        .join(content_dir)
        .join(&filename);
    let filepath = directory_path.join("index.mdx");

    Ok((directory_path, filepath, filename))
}
