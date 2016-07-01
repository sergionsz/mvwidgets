/* profile
A module that creates a profile widget

To use, just add profile.js and profile.scss and call

profile.run(<div id>, <data>, <options>)

Notes:
  - JSON data can be and object or a string.
  - Data is an array of objects in the following format:
    {
      "id": <int Identifier>,
      "name": <string User name>,
      "followersCount": <int Number of followers>,
      "photo": <string Filename of the photo>
    }
  - The following options may be used:
    {
      photoURL: <string URL for user profile photos>
    }
*/

const helper = window.widgetsHelper;

window.profile = (function profile() {
  const exports = {};
  const optDefaults = {
    photoURL: '/img',
  };
  const menuItems = [
    { name: 'Edit user', icon: 'user' },
    { name: 'Web statistics', icon: 'stats' },
    { name: 'Upload settings', icon: 'wrench' },
    { name: 'Events', icon: 'map-marker' },
  ];


  function createMenuItem(text, icon = '') {
    const li = helper.createDOMElement('li', ['list-group-item'], {}, text);
    if (icon !== '') {
      const span = helper.createDOMElement('span',
        ['glyphicon', `glyphicon-${icon}`]
      );
      li.appendChild(span);
    }
    return li;
  }

  exports.run = (divId = '', _data, _opts) => {
    // Initialize options
    const opts = Object.assign(optDefaults, _opts);

    const data = helper.initializeData(_data);
    const rootNode = document.getElementById(divId);
    rootNode.classList.add('profile');
    rootNode.innerHTML = '';

    // Create head
    const head = helper.createDOMElement('div', ['profile__head']);
    const photo = helper.createDOMElement('img', ['profile__photo'],
      { src: `${opts.photoURL}/${data.photo}` }
    );
    const info = helper.createDOMElement('div', ['profile__info']);
    const userName = helper.createDOMElement('span', ['profile__name'],
      {}, data.name.toUpperCase()
    );
    const followerNumber = helper.createDOMElement('span', [], {}, '0');
    const followerCount = helper.createDOMElement('span',
      ['profile__followerCount'], {}, ' followers'
    );
    followerCount.insertBefore(followerNumber, followerCount.firstChild);
    // Create menu
    const menu = helper.createDOMElement('ul', ['profile__menu', 'list-group']);
    const menuElements = menuItems.map(item =>
      createMenuItem(item.name, item.icon)
    );

    helper.appendAll(info, userName, followerCount);
    helper.appendAll(head, photo, info);
    helper.appendAll(menu, ...menuElements);
    helper.appendAll(rootNode, head, menu);

    helper.countToValue('.profile__followerCount span', data.followersCount, 3);
  };

  return exports;
}());
