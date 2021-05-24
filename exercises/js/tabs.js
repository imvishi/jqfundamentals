class TabNavigation {
  constructor(tabNavigationObject) {
    this.modules = $(tabNavigationObject.moduleSelector);
  }

  init() {
    this.hideAllModules();
    this.createTabs();
    this.selectTab(this.tabList.children().first());
    this.bindEvents();
  }

  hideAllModules() {
    this.modules.hide();
  }

  createTabs() {
    let tablistElements = $()
    this.modules.each((index, element) => {
      const moduleElement = $(element)
      const tab = $('<li>').text(moduleElement.find('h2').text())
      tab.data('module', moduleElement);
      tablistElements = tablistElements.add(tab);
    });
    this.tabList = $('<ul/>')
    this.tabList.append(tablistElements).insertBefore(this.modules.first());
  }

  bindEvents() {
    this.tabList.on('click', 'li', (event) => {
      this.selectTab($(event.target));
    });
  }

  selectTab(tabElement) {
    tabElement.addClass('current').siblings().removeClass('current');
    tabElement.data('module').show().siblings('.module').hide();
  }
}

$(document).ready(() => {
  const tabNavigationObject = {
    moduleSelector: ".module"
  }
  const tabNavigation = new TabNavigation(tabNavigationObject);
  tabNavigation.init();
});
