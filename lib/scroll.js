"use strict";

var SCROLL_SPEED = 1000;
var INTERVAL = 16;

var easing = function easing(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};

var scrollTo = function scrollTo(from, to) {
  var startTime = new Date();
  var distance = to - from;
  var intervalId = setInterval(function () {
    var time = new Date() - startTime;
    var current = easing(time, from, distance, SCROLL_SPEED);

    if (time > SCROLL_SPEED) {
      clearInterval(intervalId);
      current = from + distance;
    }

    window.scrollTo(0, current);
  }, INTERVAL);
};

var scroll = function scroll() {
  var from = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var to = 0;
  scrollTo(from, to);
};

module.exports = scroll;