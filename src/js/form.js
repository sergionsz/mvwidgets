/* form
A module that creates a form widget

To use, just add form.js and form.scss and call

form.run(<div id>)
*/

const helper = window.widgetsHelper;

window.form = (function form() {
  const exports = {};

  function addContact(contact, div) {
    const contactButton = helper.createDOMElement('button', [], {}, contact);
    div.appendChild(contactButton);
  }

  exports.run = (divId = '') => {
    const rootNode = document.getElementById(divId);
    rootNode.classList.add('form');
    rootNode.innerHTML = '';

    // Create labels
    const labels = {
      contacts: helper.createDOMElement('label', [], {}, 'Contacts'),
      subject: helper.createDOMElement('label', [], {}, 'Subject'),
      message: helper.createDOMElement('label', [], {}, 'Message'),
    };

    // Create fields area
    const fieldsArea = helper.createDOMElement('div', ['form__fields']);

    // Create contacts group
    const contactsGroup = helper.createDOMElement('div', ['form-group']);
    const contactsAdd = helper.createDOMElement('span', ['btn'], {}, '+');
    const contactsArea = helper.createDOMElement('div', ['form__contactsArea']);

    // Create subject group
    const subjectGroup = helper.createDOMElement('div', ['form-group']);
    const subjectField = helper.createDOMElement('input', ['form-control'],
      { placeholder: 'You can add a subject' }
    );

    // Create message group
    const messageGroup = helper.createDOMElement('div', ['form-group']);
    const messageField = helper.createDOMElement('input', ['form-control'],
      { placeholder: 'Leave your message here' });

    // Create submit area
    const submitArea = helper.createDOMElement('div', ['form__submit-area']);
    // Create save checkbox
    const saveCheckboxDiv = helper.createDOMElement('div', ['checkbox']);
    const saveCheckboxLabel = helper.createDOMElement('label');
    helper.appendAll(
      saveCheckboxLabel,
      helper.createDOMElement('input', [],
        { type: 'checkbox' }
      ),
      helper.createDOMElement('span', [], {}, ' Save a copy')
    );
    saveCheckboxDiv.appendChild(saveCheckboxLabel);

    // Create submit button
    const submitButton = helper.createDOMElement('button', ['btn'],
      {}, 'Send Mail'
    );

    // Append all the things!
    helper.appendAll(subjectGroup, labels.subject, subjectField);
    helper.appendAll(messageGroup, labels.message, messageField);
    helper.appendAll(contactsGroup, contactsArea, contactsAdd);
    helper.appendAll(fieldsArea, subjectGroup, messageGroup, contactsGroup);
    helper.appendAll(submitArea, saveCheckboxDiv, submitButton);

    helper.appendAll(rootNode, fieldsArea, submitArea);
  };

  return exports;
}());
