const { list, tree, normalize, title } = require('./files');
const path = require('path');
const fs = require('fs').promises;
const fse = require('fs-extra');
const showdown  = require('showdown');
const { markdownToTxt } = require('markdown-to-txt');
const converter = new showdown.Converter();

const src = './src/';
const dist = './dist/';
const build = './build/';
const index = './build/index.html';

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

  await fse.remove(dist);

  // copy parcel build over
  for (const file of list(build)) {
    const content = await fs.readFile(path.join(build, file), 'utf8');
    await fse.outputFile(path.join(dist, file), content);
  }

  // build markdown
  for (const file of list(src)) {
    const content = await fs.readFile(path.join(src, file), 'utf8');
    const html = header
      .replace("'%%files%%'", arrFiles)
      .replace('"%%files%%"', arrFiles)
      .replace('%%title%%', title(file))
      .replace('%%content%%', converter.makeHtml(content))
      .replace('%%panel%%', panel);
    await fse.outputFile(path.join(dist, normalize(file)), html);
    await fse.outputFile(path.join(dist, normalize(file) + '.md'), markdownToTxt(content));

    if (!indexFile) {
      await fse.outputFile(path.join(dist, 'index.html'), html);
      indexFile = true;
    }
  }

})();
