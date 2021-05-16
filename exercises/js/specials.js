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
        this.loadData(e.target.value);
      }
    });
  }

  loadData(selectedValue) {
    if (this.specialData) {
      const data = this.specialData[selectedValue];
      this.specialContainer.find('#title').html(data.title);
      this.specialContainer.find('#text').html(data.text);
      this.specialContainer.find('#color').html(data.color);
      this.specialContainer.find('#image').attr('src', '.' + data.image);
    } else {
      $.getJSON(Special.specialJsonUrl, (res) => {
        this.specialData = res
        this.loadData(selectedValue);
      });
    }
  }
}

$(document).ready(() => {
  const specialObject = {
    formSelector: '#specials form'
  }
  const special = new Special(specialObject);
  special.init();
});
