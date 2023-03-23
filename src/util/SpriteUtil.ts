// OpenFL
import Rectangle from 'openfl/geom/Rectangle';
import DisplayObject from 'openfl/display/DisplayObject';
import Matrix from 'openfl/geom/Matrix';
import BitmapData from 'openfl/display/BitmapData';

export default class SpriteUtil {
  public static getVisibleBounds(source:DisplayObject, targetCoordinateSpace:DisplayObject):Rectangle { 
    if (source.width == 0 || source.height == 0) {
      return rect;
    }
    
    // Based on: http://snipplr.com/view/63449/
    var rect:Rectangle = source.getBounds(targetCoordinateSpace);
    var matrix:Matrix = new Matrix();
    matrix.tx = -rect.x;
    matrix.ty = -rect.y;
    
     
    // Note: May need to eventually assign 0x00000000 to a constant or config
    var data:BitmapData = new BitmapData(Math.max(1, source.width), Math.max(1, source.height), true, 0x00000000);
    data.draw(source, matrix);
    var bounds : Rectangle = data.getColorBoundsRect(0xFFFFFFFF, 0x00000000, false);
    data.dispose();
    
    // Minor failsafe if bounds were unable to be detected
    if (bounds.width == 0 || bounds.height == 0) {
      return rect;
    }
      
    bounds.x += rect.x;
    bounds.y += rect.y;
    
    return bounds;
  }
}
