const alfy = require('alfy');
const json = require('./data.json');

(async () => {
  const items = alfy.inputMatches(json, 'search').map((element) => ({
    title: element.title,
    subtitle: element.subtitle,
    arg: element.arg,
  }));

  alfy.output(items);
})();
