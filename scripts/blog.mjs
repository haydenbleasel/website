import inquirer from 'inquirer';
import fs from 'fs/promises';

console.log('Scaffolding a new blog post...');

const main = async () => {
  try {
    const { slug, title, description, date } = await inquirer.prompt([
      {
        type: 'input',
        name: 'slug',
        message: 'What is the slug of your blog post?',
      },
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of your blog post?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of your blog post?',
      },
      {
        type: 'input',
        name: 'date',
        message: 'What is the date of your blog post? (MM-DD-YYYY)',
      },
    ]);

    const content = `---
title: ${title}
description: ${description}
date: ${date}
---`;

    await fs.writeFile('./content/blog/${slug}.mdx', content);
  } catch (error) {
    console.error(error);
  }
};

main();
