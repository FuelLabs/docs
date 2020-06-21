import "regenerator-runtime";
import { h, app } from 'hyperapp';
import styled from 'hyperapp-styled-components';

function is_numeric(str){
  return /^\d+$/.test(str);
}

const normalize = file => file
  .split('/')
  .map(v => (is_numeric(v[0]) ? v.slice(v.indexOf('.') + 1) : v).split(' ').join('_'))
  .join('__')
  .replace('&', 'and')
  .replace('.md', '.html');

const title = file => normalize(file.split('/').pop())
  .split('_')
  .join(' ')
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

const treeToPanel2 = (_tree, state = {}) => _tree
  .map(v => v.children.length
      ? (<div id={v.dir} class="group">
          <h2 class="group-header" onclick={state => ({ ...state, open: v.dir })}>{title(v.name)}</h2>
          <div class={'group-children ' + (
            (state.open.indexOf(v.dir) !== -1 ? 'group-open' : '')
          )}>{treeToPanel2(v.children, state)}</div>
        </div>)
      : (<a class={'link ' + (
          state.pathname.indexOf(normalize(v.path)) !== -1 ? 'link-open' : ''
        )} href={normalize(v.path)}>{title(v.name)}</a>));

const filterVersion = (_tree, version = 'v1.0.0') => _tree.filter(v => v.name === version)[0].children;

function search(pattern) {
  document.getElementById('content').innerHTML = '<h1>Search Results</h1>';

  for (const file of window.files.map(normalize)) {
    window.axios.get('/' + file + '.md')
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

      const result = fuse.search(pattern);

      if (result.length) {
        result.map(({ item }) => {
          const itemHTML = `
            <div class="search-item">
              <h3><a href="${item.title.replace('.md', '')}">
                ${item.title.replace('.md', '').replace('.html', '').split('___').slice(-1)}
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

const view = state => (
  <div>
    <div id="panel-header">
      <input type="text" id="search" placeholder="Search..." onkeyup={(state, event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
          search(event.target.value);
        }
        return state;
      }} />
      <a href="#">v1.0.0</a>
    </div>
    {treeToPanel2(filterVersion(tree(window.files)), state)}
  </div>
);

app({
  init: {
    open: window.location.pathname,
    pathname: window.location.pathname,
  },
  view,
  subscriptions: state => [],
  node: document.getElementById('panel'),
});
