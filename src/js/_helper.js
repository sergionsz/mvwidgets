/* Helper functions for widgets
*/


window.widgetsHelper = (function widgetsHelper() {
  const exports = {};

  exports.getAndRun = (url, callback) => {
    const xhr = new XMLHttpRequest;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  /* Function appendAll
      Appends children to a specified element.
    */
  exports.appendAll = (element, ...children) => {
    if (children.length > 0) {
      children.forEach(child => element.appendChild(child));
    }
  };

  /* Function createDOMElement
    Creates a DOM element with optional class or list of class names,
    attributes and text.
    Returns the finished element.
  */
  exports.createDOMElement =
  (type, className = [], attributes = {}, text = '') => {
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
  };

  /* Function initializeData
      Checks for existence of data
      Converts a data string into an object
      Returns a data object
    */
  exports.initializeData = data => {
    if (data === null || typeof data === 'undefined') {
      throw new Error('Error: At least one image should be provided');
    }
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  };

  /* Function countToValue
    Animates a number taking it from 0 to the specified value */
  exports.countToValue = (selector, value, seconds) => {
    const start = new Date().getTime();
    const ms = seconds * 1000;
    const end = start + ms;
    const minInterval = 50;
    const interval = Math.max(ms / value, minInterval);
    const element = document.querySelector(selector);
    element.textContent = 0;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max((end - now) / ms, 0);
      const newValue = Math.floor(value - (value * remaining));
      if (Number(element.textContent) >= value) {
        clearInterval(timer);
      }
      element.textContent = newValue;
    }, interval);
  };

  return exports;
}());
