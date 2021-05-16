#!/usr/bin/env node

/* eslint-disable no-console */

import { prompt } from "enquirer"
import slugify from "@sindresorhus/slugify"
import fs from "fs-extra"

const currentDate = new Date().toISOString().split(`T`)[0]
const typeChoices = [`prose`, `tutorial`] as const
type Types = typeof typeChoices[number]
const categoryChoices = [`Community`, `Design`, `Gatsby`, `JavaScript`, `React`] as const
type Categories = typeof categoryChoices[number]

async function run() {
  const {
    form,
    type,
    category,
    published,
  }: {
    form: { title: string; date: string; subtitle: string; description: string }
    type: Types
    category: Categories
    published: boolean
  } = await prompt([
    {
      name: `form`,
      type: `form`,
      message: `Provide information`,
      choices: [
        {
          name: `title`,
          message: `Title`,
        },
        {
          name: `date`,
          message: `Date`,
          // @ts-ignore
          initial: currentDate,
        },
        {
          name: `subtitle`,
          message: `Subtitle`,
        },
        {
          name: `description`,
          message: `Description`,
        },
      ],
    },
    {
      name: `type`,
      type: `select`,
      message: `Pick a type`,
      // @ts-ignore
      choices: typeChoices,
    },
    {
      name: `category`,
      type: `select`,
      message: `Pick a category`,
      // @ts-ignore
      choices: categoryChoices,
    },
    {
      name: `published`,
      // @ts-ignore
      type: `toggle`,
      message: `Make it public already?`,
      enabled: `yes`,
      disabled: `no`,
    },
  ])

  const res = {
    ...form,
    type,
    category,
    published,
  }

  const slug = slugify(`${res.title}`)
  const filename = `${process.cwd()}/www/content/writing/${res.date}--${slug}/index.mdx`

  const frontmatter = `---
title: "${res.title}"
subtitle: "${res.subtitle}"
date: ${res.date}
lastUpdated: ${res.date}
description: "${res.description}"
type: "${res.type}"
category: "${res.category}"
image: file-name-inside-og-images-folder.png
published: ${res.published ? `true` : `false`}
---`.trim()

  console.log(`The file ${filename} will be created with:

${frontmatter}`)

  const { isConfirmed }: { isConfirmed: boolean } = await prompt({
    name: `isConfirmed`,
    type: `confirm`,
    message: `Want to confirm?`,
  })

  if (!isConfirmed) {
    console.log(`Aborting...`)
    return
  }

  await fs.outputFile(filename, frontmatter)
  console.log(`Successfully created ${filename}`)
}

run()
