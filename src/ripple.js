module.exports = (el) => {
  const elRipple = document.createElement('DIV');
  elRipple.classList.add('sws-gotop-ripple');
  el.appendChild(elRipple);
};
