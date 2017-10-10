# sws-gotop

A JavaScript to display the button to scroll to the top of the page.

## Usage

Place HTML element with ID `sws-gotop`.

```html
<div id="sws-gotop"></div>
```

Set element's style etc... with data attribute.

```html
<div id="sws-gotop" role="button" tabindex="1"
  data-sws-gotop-size="100"
  data-sws-gotop-right="200px"
  data-sws-gotop-bottom="200px"
  data-sws-gotop-bottom-gap="20px"
  data-sws-gotop-z-index="999"
  data-sws-gotop-bg-color="#96c"
  data-sws-gotop-fg-color="#fce"
  data-sws-gotop-opacity="0.5"
  data-sws-gotop-radius="20px"
  data-sws-gotop-weight="bold"
  data-sws-gotop-ripple-color="rgba(0, 0, 0, .5)"
  data-sws-gotop-boundary="500"
  data-sws-gotop-mobile-width="600"></div>
```

## Data attributes

| attribute name                | content                                    |  defaults                 |
|:------------------------------|:-------------------------------------------|:--------------------------|
| `data-sws-gotop-size`         | Vartical and horizontal size               | `50`                      |
| `data-sws-gotop-right`        | Position from the right edge of the window | `50px`                    |
| `data-sws-gotop-bottom`       | Position from the bottom of window         | `100px`                   |
| `data-sws-gotop-bottom-gap`   | Distance to slide up from the bottom       | `0px`                     |
| `data-sws-gotop-z-index`      | Value of z-index                           | `1000`                    |
| `data-sws-gotop-bg-color`     | Background color                           | `#ffc966`                 |
| `data-sws-gotop-fg-color`     | Foreground color                           | `#ffffff`                 |
| `data-sws-gotop-opacity`      | Transparency with mouse over               | `1`                       |
| `data-sws-gotop-radius`       | Border radius size                         | `50%`                     |
| `data-sws-gotop-weight`       | Thickness of the arrow                     | `normal`                  |
| `data-sws-gotop-ripple-color` | Ripple effect color                        | `rgba(255, 255, 255, .5)` |
| `data-sws-gotop-boundary`     | Scroll potision to start display           | `200`                     |
| `data-sws-gotop-mobile-width` | Mobile device judgment width               | `640`                     |
| `data-sws-gotop-src`          | Image path                                 | `null`                    |

## License

MIT

## Author

iNo
