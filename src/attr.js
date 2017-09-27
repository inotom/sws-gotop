import existy from 'swsutils/src/existy';

export default (el, key, orig) => {
  if (existy(el) && el.hasAttribute(key)) {
    return el.getAttribute(key);
  }
  return orig;
};
