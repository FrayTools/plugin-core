import { PivotableSymbolTypes, ScalableSymbolTypes, TweenTypeValue } from 'src/types/fraytools';
import TweenType from '../enums/TweenType';
import MathUtil from '../util/MathUtil';

/**
 * Position easing utility that takes a "from" and a "to" point and calculates the points between the two based on time passed "t".
 * 
 * Algorithm source: https://gist.github.com/gre/1650294
 */
export default class TweenUtil {
  public static readonly LINEAR:number = 0;
  public static readonly IN_QUAD:number = 1;
  public static readonly OUT_QUAD:number = 2;
  public static readonly IN_OUT_QUAD:number = 3;
  public static readonly IN_CUBIC:number = 4;
  public static readonly OUT_CUBIC:number = 5;
  public static readonly IN_OUT_CUBIC:number = 6;
  public static readonly IN_QUART:number = 7;
  public static readonly OUT_QUART:number = 8;
  public static readonly IN_OUT_QUART:number = 9;
  public static readonly IN_QUINT:number = 10;
  public static readonly OUT_QUINT:number = 11;
  public static readonly IN_OUT_QUINT:number = 12;
  
  public static interpolate(from:number, to:number, t:number, easeType:number) {
    if (t < 0) {
      t = 0;
    } else if (t > 1) {
      t = 1;
    }
    if (easeType == TweenUtil.IN_QUAD) {
      // accelerating from zero velocity
      return from + (to - from) * (t * t);
    } else if (easeType == TweenUtil.OUT_QUAD) {
      // decelerating to zero velocity
      return from + (to - from) * (t*(2-t));
    } else if (easeType == TweenUtil.IN_OUT_QUAD) {
      // acceleration until halfway, then deceleration
      return from + (to - from) * (t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    } else if (easeType == TweenUtil.IN_CUBIC) {
      // accelerating from zero velocity 
      return from + (to - from) * (t * t * t);
    } else if (easeType == TweenUtil.OUT_CUBIC) {
      // decelerating to zero velocity 
      return from + (to - from) * ((--t) * t * t + 1);
    } else if (easeType == TweenUtil.IN_OUT_CUBIC) {
      // acceleration until halfway, then deceleration 
      return from + (to - from) * (t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
    } else if (easeType == TweenUtil.IN_QUART) {
      // accelerating from zero velocity
      return from + (to - from) * (t * t * t * t);
    } else if (easeType == TweenUtil.OUT_QUART) {
      // decelerating to zero velocity 
      return from + (to - from) * (1 - (--t) * t * t * t);
    } else if (easeType == TweenUtil.IN_OUT_QUART) {
      // acceleration until halfway, then deceleration
      return from + (to - from) * (t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t);
    } else if (easeType == TweenUtil.IN_QUINT) {
      // accelerating from zero velocity
      return from + (to - from) * (t * t * t * t * t);
    } else if (easeType == TweenUtil.OUT_QUINT) {
      // decelerating to zero velocity
      return from + (to - from) * (1 + (--t) * t * t * t * t);
    } else if (easeType == TweenUtil.IN_OUT_QUINT) {
      // acceleration until halfway, then deceleration 
      return from + (to - from) * (t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t);
    } else {
      // no easing, no acceleration
      return from + (to - from) * t;
    }
  }

  /**
   * Helper method for calcultating the proper position of a rotatable/pivotable symbol that's tweened.
   * @param symbol The symbol on the current keyframe.
   * @param nextSymbol The symbol on the subsequent keyframe.
   * @param interpolation Interpolation percentage value (0-1.0).
   * @param tweenType The type of tween
   * @returns The correct x and y positions of the symbol after the tween interpolation is applied.
   */
  public static calculateTweenedSymbolPosition(symbol:PivotableSymbolTypes&ScalableSymbolTypes, nextSymbol:PivotableSymbolTypes&ScalableSymbolTypes, interpolation:number, tweenType:TweenTypeValue) {
    // Get interpolated values
    let scaleXTweened = TweenUtil.interpolate(symbol.scaleX, nextSymbol.scaleX, interpolation, TweenType.toEaseValue(tweenType));
    let scaleYTweened = TweenUtil.interpolate(symbol.scaleY, nextSymbol.scaleY, interpolation, TweenType.toEaseValue(tweenType));
    let rotationTweened = TweenUtil.interpolate(symbol.rotation, nextSymbol.rotation, interpolation, TweenType.toEaseValue(tweenType));

    // Get correct x/y based on tweened pivot position and rotation
    let position = {
      x: symbol.x,
      y: -symbol.y
    };
    let pivot = {
      // Note: Collision box scale is the literal size rather than a multiplier
      x: (symbol.type === 'COLLISION_BOX') ? 
        TweenUtil.interpolate(symbol.pivotX, nextSymbol.pivotX, interpolation, TweenType.toEaseValue(tweenType)) :
        TweenUtil.interpolate(symbol.pivotX * scaleXTweened, nextSymbol.pivotX * scaleXTweened, interpolation, TweenType.toEaseValue(tweenType)),
      y: (symbol.type === 'COLLISION_BOX') ? 
        -TweenUtil.interpolate(symbol.pivotY, nextSymbol.pivotY, interpolation, TweenType.toEaseValue(tweenType)) :
        -TweenUtil.interpolate(symbol.pivotY * scaleYTweened, nextSymbol.pivotY * scaleYTweened, interpolation, TweenType.toEaseValue(tweenType))
    };
    
    // Get the position of the sprite assuming no translation of the pivot point between keyframes
    let movedTo = MathUtil.rotatePointAroundPivot(position, pivot, -symbol.rotation, -rotationTweened);
    let result = {
      x: movedTo.x,
      y: -movedTo.y
    };

    // Now need to get absolute position change of the pivot points between keyframes to determine full translation range
    position.x = symbol.x;
    position.y = -symbol.y;
    if (symbol.type === 'COLLISION_BOX') {
      pivot.x = symbol.pivotX;
      pivot.y = -symbol.pivotY;
    } else {
      pivot.x = symbol.pivotX * symbol.scaleX;
      pivot.y = -symbol.pivotY * symbol.scaleY;
    }
    let absPivot1 = MathUtil.calculateAbsolutePivotPosition(position, pivot, -symbol.rotation);
    absPivot1.y *= -1;
    
    position.x = nextSymbol.x;
    position.y = -nextSymbol.y;
    if (symbol.type === 'COLLISION_BOX') {
      pivot.x = nextSymbol.pivotX;
      pivot.y = -nextSymbol.pivotY;
    } else {
      pivot.x = nextSymbol.pivotX * nextSymbol.scaleX;
      pivot.y = -nextSymbol.pivotY * nextSymbol.scaleY;
    }
    let absPivot2 = MathUtil.calculateAbsolutePivotPosition(position, pivot, -nextSymbol.rotation);
    absPivot2.y *= -1;

    // Finally calculate the interpolated pivot point position
    let pivotXAbsTweened = TweenUtil.interpolate(absPivot1.x, absPivot2.x, interpolation, TweenType.toEaseValue(tweenType));
    let pivotYAbsTweened = TweenUtil.interpolate(absPivot1.y, absPivot2.y, interpolation, TweenType.toEaseValue(tweenType));

    // Combine movedTo with the change in pivot point position
    result.x += (pivotXAbsTweened - absPivot1.x);
    result.y += (pivotYAbsTweened - absPivot1.y);

    return result;
  }
}