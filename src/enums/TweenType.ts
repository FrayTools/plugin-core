import TweenUtil from '../util/TweenUtil';

export type TweenTypeValue = 'LINEAR' | 'EASE_IN_QUAD' | 'EASE_OUT_QUAD' | 'EASE_IN_OUT_QUAD' | 'EASE_IN_CUBIC' | 'EASE_OUT_CUBIC' | 'EASE_IN_OUT_CUBIC' | 'EASE_IN_QUART' | 'EASE_OUT_QUART' | 'EASE_IN_OUT_QUART' | 'EASE_IN_QUINT' | 'EASE_OUT_QUINT' | 'EASE_IN_OUT_QUINT';

/**
 * Helper map for turning tween strings into TweenUtil values
 */
const EASE_VALUE_MAP:{[key:string]:number} = {
  'LINEAR_QUAD': TweenUtil.LINEAR,
  'EASE_IN_QUAD': TweenUtil.IN_QUAD,
  'EASE_OUT_QUAD': TweenUtil.OUT_QUAD,
  'EASE_IN_OUT_QUAD': TweenUtil.IN_OUT_QUAD,
  'EASE_IN_CUBIC': TweenUtil.IN_CUBIC,
  'EASE_OUT_CUBIC': TweenUtil.OUT_CUBIC,
  'EASE_IN_OUT_CUBIC': TweenUtil.IN_OUT_CUBIC,
  'EASE_IN_QUART': TweenUtil.IN_QUART,
  'EASE_OUT_QUART': TweenUtil.OUT_QUART,
  'EASE_IN_OUT_QUART': TweenUtil.IN_OUT_QUART,
  'EASE_IN_QUINT': TweenUtil.IN_QUINT,
  'EASE_OUT_QUINT': TweenUtil.OUT_QUINT,
  'EASE_IN_OUT_QUINT': TweenUtil.IN_OUT_QUINT
};

export default class TweenType {
  // Type of tween (linear, quadratic, etc.)
  public static readonly LINEAR:string = 'LINEAR';
  public static readonly EASE_IN_QUAD:string = 'EASE_IN_QUAD';
  public static readonly EASE_OUT_QUAD:string = 'EASE_OUT_QUAD';
  public static readonly EASE_IN_OUT_QUAD:string = 'EASE_IN_OUT_QUAD';
  public static readonly EASE_IN_CUBIC:string = 'EASE_IN_CUBIC';
  public static readonly EASE_OUT_CUBIC:string = 'EASE_OUT_CUBIC';
  public static readonly EASE_IN_OUT_CUBIC:string = 'EASE_IN_OUT_CUBIC';
  public static readonly EASE_IN_QUART:string = 'EASE_IN_QUART';
  public static readonly EASE_OUT_QUART:string = 'EASE_OUT_QUART';
  public static readonly EASE_IN_OUT_QUART:string = 'EASE_IN_OUT_QUART';
  public static readonly EASE_IN_QUINT:string = 'EASE_IN_QUINT';
  public static readonly EASE_OUT_QUINT:string = 'EASE_OUT_QUINT';
  public static readonly EASE_IN_OUT_QUINT:string = 'EASE_IN_OUT_QUINT';

  public static toEaseValue(str:TweenTypeValue):number {
    return EASE_VALUE_MAP[str] || TweenUtil.LINEAR;
  }
}
