class TabNavigation {
  constructor(tabNavigationObject) {
    this.module = $(tabNavigationObject.moduleSelector);
    this.moduleMap = new Map();
    Array.from(this.module).map((node) => {
      const moduleElement = $(node)
      this.moduleMap.set(moduleElement.find('h2').text(), moduleElement);
    });
  }

  init() {
    this.hideAllModules();
    this.createTabs();
    this.selectTab(this.tabListElement.first());
    this.bindEvents();
  }

  hideAllModules() {
    this.module.hide();
  }

  createTabs() {
    let tablistElements = $()
    this.moduleMap.forEach((value, key) => {
      tablistElements = tablistElements.add($('<li/>').text(key));
    });

    $('<ul id="tab"></ul>').append(tablistElements).insertBefore(this.module.first());
    this.tabListElement = $('#tab li');
  }

  bindEvents() {
    this.tabListElement.click((node) => {
      this.selectTab($(node.target));
    });
  }

  selectTab(tabElement) {
    tabElement.addClass('current').siblings().removeClass('current');
    this.updateModuleVisibility(tabElement.text());
  }

  updateModuleVisibility(clickedTabText) {
    this.moduleMap.forEach((value, key) => {
      if (key === clickedTabText) {
        this.moduleMap.get(key).show();
      } else {
        this.moduleMap.get(key).hide();
      }
    });
  }
}

$(document).ready(() => {
  const tabNavigationObject = {
    moduleSelector: ".module"
  }
  const tabNavigation = new TabNavigation(tabNavigationObject);
  tabNavigation.init();
});
