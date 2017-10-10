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
    let size     = parseInt(attr(elSwsGotop, 'data-sws-gotop-size', 50), 10);
    let image    = attr(elSwsGotop, 'data-sws-gotop-src', null);

    // add style.
    let elStyle = document.createElement('STYLE');
    elStyle.textContent = css(elSwsGotop, size, image);
    document.head.appendChild(elStyle);

    // scroll to top by click event.
    const elRipple = elSwsGotop.querySelector('.sws-gotop-ripple');
    elSwsGotop.addEventListener('click', (e) => {
      e.preventDefault();
      if (existy(elRipple)) {
        const rect = elSwsGotop.getBoundingClientRect();
        elRipple.style.left = (e.clientX - rect.left - size) + 'px';
        elRipple.style.top = (e.clientY - rect.top - size) + 'px';
        if (!elRipple.classList.contains('is-sws-gotop-ripple-animate')) {
          elRipple.classList.add('is-sws-gotop-ripple-animate');
          setTimeout(() => {
            elRipple.classList.remove('is-sws-gotop-ripple-animate');
          }, 750);
        }
      }
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
      elSwsGotop.classList[method]('is-sws-gotop-active');
    }, false);

    // hide element with mobile device.
    window.addEventListener('resize', () => {
      display(elSwsGotop);
    }, false);
    display(elSwsGotop);
  }
};
