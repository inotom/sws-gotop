'use strict';

var attr = require('./attr.js');

var isMobile = function isMobile(el) {
  var width = attr(el, 'data-sws-gotop-mobile-width', 640);
  if (parseInt(width, 10) === 0) {
    return false;
  }
  return window.matchMedia('(max-width: ' + width + 'px)').matches;
};

module.exports = function (el) {
  var display = 'block';
  if (isMobile(el)) {
    display = 'none';
  }
  el.style.display = display;
};