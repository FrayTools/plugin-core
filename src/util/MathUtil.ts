

export default class MathUtil {
  /**
   * Platform-independent polar function for calculating the position of a point relative to 0,0 given a length and angle.
   * @param len Distance from the origin.
   * @param angle Angle around the origin to calculate the position in radians.
   */
  public static polar(len:number, angle:number) {

    return {
      x: len * Math.cos(angle),
      y: len * Math.sin(angle)
    };
  }

  /**
   * Calculates the absolute position of a pivot point provide an origin position, the pivot point position to the origin, and amount of rotation. This assumes a normal cartesian coordinate space, and rotation in the counter-clockwise direction is positive.
   * @param origin The origin position with no rotation.
   * @param pivot The pivot position relative to the origin point.
   * @param rotationOffset Rotation to offset the pivot point in degrees (positive values are counter-clockwise).
   */
  public static calculateAbsolutePivotPosition(origin:{ x:number; y:number}, pivot:{ x:number; y:number}, rotationOffset:number) {
    if (rotationOffset % 360 === 0) {
      // Just return the absolute position of the pivot point with no rotation logic
      return {
        x: origin.x + pivot.x,
        y: origin.y + pivot.y
      };
    }

    // Calculate the relative pivot anchor based on the position the point at zero rotation
    // First, determine the distance between the pivot and origin
    let distanceToPivot = Math.sqrt(Math.pow(pivot.x, 2) + Math.pow(pivot.y, 2));

    // Get angle of pivot point relative to origin
    let pivotAngle = Math.atan2(pivot.y, pivot.x);
    
    // Get the relative position of the pivot point with the target rotation added on
    let relPivotPosition = MathUtil.polar(distanceToPivot, (pivotAngle + (rotationOffset * Math.PI / 180)));
    
    // Return the absolute position of the pivot point
    return {
      x: origin.x + relPivotPosition.x,
      y: origin.y + relPivotPosition.y
    };
  }

  /**
   * Rotates a point around a pivot anchor and returns the new position. This assumes a normal cartesian coordinate space, and rotation in the counter-clockwise direction is positive.
   * @param origin The origin position before rotation.
   * @param pivot The pivot position relative to the point given an initial rotation of 0 degrees.
   * @param fromRotation The current rotation of the origin (positive values are counter-clockwise).
   * @param toRotation The target rotation of the origin (positive values are counter-clockwise).
   */
  public static rotatePointAroundPivot(origin:{ x:number; y:number}, pivot:{ x:number; y:number}, fromRotation:number, toRotation:number) {
    if (fromRotation === toRotation) {
      // Just return the origin point, as rotation did not change 
      return origin;
    }

    // Now let's calculate the absolute position of the pivot point
    let absPivotPosition = MathUtil.calculateAbsolutePivotPosition(origin, pivot, fromRotation);

    // Now we can use the absolute pivot point position and rotation to determine the relative position of the origin point after additional rotation
    // First get angle of the origin relative to the pivot point (i.e flipped pivotAngle)
    let originAngle = Math.atan2(pivot.y, pivot.x) - (180 * Math.PI / 180);

    // Now add rotation to that angle, and calculate the new relative position
    let distanceToPivot = Math.sqrt(Math.pow(pivot.x, 2) + Math.pow(pivot.y, 2));
    let relOriginPosition = MathUtil.polar(distanceToPivot, (originAngle + (toRotation * Math.PI / 180)));
    
    // Return the new absolute x/y position post-rotation around the pivot
    return {
      x: absPivotPosition.x + relOriginPosition.x,
      y: absPivotPosition.y + relOriginPosition.y
    };
  }
}