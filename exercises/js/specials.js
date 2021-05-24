class Special {
  static specialJsonUrl = 'http://localhost:8000/Documents/Ruby/Javascript/jqery/jqfundamentals/exercises/data/specials.json';

  constructor(specialObject) {
    this.form = $(specialObject.formSelector);
    this.form.data('submit', this.form.find(specialObject.formSubmitButtonSelector));
  }

  init() {
    this.removeSubmitButton();
    this.createTargetDivForSpecial();
    this.bindEvents();
  }

  createTargetDivForSpecial() {
    this.specialContainer = $(`<div>
      <h2 id="title"></h2>
      <p id="text"></p>
      <p id="color"></p>
      <img id="image">
      </div>`);
    this.specialContainer.insertAfter(this.form);
  }

  removeSubmitButton() {
    this.form.data('submit').remove();
  }

  bindEvents() {
    this.form.on('change', 'select', (event) => {
      this.handleSpecialSelection(event.target);
    });
  }

  handleSpecialSelection(target) {
    if (target.selectedIndex <= 0) {
      this.clearSpecialContainer();
    } else if (this.special) {
      this.updateSpecialContainer(target.value);
    } else {
      this.loadSpecialData(() => {
        this.updateSpecialContainer(target.value);
      });
    }
  }

  loadSpecialData(onLoadFinish) {
    $.getJSON(Special.specialJsonUrl, (res) => {
      this.specialData = res
      onLoadFinish();
    });
  }


  updateSpecialContainer(selectedValue) {
    if (this.specialData) {
      const data = this.specialData[selectedValue];
      this.specialContainer.find('#title').html(data.title);
      this.specialContainer.find('#text').html(data.text);
      this.specialContainer.find('#color').html(data.color);
      this.specialContainer.find('#image').attr('src', '.' + data.image);
    }
  }

  clearSpecialContainer() {
    this.specialContainer.find('#title').html('');
    this.specialContainer.find('#text').html('');
    this.specialContainer.find('#color').html('');
    this.specialContainer.find('#image').attr('src', '');
  }
}

$(document).ready(() => {
  const specialObject = {
    formSelector: '#specials form',
    formSubmitButtonSelector: '#special-submit'
  }
  const special = new Special(specialObject);
  special.init();
});
