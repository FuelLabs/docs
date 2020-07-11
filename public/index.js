import "regenerator-runtime";
import { h, app } from 'hyperapp';
import styled from 'hyperapp-styled-components';

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


function tree(list = []) {
  let result = [];
  let level = {result};

  list.forEach(path => {
    path.slice(1).split('/').reduce((r, name, i, a) => {
      if(!r[name]) {
        r[name] = { result: [] };
        r.result.push({ name, dir: normalize(path.slice(1).split('/').slice(0, i + 1).join('/')), path, children: r[name].result });
      }
      return r[name];
    }, level)
  });

  return result;
}

const isOpen = (path, dir) => path.split('%20').join(' ').indexOf(dir) !== -1;

// TODO if there's a space in the hierarchy then this doesn't work properly
const arrow = require('./arrow.svg');
const arrowDark = require('./arrow-dark.svg');

const treeToPanel2 = (_tree, state = {}) => _tree
  .map(v => v.children.length
      ? (<div id={v.dir} class={'group ' + (isOpen(state.open, v.dir) ? 'group-now' : '')}>
          <h2 class="group-header" onclick={state => ({ ...state, open: v.dir })}>
            <a href={normalize(v.path)}>
              <img src={isOpen(state.open, v.dir) ? arrowDark : arrow} class="arrow" />
              {title(v.name)}
            </a>
          </h2>
          <div class={'group-children ' + (
            (isOpen(state.open, v.dir) ? 'group-open' : '')
          )}>{treeToPanel2(v.children, state)}</div>
        </div>)
      : (<a
          id={title(v.name)}
          data-path={state.pathname}
          data-id={normalize(v.path)}
          class={'link ' + (
          isOpen(state.pathname, normalize(v.path)) ? 'link-open' : 'link-not-open'
        )} href={normalize(v.path)}>
          <span class="dot"></span>{title(v.name)}
        </a>));

/*

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/xcode.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/highlight.min.js"></script>

hljs.initHighlightingOnLoad();

<link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/tomorrow-night.min.css">

document
  .getElementById('search')
  .addEventListener("keyup", event => {
    event.preventDefault();
    if (event.keyCode === 13) {
      search(event.target.value);
    }
});
*/

const filterVersion = (_tree, version = 'v1.0.0') => _tree.filter(v => v.name === version)[0].children;

// TODO fix search
function search(pattern) {
  document.getElementById('content').innerHTML = '<h1>Search Results</h1>';

  for (const file of window.files.map(normalize)) {
    window.axios.get('https://docs.fuel.sh' + file + '.md')
    .then(function (response) {

      const fuse = new Fuse([{
        title: response.config.url,
        content: response.data,
      }], {
        keys: [
          "title",
          "content",
        ],
      });

      let result = fuse.search(pattern);
      const clean = v => v.replace('https://docs.fuel.sh/v1.0.0/', '')
        .split('__').join(': ').split('_').join(' ');

      if (result.length === 0 && response.data.indexOf(pattern) !== -1) {
        result.push({ item: {
          title: response.config.url,
          content: response.data,
        }});
      }

      if (result.length) {
        result.map(({ item }) => {
          const itemHTML = `
            <div class="search-item">
              <h3><a href="${item.title.replace('.md', '')}">
                ${clean(item.title
                  .replace('.md', '')
                  .replace('.html', '')
                  .split('___')
                  .slice(-1)[0])}
              </a></h3>
              <p>${item.content.slice(0, 500)}...</p>
            </div>
          `;

          document.getElementById('content').innerHTML += itemHTML;
        });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
}

const editIcon = require('./edit.svg');
const searchIcon = require('./search.svg');
const searchIconLight = require('./search-gray.svg');

const view = state => (
  <div>
    <div id="panel-header">
      <div id="search-wrapper">
        <input type="text" id="search" placeholder="Search..." onkeyup={(state, event) => {
          event.preventDefault();
          if (event.keyCode === 13) {
            search(event.target.value);
          }
          return state;
        }} onkeypress={(state, event) => {
          if (event.keyCode === 13) {
            search(event.target.value);
          }
        }} />
        <img src={searchIconLight} />
      </div>
    </div>
    {treeToPanel2(filterVersion(tree(window.files)), state)}
    <div href="#" id="version">v 1.0.0</div>
  </div>
);

const start = window.location.pathname === '/'
  ? '/v1.0.0/Introduction/Welcome.html'
  : window.location.pathname;

app({
  init: {
    started: false,
    open: start,
    pathname: start,
  },
  view,
  subscriptions: state => [],
  node: document.getElementById('panel'),
});
