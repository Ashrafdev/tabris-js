/**
 * Distance to a parent's or sibling's opposing edge in one of these formats:
 * - **offset** the distance from the parent's opposing edge in device independent pixels
 * - **percentage** the distance from the parent's opposing edge in percent of the parent's width
 * - **Widget** attach this edge to the given siblings's opposing edge
 * - **"selector"**
 * - **"prev()"** Same as above, but as space-separated string list instead of array
 * - **"selector offset"**
 * - **"prev() offset"**
 * - **[Widget, offset]** the distance from the given widget's opposing edge in pixel
 * - **"Widget, offset"**Same as above, but as space-separated string list instead of array.
 * - **[percentage, offset]** the distance from the parent's opposing edge in percent of the parent's width plus a fixed offset in pixels
 * - **"percentage offset"** Same as above, but as space-separated string list instead of array
 * - **[selector, offset]**
 * - **["prev()", offset]**
 */
type Margin = [string | Widget | number, Widget | number] | string | number | Widget | undefined;

/**
 * Represents pixel data of a `Canvas` widget.
 */
interface ImageData {

  /**
   * A one-dimensional array containing the data in the RGBA order, with integer values between 0 and 255 (included).
   */
  readonly data: Uint8ClampedArray;

  /**
   * The actual height of the ImageData, in pixels.
   */
  readonly width: number;

  /**
   * The actual height of the ImageData, in pixels.
   */
  readonly height: number;

}

type Image = string | {

  /**
   * Image path or URL.
   */
  src: string;

  /**
   * Image width, extracted from the image file when missing.
   */
  width?: number;

  /**
   * Image height, extracted from the image file when missing.
   */
  height?: number;

  /**
   * Image scale factor - the image will be scaled down by this factor.
   * Ignored when width or height are set.
   */
  scale?: number;
}

/**
 * Colors are specified as strings using one of the following formats:
 *
 * - **"#xxxxxx"**
 * - **"#xxx"**
 * - **"#xxxxxxxx"**
 * - **"#xxxx"**
 * - **"rgb(r, g, b)"** with **r**, **g** and **b** being numbers in the range 0..255.
 * - **"rgba(r, g, b, a)"** with **a** being a number in the range 0..1.
 * - a color name from the CSS3 specification.
 * - **"transparent"** sets a fully transparent color. This is a shortcut for **"rgba(0, 0, 0, 0)"**.
 * - **"initial"** resets the color to its (platform-dependent) default.
 */
type Color = string;

/**
 * Fonts are specified as strings using the shorthand syntax known from CSS, specifically **"[font-style] [font-weight] font-size [font-family[, font-family]*]"**. The font family may be omitted, in this case the default system font will be used. Generic font families supported across all platforms are **"serif"**, **"sans-serif"**, **"condensed"** and **"monospace"**. Supported font weights are **"light"**, **"thin"**, **"normal"**, **"medium"**, **"bold"** and **"black"**. The value **"initial"** represents the platform default.
 */
type Font = string;

/**
 * Defines how the widget should be arranged. When setting the layout of a widget using **LayoutData**, all currently set layout attributes not in the new LayoutData object will be implicitly reset to null (i.e. "not specified").
 */
interface LayoutData {
    left?: Margin;
    right?: Margin;
    top?: Margin;
    bottom?: Margin;
    centerX?: Offset;
    centerY?: Offset;
    baseline?: Widget | Selector;
    width?: Dimension;
    height?: Dimension;
}

/**
 * A Widget's bounds
 */
interface Bounds {

  /**
   * the horizontal offset from the parent's left edge in dip
   */
  left: number;

  /**
   * the vertical offset from the parent's top edge in dip
   */
  top: number;

  /**
   * the width of the widget in dip
   */
  width: number;

  /**
   * the height of the widget in dip
   */
  height: number;

}

interface Transformation {

  /**
   * Clock-wise rotation in radians. Defaults to \`0\`.
   */
   rotation?: number;

  /**
   * Horizontal scale factor. Defaults to \`1\`.
   */
  scaleX?: number;

  /**
   * Vertical scale factor. Defaults to \`1\`.
   */
  scaleY?: number;

  /**
   * Horizontal translation (shift) in dip. Defaults to \`0\`.
   */
  translationX?: number;

  /**
   * Vertical translation (shift) in dip. Defaults to \`0\`.
   */
  translationY?: number;

  /**
   * Z-axis translation (shift) in dip. Defaults to \`0\`. Android 5.0+ only.
   */
  translationZ?: number;

}

/**
 * An expression or a predicate function to select a set of widgets.
 */
type Selector = string | SelectorFunction;
type SelectorFunction = (widget: Widget) => boolean;

/**
 * A positive float, or 0, representing device independent pixels.
 */
type Dimension = number;
/**
 * A positive or negative float, or 0, representing device independent pixels.
 */
type Offset = number;

interface AnimationOptions {

  /**
   * Time until the animation starts in ms, defaults to 0.
   */
  delay?: number;

  /**
   * Duration of the animation in ms.
   */
  duration?: number;

  /**
   *  Easing function applied to the animation.
   */
  easing?: "linear"|"ease-in"|"ease-out"|"ease-in-out";

  /**
   *  Number of times to repeat the animation, defaults to 0.
   */
  repeat?: number;

  /**
   *  If true, alternates the direction of the animation on every repeat.
   */
  reverse?: boolean;

  /**
   * no effect, but will be given in animation events.
   */
  name?: string;
}

/**
 * Represents dimensions on four edges of a box, as used for padding.
 */
interface BoxDimensions {

  /**
   * The left part, in dip.
   */
  left?: number;

  /**
   * The right part, in dip.
   */
  right?: number;

  /**
   * The top part, in dip.
   */
  top?: number;

  /**
   * The bottom part, in dip.
   */
  bottom?: number;

}

interface PropertyChangedEvent<T,U> extends EventObject<T>{
  readonly value: U
}
