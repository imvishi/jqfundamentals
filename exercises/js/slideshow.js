class SlideShow {
  constructor(slideShowObject) {
    this.animationTime = slideShowObject.animationTime;
    this.sliderContainerSelector = slideShowObject.sliderContainerSelector;
    this.sliderSelector = slideShowObject.sliderSelector;
  }

  init() {
    this.findDomElements();
    this.moveSliderToBodyTop();
    this.createNavBar();
    this.startSlideShow();
  }

  findDomElements() {
    this.slider = $(this.sliderSelector);
    this.sliderChilden = this.slider.children();
    this.sliderContainer = $(this.sliderContainerSelector);
    this.navbar = $('<nav></nav>');
  }

  moveSliderToBodyTop() {
    this.slider.remove()
    this.sliderContainer.prepend(this.slider);
  }

  createNavBar() {
    this.sliderContainer.prepend(this.navbar);
    this.sliderChilden.each((key, value) => {
      const sliderChild = $(value);
      const navbarText = sliderChild.find('h2').text();
      const navbarItem = $(`<li id="${navbarText}">${navbarText}</li>`)
      sliderChild.data('navbarItem', navbarItem);
      this.navbar.append(navbarItem);
    });
  }

  updateNavBarCurrentTab(navbarItem) {
    navbarItem.siblings().removeClass('current');
    navbarItem.addClass('current');
  }

  startSlideShow() {
    this.sliderChilden.each(function() {
      $(this).fadeOut();
    });
    this.loopSliderAnimation()
  }

  loopSliderAnimation() {
    let animationDelay = 0;
    this.updateNavBarCurrentTab(this.sliderChilden.first().data('navbarItem'));
    this.sliderChilden.each((key, child) => {
      const childElement = $(child);
      const nextChildElement = childElement.next();
      childElement.delay(animationDelay).fadeIn(this.animationTime, () => {
        childElement.fadeOut();
        if (nextChildElement.length === 0) {
          this.loopSliderAnimation();
        } else {
          this.updateNavBarCurrentTab(nextChildElement.data('navbarItem'));
        }
      });
      animationDelay += this.animationTime;
    });
  }
}

$(document).ready(() => {
  const slideShowObject = {
    sliderSelector: '#slideshow',
    sliderContainerSelector: 'body',
    animationTime: 3000
  }
  const slideShow = new SlideShow(slideShowObject);
  slideShow.init();
});
