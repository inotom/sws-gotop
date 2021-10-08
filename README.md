# sws-gotop

A web components to display the button to scroll to the top of the page.

## Demo

[Demo](http://sandbox.serendip.ws/sws-gotop.html)

## Usage

Place `sws-gotop` custom element.

```html
<sws-gotop></sws-gotop>
<script type="module" src="sws-gotop.min.js" defer></script>
```

Set element's style etc... by css custom properties.

```css
sws-gotop {
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
  --sws-gotop-ripple-border-radius: 50%;
  --sws-gotop-arrow-color: #fff;
  --sws-gotop-arrow-weight: 2px;
  --sws-gotop-arrow-scale: 1;
  --sws-gotop-pointer-focus-outline-width: 0;
  --sws-gotop-svg-max-width: 100%;
}
```

## CSS custom properties

| css custom property name                  | content                                    |  defaults                        |
|:------------------------------------------|:-------------------------------------------|:---------------------------------|
| `--sws-gotop-size`                        | Vartical and horizontal size               | `80px`                           |
| `--sws-gotop-right`                       | Position from the right edge of the window | `50px`                           |
| `--sws-gotop-bottom`                      | Position from the bottom of window         | `100px`                          |
| `--sws-gotop-z-index`                     | Value of z-index                           | `1000`                           |
| `--sws-gotop-transition`                  | Show in transition                         | `opacity 0.3s, transform 0.3s`   |
| `--sws-gotop-transform`                   | Move button position before show in        | `translate3d(0, 50px, 0)`        |
| `--sws-gotop-fg-color`                    | Foreground color                           | `#fff`                           |
| `--sws-gotop-bg-color`                    | Background color                           | `#933`                           |
| `--sws-gotop-hover-opacity`               | Transparency with mouse over               | `1`                              |
| `--sws-gotop-border-radius`               | Border radius size                         | `50%`                            |
| `--sws-gotop-border`                      | Border style                               | `0 none`                         |
| `--sws-gotop-shadow`                      | Button shadow style                        | `2px 2px 5px rgba(0, 0, 0, 0.2)` |
| `--sws-gotop-ripple-color`                | Ripple effect color                        | `rgba(255, 255, 255, 0.5)`       |
| `--sws-gotop-ripple-border-radius`        | Ripple border radius size                  | `50%`                            |
| `--sws-gotop-arrow-color`                 | Arrow color                                | `#fff`                           |
| `--sws-gotop-arrow-weight`                | Thickness of the arrow                     | `2px`                            |
| `--sws-gotop-arrow-scale`                 | Scale size of the arrow                    | `1`                              |
| `--sws-gotop-pointer-focus-outline-width` | Mouse pointer Fouced outline width         | `0`                              |
| `--sws-gotop-svg-max-width`               | Arrow svg image max width                  | `100%`                           |

## Options

```html
<sws-gotop
  boundary="200"
  src="button.png"
  media="(max-width: 768px)"
  label="Go to page top"
  index="0"
></sws-gotop>
```

| option name | content                          | defaults             |
|:------------|:---------------------------------|:---------------------|
| `boundary`  | Scroll position to start display | `200`                |
| `src`       | Image path                       | `''`                 |
| `media`     | Mobile device judgment width     | `(max-width: 768px)` |
| `label`     | `aria-label` text                | `''`                 |
| `index`     | `tabindex` value                 | `0`                  |

## License

MIT

## Author

inotom
