/** @prettier */

import { LitElement, html, customElement, property, css } from 'lit-element';
import { throttle } from 'throttle-debounce';
import { scrollTo } from '@inotom/smoothscroll';

const RIPPLE_DURATION = 750;

interface RipplePosition {
  rippleTop: number;
  rippleLeft: number;
}

const getRippleStartPosition = (event: MouseEvent): RipplePosition => {
  const el = event?.target as HTMLElement;
  const rect = el.getBoundingClientRect();
  const rippleTop = event.clientY - rect.top;
  const rippleLeft = event.clientX - rect.left;

  return {
    rippleTop,
    rippleLeft,
  };
};

const updateGotop = (
  elGotop: HTMLButtonElement,
  boundaryHeight: number,
  mediaQuery: string
): void => {
  if (window.matchMedia(mediaQuery).matches) {
    elGotop.setAttribute('aria-hidden', 'true');
    elGotop.setAttribute('disabled', '');
    elGotop.removeAttribute('is-moving');
    return;
  }

  const nextState = window.pageYOffset < boundaryHeight;

  if (nextState && !elGotop.hasAttribute('disabled')) {
    elGotop.setAttribute('aria-hidden', 'true');
    elGotop.setAttribute('disabled', '');
    elGotop.removeAttribute('is-moving');
  } else if (!nextState && elGotop.hasAttribute('disabled')) {
    elGotop.setAttribute('aria-hidden', 'false');
    elGotop.removeAttribute('disabled');
  }
};

@customElement('sws-gotop')
class SwsGotop extends LitElement {
  static styles = css`
    :host {
      --sws-gotop-size: 80px;
      --sws-gotop-right: 50px;
      --sws-gotop-bottom: 100px;
      --sws-gotop-z-index: 1000;
      --sws-gotop-transition: opacity 0.3s, transform 0.3s;
      --sws-gotop-transform: translate3d(0, 50px, 0);
      --sws-gotop-fg-color: #fff;
      --sws-gotop-bg-color: #933;
      --sws-gotop-hover-opacity: 1;
      --sws-gotop-border-radius: 50%;
      --sws-gotop-border: 0 none;
      --sws-gotop-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      --sws-gotop-ripple-color: rgba(255, 255, 255, 0.5);
      --sws-gotop-arrow-color: #fff;
      --sws-gotop-arrow-weight: 2px;
      --sws-gotop-arrow-scale: 1;
      --sws-gotop-pointer-focus-outline-width: 0;
      --sws-gotop-svg-max-width: 100%;
    }

    .gotop {
      overflow: hidden;
      position: fixed;
      right: var(--sws-gotop-right);
      bottom: var(--sws-gotop-bottom);
      z-index: var(--sws-gotop-z-index);
      width: var(--sws-gotop-size);
      height: var(--sws-gotop-size);
      padding: 0;
      color: var(--sws-gotop-fg-color);
      background-color: var(--sws-gotop-bg-color);
      line-height: 1;
      border-radius: var(--sws-gotop-border-radius);
      border: var(--sws-gotop-border);
      box-shadow: var(--sws-gotop-shadow);
      transition: var(--sws-gotop-transition);
      cursor: pointer;
    }

    .gotop:hover {
      opacity: var(--sws-gotop-hover-opacity);
    }

    .gotop:focus:not(:focus-visible) {
      outline-width: var(--sws-gotop-pointer-focus-outline-width);
    }

    .gotop svg {
      transform: scale(var(--sws-gotop-arrow-scale));
      max-width: var(--sws-gotop-svg-max-width);
    }

    .gotop svg polyline {
      fill: none;
      stroke: var(--sws-gotop-arrow-color);
      stroke-width: var(--sws-gotop-arrow-weight);
      stroke-linecap: square;
      stroke-linejoin: miter;
    }

    .gotop img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gotop[aria-hidden='true'] {
      pointer-events: none;
      opacity: 0;
      transform: var(--sws-gotop-transform);
    }

    .gotop__ripple {
      position: absolute;
      width: 200%;
      height: 200%;
      background-color: var(--sws-gotop-ripple-color);
      border-radius: var(--sws-gotop-border-radius);
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
    }

    .gotop__ripple[is-active] {
      animation: sws-gotop-ripple-animation 0.75s ease-out;
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

  @property({ type: Number })
  boundary = 200;

  @property({ type: String })
  src = '';

  @property({ type: String })
  media = '(max-width: 768px)';

  @property({ type: String })
  label = '';

  @property({ type: Number })
  index = 0;

  render() {
    const imgHtml =
      this.src.length > 0
        ? html`<img src="${this.src}" alt="" />`
        : html`
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="60px"
              height="40px"
              viewBox="0 0 60 40"
            >
              <polyline points="10,30, 30,10, 50,30" />
            </svg>
          `;
    return html`
      <button
        class="gotop"
        @click="${this._onClick}"
        aria-label="${this.label}"
        aria-hidden="true"
        disabled
        tabindex="${this.index}"
      >
        ${imgHtml}
        <div class="gotop__ripple"></div>
      </button>
    `;
  }

  firstUpdated() {
    const elGotop = this.shadowRoot?.querySelector('.gotop') as HTMLButtonElement;
    const elRipple = this.shadowRoot?.querySelector('.gotop__ripple') as HTMLDivElement;
    if (!elGotop || !elRipple) {
      return;
    }

    const scrollAnimationFrame = () => {
      window.requestAnimationFrame(() => {
        updateGotop(elGotop, this.boundary, this.media);
      });
    };

    window.addEventListener('scroll', throttle(200, false, scrollAnimationFrame));
    window.addEventListener('resize', throttle(200, false, scrollAnimationFrame));

    updateGotop(elGotop, this.boundary, this.media);
  }

  private _onClick(e: MouseEvent): void {
    const elGotop = this.shadowRoot?.querySelector('.gotop') as HTMLButtonElement;
    const elRipple = this.shadowRoot?.querySelector('.gotop__ripple') as HTMLDivElement;

    if (!elGotop || !elRipple) {
      return;
    }

    if (elGotop.hasAttribute('is-moving')) {
      return;
    }

    const rectRoot = elGotop.getBoundingClientRect();
    const size = rectRoot.width;

    const { rippleTop, rippleLeft } = getRippleStartPosition(e);

    elRipple.style.top = rippleTop - size + 'px';
    elRipple.style.left = rippleLeft - size + 'px';

    elRipple.setAttribute('is-active', '');

    setTimeout(() => {
      elRipple.removeAttribute('is-active');
    }, RIPPLE_DURATION);

    const from =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    scrollTo(from, 0);
    elGotop.setAttribute('is-moving', '');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sws-gotop': SwsGotop;
  }
}
