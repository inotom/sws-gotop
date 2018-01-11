'use strict';

var existy = require('swsutils/src/existy');
var attr = require('./attr.js');
var css = require('./css.js');
var scroll = require('./scroll.js');
var display = require('./display.js');

var KEY_ENTER = 13;

module.exports = function () {

  var elSwsGotop = document.getElementById('sws-gotop');

  if (existy(elSwsGotop)) {
    var boundary = attr(elSwsGotop, 'data-sws-gotop-boundary', 200);
    var size = parseInt(attr(elSwsGotop, 'data-sws-gotop-size', 50), 10);
    var image = attr(elSwsGotop, 'data-sws-gotop-src', null);

    // add style.
    if (!existy(document.getElementById('sws-gotop-style'))) {
      var elStyle = document.createElement('STYLE');
      elStyle.id = 'sws-gotop-style';
      elStyle.textContent = css(elSwsGotop, size, image);
      document.head.appendChild(elStyle);
    }

    // scroll to top by click event.
    var elRipple = elSwsGotop.querySelector('.sws-gotop-ripple');
    elSwsGotop.addEventListener('click', function (e) {
      e.preventDefault();
      if (existy(elRipple)) {
        var rect = elSwsGotop.getBoundingClientRect();
        elRipple.style.left = e.clientX - rect.left - size + 'px';
        elRipple.style.top = e.clientY - rect.top - size + 'px';
        if (!elRipple.classList.contains('is-sws-gotop-ripple-animate')) {
          elRipple.classList.add('is-sws-gotop-ripple-animate');
          setTimeout(function () {
            elRipple.classList.remove('is-sws-gotop-ripple-animate');
          }, 750);
        }
      }
      scroll();
    }, false);

    // scroll to top by enter key down event.
    elSwsGotop.addEventListener('keydown', function (e) {
      e.preventDefault();
      if (e.keyCode === KEY_ENTER) {
        scroll();
      }
    }, false);

    // toggle display by scrolling.
    var requestID = void 0;
    window.addEventListener('scroll', function () {
      if (requestID) {
        cancelAnimationFrame(requestID);
      }
      var method = window.pageYOffset > boundary ? 'add' : 'remove';
      elSwsGotop.classList[method]('is-sws-gotop-active');
    }, false);

    // hide element with mobile device.
    window.addEventListener('resize', function () {
      display(elSwsGotop);
    }, false);
    display(elSwsGotop);
  }
};