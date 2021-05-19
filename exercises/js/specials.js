class Special {
  static specialJsonUrl = 'http://localhost:8000/Documents/Ruby/Javascript/jqery/jqfundamentals/exercises/data/specials.json';

  constructor(specialObject) {
    this.specialObject = specialObject;
  }

  init() {
    this.createTargetDivForSpecial();
    this.removeSubmitButton();
    this.bindEvents();
  }

  createTargetDivForSpecial() {
    this.form = $(this.specialObject.formSelector);
    this.specialContainer = $(`<div>
      <h2 id="title"></h2>
      <p id="text"></p>
      <p id="color"></p>
      <img id="image">
      </div>`);
    this.specialContainer.insertAfter(this.form);
  }

  removeSubmitButton() {
    this.form.find('input').parent().remove();
  }

  bindEvents() {
    this.form.find('select').change((e) => {
      if (e.target.selectedIndex > 0) {
        if (this.specialData) {
          this.updateSpecialContainer(e.target.value);
        } else {
          $.getJSON(Special.specialJsonUrl, (res) => {
            this.specialData = res
            this.updateSpecialContainer(e.target.value);
          });
        }
      } else {
        this.clearSpecialContainer();
      }
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
    formSelector: '#specials form'
  }
  const special = new Special(specialObject);
  special.init();
});
