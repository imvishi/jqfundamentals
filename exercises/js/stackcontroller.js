class StackController {
  constructor(stackControllerObject) {
    this.stackContainer = $(stackControllerObject.formSelector);
    this.addButton = $(stackControllerObject.addButtonSelector);
    this.stackCount = 0;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.addButton.click(() => {
      this.stackCount += 1;
      this.stackContainer.append($('<div></div>').addClass('item').text(this.stackCount));
    });

    this.stackContainer.on('click', '.item', (stackChild) => {
      const stackChildElement = $(stackChild.target)
      if (stackChildElement.index() !== this.stackCount - 1) {
        stackChildElement.addClass('current').siblings().removeClass('current');
      } else {
        this.stackCount -= 1;
        stackChildElement.remove();
      }
    });
  }
}

$(document).ready(() => {
  const stackControllerObject = {
    formSelector: '#stack',
    addButtonSelector: '#add'
  }
  const stackController = new StackController(stackControllerObject);
  stackController.init();
});
