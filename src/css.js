import existy from 'swsutils/src/existy';
import attr from './attr.js';

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


export default (el) => {
  let size      = attr(el, 'data-sws-gotop-size', 50);
  let right     = attr(el, 'data-sws-gotop-right', '50px');
  let bottom    = attr(el, 'data-sws-gotop-bottom', '100px');
  let bottomGap = attr(el, 'data-sws-gotop-bottom-gap', '0px');
  let zIndex    = attr(el, 'data-sws-gotop-z-index', 1000);
  let bgColor   = attr(el, 'data-sws-gotop-bg-color', '#ffc966');
  let fgColor   = attr(el, 'data-sws-gotop-fg-color', '#ffffff');
  let opacity   = attr(el, 'data-sws-gotop-opacity', 1);
  let radius    = attr(el, 'data-sws-gotop-radius', '50%');
  let weight    = attr(el, 'data-sws-gotop-weight', 'normal');
  let image     = attr(el, 'data-sws-gotop-src', null);

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
#sws-gotop.is-active {
  bottom: ${bottom};
  z-index: ${zIndex};
  opacity: 1;
}
#sws-gotop.is-active:hover {
  opacity: ${opacity};
}
`;
};
