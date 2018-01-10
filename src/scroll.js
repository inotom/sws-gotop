const SCROLL_SPEED = 1000;
const INTERVAL   = 16;

const easing = (t, b, c, d) => {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};

const scrollTo = (from, to) => {
  let startTime  = (new Date());
  let distance   = to - from;
  let intervalId = setInterval(() => {
    let time = (new Date()) - startTime;
    let current = easing(time, from, distance, SCROLL_SPEED);

    if (time > SCROLL_SPEED) {
      clearInterval(intervalId);
      current = from + distance;
    }

    window.scrollTo(0, current);
  }, INTERVAL);
};

const scroll = () => {
  let from = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  let to = 0;
  scrollTo(from, to);
};

module.exports = scroll;
