'use strict';

var existy = require('swsutils/src/existy');

module.exports = function (el, key, orig) {
  if (existy(el) && el.hasAttribute(key)) {
    return el.getAttribute(key);
  }
  return orig;
};