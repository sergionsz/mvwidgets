const helper = window.widgetsHelper;

window.lang = (function lang() {
  const exports = {};
  exports.data = {};
  exports.current = '';

  function changeLang() {
    Array.prototype.forEach.call(document.querySelectorAll('.i18n'),
      (element) => {
        element.textContent =
        window.lang.data[window.lang.current][element.dataset.textID];
      }
    );
  }

  function saveAndChange(data) {
    window.lang.data[lang] = data;
    changeLang();
  }

  exports.getLang = language => {
    if (!this.data.hasOwnProperty(language)) {
      this.current = language;
      helper.getAndRun(`/i18n/${language}`, saveAndChange);
    }
  };
  return exports;
}());
