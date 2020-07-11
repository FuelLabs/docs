const fs = require("fs")
const path = require("path")

const list = function(dirPath = "", arrayOfFiles = []) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = list(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath.split('/').slice(2).join('/'), "/", file))
    }
  });

  return arrayOfFiles;
}

function tree(list = []) {
  let result = [];
  let level = {result};

  list.forEach(path => {
    path.slice(1).split('/').reduce((r, name, i, a) => {
      if(!r[name]) {
        r[name] = { result: [] };
        r.result.push({ name, path, children: r[name].result });
      }
      return r[name];
    }, level)
  });

  return result;
}

function is_numeric(str){
  return /^\d+$/.test(str);
}

const normalize = file => file
  .split('/')
  .map(v => (is_numeric(v[0]) ? v.slice(v.indexOf('.') + 2) : v))
  .join('/')
  .replace('&', 'and')
  .replace('.md', '.html');

const title = file => normalize(file.split('/').pop())
  .trim()
  .replace('.md', '')
  .replace('.html', '');

module.exports = {
  tree: src => tree(list(src)),
  list,
  normalize,
  title,
};
