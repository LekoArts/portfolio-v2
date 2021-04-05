#!/usr/bin/env node

/* eslint-disable no-console */

import { prompt } from "enquirer"
import slugify from "@sindresorhus/slugify"
import fs from "fs-extra"

const currentDate = new Date().toISOString().split(`T`)[0]
const iconChoices = [
  `general`,
  `cli`,
  `gatsby`,
  `javascript`,
  `react`,
  `typescript`,
  `mdx`,
  `discord`,
  `elitepvpers`,
  `python`,
] as const
type Icons = typeof iconChoices[number]

async function run() {
  const {
    form,
    tags,
    icon,
  }: {
    form: { title: string; date: string; lastUpdated: string }
    tags: Record<string, string>
    icon: Icons
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
          name: `lastUpdated`,
          message: `Last Updated`,
          // @ts-ignore
          initial: currentDate,
        },
      ],
    },
    {
      name: `tags`,
      type: `multiselect`,
      message: `Choose your tags`,
      choices: [
        { name: `CLI`, value: `CLI` },
        { name: `Gatsby`, value: `Gatsby` },
        { name: `JavaScript`, value: `JavaScript` },
        { name: `TypeScript`, value: `TypeScript` },
        { name: `React`, value: `React` },
        { name: `MDX`, value: `MDX` },
        { name: `Discord`, value: `Discord` },
        { name: `elitepvpers`, value: `elitepvpers` },
        { name: `Freebie`, value: `Freebie` },
        { name: `Python`, value: `Python` },
      ],
      // @ts-ignore
      result(names: string[]): Record<string, string> {
        return this.map(names)
      },
    },
    {
      name: `icon`,
      type: `select`,
      message: `Pick an icon`,
      // @ts-ignore
      choices: iconChoices,
    },
  ])

  const tagsValues = Object.values(tags)

  const res = {
    ...form,
    icon,
    tags: tagsValues,
  }

  const slug = slugify(`${res.title}`)
  const filename = `${process.cwd()}/www/content/garden/${res.date}--${slug}/index.mdx`

  const frontmatter = `---
title: "${res.title}"
date: ${res.date}
lastUpdated: ${res.lastUpdated}
icon: "${res.icon}"
tags:
${res.tags.map((t) => `  - ${t}`).join(`
`)}
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
