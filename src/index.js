import existy from 'swsutils/src/existy';
import attr from './attr.js';
import css from './css.js';
import scroll from './scroll.js';
import display from './display.js';

const KEY_ENTER = 13;

export default () => {

  const elSwsGotop = document.getElementById('sws-gotop');

  if (existy(elSwsGotop)) {
    let boundary = attr(elSwsGotop, 'data-sws-gotop-boundary', 200);

    // add style.
    let elStyle = document.createElement('STYLE');
    elStyle.textContent = css(elSwsGotop);
    document.head.appendChild(elStyle);

    // scroll to top by click event.
    elSwsGotop.addEventListener('click', (e) => {
      e.preventDefault();
      scroll();
    }, false);

    // scroll to top by enter key down event.
    elSwsGotop.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === KEY_ENTER) {
        scroll();
      }
    }, false);

    // toggle display by scrolling.
    let requestID;
    window.addEventListener('scroll', () => {
      if (requestID) {
        cancelAnimationFrame(requestID);
      }
      let method = (window.pageYOffset > boundary) ? 'add' : 'remove';
      elSwsGotop.classList[method]('is-active');
    }, false);

    // hide element with mobile device.
    window.addEventListener('resize', () => {
      display(elSwsGotop);
    }, false);
    display(elSwsGotop);
  }
};
