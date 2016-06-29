/* Menu
A module that creates a menu with icons

To use, just add menu.js and menu.scss and call

menu.run(<div id>, <data>)

Notes:
  - JSON data can be and object or a string.
  - Data is an array of objects in the following format:
    {
      "id": <int Identifier>,
      "text": <string Entry text>,
      "icon": <string Glyphicon name>
      "counter" <int Red counter>
      "href": <string URL for the link>
    }
*/

const helper = window.widgetsHelper;

window.menu = (function menu() {
  const exports = {};

  /* Function createMenuElement
      Creates an element of the menu from a data object
  */
  function createMenuElement(data) {
    const button = helper.createDOMElement('button',
      ['menu__entry', 'btn', 'btn-default'],
      {}, ` ${data.text.toUpperCase()}`
    );
    if (data.hasOwnProperty('icon') && data.icon !== '') {
      const span = helper.createDOMElement('span',
        ['glyphicon', `glyphicon-${data.icon}`]
      );
      button.insertBefore(span, button.firstChild);
    }
    if (data.hasOwnProperty('counter') && data.counter > 0) {
      const counter = helper.createDOMElement('div', 'counter',
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

  function toggleMenu(action, rootNode) {
    return () => {
      const cls = 'menu__entry--shown';
      Array.prototype.forEach.call(
        rootNode.children,
        (child) => {
          // if (idx === 0) { return; }
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

  exports.run = (divId = '', _data) => {
    const data = helper.initializeData(_data);
    const rootNode = document.getElementById(divId);
    rootNode.classList.add('menu');
    rootNode.innerHTML = '';

    const showAllButton = helper.createDOMElement(
      'button', ['menu__show-all'], {}, '☰'
    );
    showAllButton.addEventListener('click', toggleMenu('toggle', rootNode));

    const entries = data.map(entry => createMenuElement(entry));

    entries.forEach(entry =>
      entry.addEventListener('click',
      makeActive
    ));

    helper.appendAll(rootNode, ...entries, showAllButton);
  };
  return exports;
}());
