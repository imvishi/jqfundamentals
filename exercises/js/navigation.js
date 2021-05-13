class Navigation {
  constructor(navigationObject) {
    this.navigationObject = navigationObject;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $(this.navigationObject.headerNavSelector).each(function() {
      $(this).hover(function() {
          $(this).addClass('hover');
          $(this).find('ul').css({
            'display': 'block'
          });
        },
        function() {
          $(this).removeClass('hover');
          $(this).find('ul').css({
            'display': 'none'
          });
        });
    });
  }
}

$(document).ready(() => {
  const navigationObject = {
    headerNavSelector: '#header #nav li'
  }
  const navigation = new Navigation(navigationObject);
  navigation.init();
});
