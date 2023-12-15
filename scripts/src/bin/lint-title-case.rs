use color_eyre::Result;
use glob::glob;
use gray_matter::engine::YAML;
use gray_matter::Matter;
use serde::Deserialize;
use std::{env, fs};
use titlecase::titlecase;

#[derive(Deserialize, Debug)]
struct FrontMatter {
    // The frontmatter also includes other properties, but I only care about the title
    title: String,
}

// A list of paths to ignore
const IGNORE: [&str; 7] = [
    "2017-10-23--elitepvpers-wallpaper-2017",
    "2021-04-05--what-is-a-digital-garden",
    "2022-02-10--replacing-ls-with-exa",
    "2022-11-24--how-to-write-theme-aware-styles-with-vanilla-extract",
    "2023-08-10--publishing-a-rust-cli-on-npm",
    "2023-11-04--tsup-excluding-files-from-the-build",
    "2022-11-10--writing-performant-css-with-vanilla-extract",
];

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
                // Path to the file stripped of the "index.mdx"
                let parent = path.parent().unwrap().into_iter().last().unwrap();

                // Ignore any paths that are in the IGNORE list considering the parent
                if IGNORE.contains(&parent.to_str().unwrap()) {
                    continue;
                }
                // Get the file contents from the path
                if let Ok(contents) = fs::read_to_string(&path) {
                    // Parse with custom struct
                    let frontmatter = matter.parse_with_struct::<FrontMatter>(&contents).unwrap();

                    let title = frontmatter.data.title;
                    let titlecase_title = titlecase(&title);

                    // Compare the title with the titlecase version
                    if title != titlecase_title {
                        counter += 1;
                        println!(
                            r#"-----
Old: {}
New: {}
Filepath: {}"#,
                            title,
                            titlecase_title,
                            &path.display()
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
