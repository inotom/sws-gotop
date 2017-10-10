import existy from 'swsutils/src/existy';
import attr from './attr.js';
import ripple from './ripple.js';

const makeBgImage = (weight, fgColor, image) => {
  if (existy(image)) {
    return image;
  }
  let c = fgColor.replace(/^#/, '');
  if (weight === 'bold') {
    return 'data:image/svg+xml;charset=utf8, %3Csvg version=%271.1%27 xmlns=%27http://www.w3.org/2000/svg%27 width=%2710px%27 height=%2710px%27%3E %3Cpolygon fill=%27%23' + c + '%27 stroke=%27none%27 points=%278.646,7.354 5,3.707 1.354,7.354 0.646,6.646 5,2.293 9.354,6.646%27 /%3E %3C/svg%3E';
  }
  return 'data:image/svg+xml;charset=utf8,%3Csvg version=%271.1%27 xmlns=%27http://www.w3.org/2000/svg%27 width=%2710px%27 height=%2710px%27%3E %3Cpolygon fill=%27%23' + c + '%27 stroke=%27none%27 points=%278.589,6.945 5,3.22 1.413,6.945 1.052,6.598 5,2.499 8.948,6.598%27 /%3E %3C/svg%3E';
};


export default (el, size, image) => {
  let right     = attr(el, 'data-sws-gotop-right', '50px');
  let bottom    = attr(el, 'data-sws-gotop-bottom', '100px');
  let bottomGap = attr(el, 'data-sws-gotop-bottom-gap', '0px');
  let zIndex    = attr(el, 'data-sws-gotop-z-index', 1000);
  let bgColor   = attr(el, 'data-sws-gotop-bg-color', '#ffc966');
  let fgColor   = attr(el, 'data-sws-gotop-fg-color', '#ffffff');
  let opacity   = attr(el, 'data-sws-gotop-opacity', 1);
  let radius    = attr(el, 'data-sws-gotop-radius', '50%');
  let weight    = attr(el, 'data-sws-gotop-weight', 'normal');
  let rippleBg  = attr(el, 'data-sws-gotop-ripple-color', 'rgba(255, 255, 255, .5)');

  // add ripple layer
  if (!existy(image)) {
    ripple(el);
  }

  // add style.
  let bgSize = existy(image) ? '100%' : '70%';
  return `
#sws-gotop {
  overflow: hidden;
  position: fixed;
  right: ${right};
  bottom: calc(${bottom} - ${bottomGap});
  z-index: -1;
  width: ${size}px;
  height: ${size}px;
  color: ${fgColor};
  background-color: ${bgColor};
  background-image: url("${makeBgImage(weight, fgColor, image)}");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: ${bgSize} auto;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  opacity: 0;
  border-radius: ${radius};
  cursor: pointer;
  transition: none .2s ease-out 0s;
  transition-property: opacity, bottom;
}
#sws-gotop.is-sws-gotop-active {
  bottom: ${bottom};
  z-index: ${zIndex};
  opacity: 1;
}
#sws-gotop.is-sws-gotop-active:hover {
  opacity: ${opacity};
}
#sws-gotop .sws-gotop-ripple {
  position: absolute;
  width: ${size * 2}px;
  height: ${size * 2}px;
  background-color: ${rippleBg};
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}
#sws-gotop .sws-gotop-ripple.is-sws-gotop-ripple-animate {
  animation: sws-gotop-ripple-animation .75s ease-out;
}
@keyframes sws-gotop-ripple-animation {
  from {
    opacity: 1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}
`;
};
