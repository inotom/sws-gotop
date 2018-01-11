'use strict';

var existy = require('swsutils/src/existy');
var attr = require('./attr.js');
var ripple = require('./ripple.js');

var makeBgImage = function makeBgImage(weight, fgColor, image) {
  if (existy(image)) {
    return image;
  }
  var c = fgColor.replace(/^#/, '');
  if (weight === 'bold') {
    return 'data:image/svg+xml;charset=utf8, %3Csvg version=%271.1%27 xmlns=%27http://www.w3.org/2000/svg%27 width=%2710px%27 height=%2710px%27%3E %3Cpolygon fill=%27%23' + c + '%27 stroke=%27none%27 points=%278.646,7.354 5,3.707 1.354,7.354 0.646,6.646 5,2.293 9.354,6.646%27 /%3E %3C/svg%3E';
  }
  return 'data:image/svg+xml;charset=utf8,%3Csvg version=%271.1%27 xmlns=%27http://www.w3.org/2000/svg%27 width=%2710px%27 height=%2710px%27%3E %3Cpolygon fill=%27%23' + c + '%27 stroke=%27none%27 points=%278.589,6.945 5,3.22 1.413,6.945 1.052,6.598 5,2.499 8.948,6.598%27 /%3E %3C/svg%3E';
};

module.exports = function (el, size, image) {
  var right = attr(el, 'data-sws-gotop-right', '50px');
  var bottom = attr(el, 'data-sws-gotop-bottom', '100px');
  var bottomGap = attr(el, 'data-sws-gotop-bottom-gap', '0px');
  var zIndex = attr(el, 'data-sws-gotop-z-index', 1000);
  var bgColor = attr(el, 'data-sws-gotop-bg-color', '#ffc966');
  var fgColor = attr(el, 'data-sws-gotop-fg-color', '#ffffff');
  var opacity = attr(el, 'data-sws-gotop-opacity', 1);
  var radius = attr(el, 'data-sws-gotop-radius', '50%');
  var weight = attr(el, 'data-sws-gotop-weight', 'normal');
  var rippleBg = attr(el, 'data-sws-gotop-ripple-color', 'rgba(255, 255, 255, .5)');

  // add ripple layer
  if (!existy(image)) {
    ripple(el);
  }

  // add style.
  var bgSize = existy(image) ? '100%' : '70%';
  return '\n#sws-gotop {\n  overflow: hidden;\n  position: fixed;\n  right: ' + right + ';\n  bottom: calc(' + bottom + ' - ' + bottomGap + ');\n  z-index: -1;\n  width: ' + size + 'px;\n  height: ' + size + 'px;\n  color: ' + fgColor + ';\n  background-color: ' + bgColor + ';\n  background-image: url("' + makeBgImage(weight, fgColor, image) + '");\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  background-size: ' + bgSize + ' auto;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);\n  opacity: 0;\n  border-radius: ' + radius + ';\n  cursor: pointer;\n  transition: none .2s ease-out 0s;\n  transition-property: opacity, bottom;\n}\n#sws-gotop.is-sws-gotop-active {\n  bottom: ' + bottom + ';\n  z-index: ' + zIndex + ';\n  opacity: 1;\n}\n#sws-gotop.is-sws-gotop-active:hover {\n  opacity: ' + opacity + ';\n}\n#sws-gotop .sws-gotop-ripple {\n  position: absolute;\n  width: ' + size * 2 + 'px;\n  height: ' + size * 2 + 'px;\n  background-color: ' + rippleBg + ';\n  border-radius: 50%;\n  transform: scale(0);\n  opacity: 0;\n  pointer-events: none;\n}\n#sws-gotop .sws-gotop-ripple.is-sws-gotop-ripple-animate {\n  animation: sws-gotop-ripple-animation .75s ease-out;\n}\n@keyframes sws-gotop-ripple-animation {\n  from {\n    opacity: 1;\n  }\n  to {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n';
};