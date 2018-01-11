'use strict';

module.exports = function (el) {
  var elRipple = document.createElement('DIV');
  elRipple.classList.add('sws-gotop-ripple');
  el.appendChild(elRipple);
};