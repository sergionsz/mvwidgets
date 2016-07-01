/* form
A module that creates a form widget

To use, just add form.js and form.scss and call

form.run(<div id>)
*/

const helper = window.widgetsHelper;

window.form = (function form() {
  const exports = {};

  function addContact(div, callback) {
    return (ev) => {
      const input = document.querySelector('.contacts-input');
      if (!(/\S/.test(input.value))) {
        return;
      }
      // If clicked or enter
      if (ev.type === 'click'
      || (ev.type === 'keydown' && ev.keyCode === 13)) {
        ev.preventDefault();
        const contactButton = helper.createDOMElement('button',
          ['btn'], {}, input.value
        );
        div.appendChild(contactButton);
        input.value = '';
        callback();
      }
    };
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
    const contactsGroup = helper.createDOMElement('div',
      ['form-group', 'form__contacts-group']
    );
    const contactsAdd = helper.createDOMElement('button',
      ['btn', 'add-contacts-button', 'glyphicon', 'glyphicon-plus']
    );
    const contactsArea = helper.createDOMElement('div', ['contacts-area']);
    const contactsInput = helper.createDOMElement('input',
      ['contacts-input', 'form-control'],
      { placeholder: 'Please add the contact email message' }
    );
    function toggleWriteContact() {
      contactsArea.classList.toggle('write-contact');
      contactsInput.classList.toggle('write-contact');
    }
    contactsAdd.addEventListener('click', toggleWriteContact);
    contactsInput.addEventListener('click',
      addContact(contactsArea, toggleWriteContact)
    );
    contactsInput.addEventListener('keydown',
      addContact(contactsArea, toggleWriteContact)
    );

    // Create subject group
    const subjectGroup = helper.createDOMElement('div', ['form-group']);
    const subjectField = helper.createDOMElement('input', ['form-control'],
      { placeholder: 'You can add a subject' }
    );

    // Create message group
    const messageGroup = helper.createDOMElement('div', ['form-group']);
    const messageField = helper.createDOMElement('textarea', ['form-control'],
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
      helper.createDOMElement('span',
        ['glyphicon', 'glyphicon-ok']
      ),
      helper.createDOMElement('span', [], {}, 'Save a copy')
    );
    saveCheckboxDiv.appendChild(saveCheckboxLabel);

    // Create submit button
    const submitButton = helper.createDOMElement('button',
      ['btn', 'send-button']
    );
    const submitButtonText = helper.createDOMElement(
      'span', [], {}, 'Send mail'
    );
    const submitButtonIcon = helper.createDOMElement('span',
      ['glyphicon', 'glyphicon-play']
    );
    helper.appendAll(submitButton, submitButtonIcon, submitButtonText);

    // Append all the things!
    helper.appendAll(subjectGroup, labels.subject, subjectField);
    helper.appendAll(messageGroup, labels.message, messageField);
    helper.appendAll(contactsGroup,
      labels.contacts, contactsArea, contactsAdd, contactsInput
    );
    helper.appendAll(fieldsArea, contactsGroup, subjectGroup, messageGroup);
    helper.appendAll(submitArea, saveCheckboxDiv, submitButton);

    helper.appendAll(rootNode, fieldsArea, submitArea);
  };

  return exports;
}());
