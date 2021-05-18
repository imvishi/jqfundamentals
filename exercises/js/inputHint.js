class InputHint {
  constructor(inputHintObject) {
    this.inputHintObject = inputHintObject;
    this.hintClass = this.inputHintObject.hintClass;
    this.searchInput = $(this.inputHintObject.searchSelector).find('input[type=text]');
    this.label = $(this.inputHintObject.searchSelector).find('label:first');
  }

  init() {
    this.addInputHint();
    this.bindEvents();
  }

  addInputHint() {
    this.searchInput.val(this.label.text());
    this.searchInput.addClass(this.hintClass);
    this.label.remove();
  }

  bindEvents() {
    this.bindFocusEvents();
    this.bindBlurEvents();
  }

  bindFocusEvents() {
    const labelText = this.label.text();
    this.searchInput.focus((searchInput) => {
      const target = searchInput.target;
      $(target).removeClass(this.hintClass);
      if ($(target).val() === labelText) {
        $(target).val('');
      }
    });
  }

  bindBlurEvents() {
    const labelText = this.label.text();
    this.searchInput.blur((searchInput) => {
      const target = searchInput.target;
      if ($(target).val().trim() === '') {
        $(target).addClass(this.hintClass);
        $(target).val(labelText);
      }
    });
  }
}

$(document).ready(() => {
  const inputHintObject = {
    hintClass: 'hint',
    searchSelector: '#search'
  }
  const inputHint = new InputHint(inputHintObject);
  inputHint.init();
});
