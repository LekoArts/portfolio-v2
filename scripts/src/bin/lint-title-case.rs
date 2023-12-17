use color_eyre::Result;
use glob::glob;
use gray_matter::engine::YAML;
use gray_matter::Matter;
use scripts::read_lines;
use serde::Deserialize;
use std::{env, fs};
use titlecase::titlecase;

#[derive(Deserialize, Debug)]
struct FrontMatter {
    // The frontmatter also includes other properties, but I only care about the title
    title: String,
}

fn main() -> Result<()> {
    color_eyre::install()?;
    let matter = Matter::<YAML>::new();

    let current_dir = env::current_dir()?;
    // Glob pattern on all MDX files inside ./content
    let pattern = current_dir
        .join("content")
        .join("**/*.mdx")
        .into_os_string()
        .into_string()
        .unwrap();

    // Counter for how many titles are not correct
    let mut counter = 0;

    for entry in glob(&pattern).expect("Failed to read glob pattern") {
        match entry {
            Ok(path) => {
                // Name of the parent directory of the file
                let parent = path.parent().unwrap().into_iter().last().unwrap();

                // Ignore any paths that are in the ignore-title-case.txt file
                if let Ok(mut ignored_urls) = read_lines("./scripts/ignore-title-case.txt") {
                    if ignored_urls.any(|x| x.unwrap() == parent.to_str().unwrap()) {
                        continue;
                    }
                }

                // Get the file contents from the path
                if let Ok(contents) = fs::read_to_string(&path) {
                    // Parse with custom struct
                    let frontmatter = matter.parse_with_struct::<FrontMatter>(&contents).unwrap();

                    let title = frontmatter.data.title;
                    let titlecase_title = titlecase(&title);

                    // Relative path to the file from the root of the project
                    let relative_path = path.strip_prefix(&current_dir).unwrap();

                    // Compare the title with the titlecase version
                    if title != titlecase_title {
                        counter += 1;
                        println!(
                            r#"-----
{}
Path: {}"#,
                            colored_diff::PrettyDifference {
                                expected: &title,
                                actual: &titlecase_title
                            },
                            &relative_path.display()
                        );
                    }
                }
            }
            Err(e) => println!("{:?}", e),
        }
    }

    if counter > 0 {
        println!(
            r#"
-----

Found {} titles that are not in title case"#,
            counter
        );
    } else if counter == 0 {
        println!("All titles are in title case");
    }

    Ok(())
}
