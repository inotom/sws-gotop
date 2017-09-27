import attr from './attr.js';

const isMobile = (el) => {
  let width  = attr(el, 'data-sws-gotop-mobile-width', 640);
  if (parseInt(width, 10) === 0) {
    return false;
  }
  return window.matchMedia('(max-width: ' + width + 'px)').matches;
};

export default (el) => {
  let display = 'block';
  if (isMobile(el)) {
    display = 'none';
  }
  el.style.display = display;
};
