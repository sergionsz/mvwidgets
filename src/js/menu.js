/* Menu
A module that creates a menu with icons from data tree

To use, just add menu.js and menu.scss and call

menu.run(<div id>, <data>, options)

Notes:
  - JSON data can be and object or a string.
  - Data must be in the following format:
    {
      "id": <int Identifier>,
      "text": <string Entry text>,
      "icon": <string Glyphicon name>
      "counter" <int Red counter>
      "href": <string URL for the link>
    }
*/

/* Function appendAll
    Appends children to a specified element.
  */
function appendAll(element, ...children) {
  if (children.length > 0) {
    children.forEach(child => element.appendChild(child));
  }
}

/* Function createDOMElement
  Creates a DOM element with optional class or list of class names,
  attributes and text.
  Returns the finished element.
*/
function createDOMElement(type, className = [], attributes = {}, text = '') {
  const node = document.createElement(type);
  if (typeof className === 'string') {
    node.classList.add(className.trim());
  } else {
    className.forEach(cls => node.classList.add(cls.trim()));
  }
  Object.keys(attributes).forEach(key =>
    node.setAttribute(key, attributes[key])
  );
  if (text !== '') {
    node.textContent = text;
  }
  return node;
}

/* Function initializeData
    Checks for existence of data
    Converts a data string into an object
    Returns a data object
  */
function initializeData(data) {
  if (data === null || typeof data === 'undefined') {
    throw new Error('Error: At least one image should be provided');
  }
  if (typeof data === 'string') {
    return JSON.parse(data);
  }
  return data;
}

/* Function createMenuElement
    Creates an element of the menu from a data object
*/
function createMenuElement(data) {
  const button = createDOMElement('button',
    ['menu__entry', 'btn', 'btn-default'],
    {}, ` ${data.text.toUpperCase()}`
  );
  if (data.hasOwnProperty('icon') && data.icon !== '') {
    const span = createDOMElement('span',
      ['glyphicon', `glyphicon-${data.icon}`],
      { 'data-id': data.id }
    );
    button.insertBefore(span, button.firstChild);
  }
  if (data.hasOwnProperty('counter') && data.counter > 0) {
    const counter = createDOMElement('div', 'counter',
      {}, String(data.counter)
    );
    button.appendChild(counter);
  }
  return button;
}

/* Function makeActive
    Activates just the clicked entry.
*/
function makeActive() {
  const entries = document.getElementsByClassName('menu__entry--active');
  Array.prototype.forEach.call(
    entries,
    entry => {
      entry.classList.remove('menu__entry--active');
    }
  );
  this.classList.add('menu__entry--active');
}

window.menu = (function menu() {
  const exports = {};

  exports.run = (divId = '', _data) => {
    const data = initializeData(_data);
    const rootNode = document.getElementById(divId);
    rootNode.classList.add('menu');
    rootNode.innerHTML = '';

    function toggleMenu(action) {
      return () => {
        const cls = 'menu__entry--shown';
        Array.prototype.forEach.call(
          rootNode.children,
          (child, idx) => {
            if (idx === 0) { return; }
            switch (action) {
              case 'show':
                child.classList.add(cls);
                break;
              case 'hide':
                child.classList.remove(cls);
                break;
              case 'toggle':
              default:
                child.classList.toggle(cls);
            }
          }
        );
      };
    }

    const showAllButton = createDOMElement(
      'button', ['menu__show-all'], {}, '☰'
    );
    showAllButton.addEventListener('click', toggleMenu('toggle'));

    const entries = data.map(entry => createMenuElement(entry));

    entries.forEach(entry =>
      entry.addEventListener('click',
      makeActive
    ));

    appendAll(rootNode, ...entries, showAllButton);
  };
  return exports;
}());
