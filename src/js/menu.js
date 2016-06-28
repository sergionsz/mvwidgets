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
      "href": <string URL for the link>
      "children": [nested entries]
    }
*/

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

window.menu = (function(){
  const exports = {};

  /*const optDefaults = {
    imgPath: '',
    thumbPath: '',
    defaultSlide: 0,
  };*/

  exports.run = (divId = '', _data) => {
    const data = initializeData(_data);
    const node = getElementById(divId);
    node.innerHTML = '';


  };
  return exports;
}());
