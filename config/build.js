const { list, tree, normalize, title } = require('./files');
const path = require('path');
const fs = require('fs').promises;
const fse = require('fs-extra');
const showdown  = require('showdown');
const converter = new showdown.Converter();

const src = './src/';
const dist = './dist/';
const index = './public/index.html';

const treeToPanel = _tree => _tree
  .map(v => v.children.length
      ? `<div><h2>${title(v.name)}</h2> <div>${treeToPanel(v.children)}</div></div>`
      : `<a href="${normalize(v.path)}">${title(v.name)}</a>`)
  .join('');

const filterVersion = (_tree, version = 'v1.0.0') => _tree.filter(v => v.name === version)[0].children;

(async () => {
  let indexFile = false;
  const arr = list(src);
  const arrFiles = JSON.stringify(arr.map(normalize));
  const header = await fs.readFile(index, 'utf8');
  const panel = treeToPanel(filterVersion(tree(src)));

  for (const file of list(src)) {
    const content = await fs.readFile(path.join(src, file), 'utf8');
    const html = header
      .replace('%%files%%', arrFiles)
      .replace('%%title%%', title(file))
      .replace('%%content%%', converter.makeHtml(content))
      .replace('%%panel%%', panel);
    await fse.outputFile(path.join(dist, normalize(file)), html);
    await fse.outputFile(path.join(dist, normalize(file) + '.md'), content);

    if (!indexFile) {
      await fse.outputFile(path.join(dist, 'index.html'), html);
      indexFile = true;
    }
  }

})();
