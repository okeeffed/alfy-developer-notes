#!/usr/bin/env node

/**
 * Dynamically generates a script you can `source ./bin/docs-autocompletions`
 * to gen local options for installation.
 */

const fs = require('fs');
const startCase = require('lodash.startcase');
const kebabCase = require('lodash.kebabcase');

const BASE_URL = 'https://docs.dennisokeeffe.com/manual';

// using to have for now
const parentDir = '/Users/dennis.okeeffe/Project-Imposter/developer-notes';
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

const main = () => {
  const directories = getDirectories(`${parentDir}/manual`);
  const json = [];

  for (const directory of directories) {
    getFiles(`${parentDir}/manual/${directory}`)
      .map((file) => file.replace('.md', ''))
      .map((file) =>
        json.push({
          title: startCase(file),
          subtitle: startCase(directory),
          arg: `${BASE_URL}-${kebabCase(directory).toLowerCase()}-${kebabCase(
            file,
          ).toLowerCase()}`,
          search: `${startCase(directory)} ${startCase(file)}`,
        }),
      );
  }

  fs.writeFileSync('./data.json', JSON.stringify(json), 'utf-8');

  console.log(
    '[Success]: Autocompletions written to bin/lift-autocomplete.sh for project',
  );
};

main();
