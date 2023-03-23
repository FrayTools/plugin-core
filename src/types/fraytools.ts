export type TweenTypeValue = 'LINEAR' | 'EASE_IN_QUAD' | 'EASE_OUT_QUAD' | 'EASE_IN_OUT_QUAD' | 'EASE_IN_CUBIC' | 'EASE_OUT_CUBIC' | 'EASE_IN_OUT_CUBIC' | 'EASE_IN_QUART' | 'EASE_OUT_QUART' | 'EASE_IN_OUT_QUART' | 'EASE_IN_QUINT' | 'EASE_OUT_QUINT' | 'EASE_IN_OUT_QUINT';

export interface ISpriteAnimation {
  $id?: string;
  name:string;
  layers:string[];
  pluginMetadata: {[pluginKey:string]: any};
}
export type SpriteAnimationTypes = ISpriteAnimation;
export type LayerTypeValues = 'FRAME_SCRIPT'|'LABEL'|'COLLISION_BOX'|'IMAGE'|'POLYGON'|'TILEMAP'|'CONTAINER'|'LINE_SEGMENT'|'COLLISION_BODY'|'POINT';

export interface ILayer {
  $id?: string;
  name: string;
  type: LayerTypeValues;
  hidden: boolean;
  locked: boolean;
  keyframes: string[];
  pluginMetadata: {[pluginKey:string]: any};
}
export interface IFrameScriptLayer extends ILayer {
  type: 'FRAME_SCRIPT';
  language: string;
  keyframes: string[];
}
export interface ILabelLayer extends ILayer {
  type: 'LABEL';
  keyframes: string[];
}
export interface ICollisionBoxLayer extends ILayer {
  type:'COLLISION_BOX';
  defaultColor: string;
  defaultAlpha: number;
  keyframes: string[];
}
export interface IImageLayer extends ILayer {
  type: 'IMAGE';
  keyframes: string[];
}
export interface IPolygonLayer extends ILayer {
  type: 'POLYGON';
  keyframes: string[];
}
export interface ILineSegmentLayer extends ILayer {
  type: 'LINE_SEGMENT';
  keyframes: string[];
}
export interface ICollisionBodyLayer extends ILayer {
  type: 'COLLISION_BODY';
  keyframes: string[];
  defaultColor: string;
  defaultAlpha: number;
  defaultHead: number;
  defaultFoot: number;
  defaultHipWidth: number;
  defaultHipXOffset: number;
  defaultHipYOffset: number;
}
export interface IPointLayer extends ILayer {
  type: 'POINT';
  keyframes: string[];
}
export interface ITilemapLayer extends ILayer {
  type: 'TILEMAP';
  keyframes: string[];
  x:number;
  y:number;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  tileset: string;
}
export interface IContainerLayer extends ILayer {
  type: 'CONTAINER';
}

export type LayerTypes = IFrameScriptLayer | ILabelLayer | ICollisionBoxLayer | IImageLayer | IPolygonLayer | ILineSegmentLayer | ICollisionBodyLayer | IPointLayer | ITilemapLayer | IContainerLayer;

export type KeyframeTypeValues = LayerTypeValues;

export interface IKeyframe {
  $id?: string;
  length: number;
  type: KeyframeTypeValues;
  pluginMetadata: {[pluginKey:string]: any};
}

export interface IFrameScriptKeyframe extends IKeyframe {
  code: string;
  type: 'FRAME_SCRIPT';
}
export interface ILabelKeyframe extends IKeyframe {
  name: string;
  type: 'LABEL';
}

export interface IBaseSymbolKeyframe extends IKeyframe {
  symbol: string;
  tweened: boolean;
  tweenType: TweenTypeValue;
}

export interface ICollisionBoxKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'COLLISION_BOX';
}
export interface IImageKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'IMAGE';
}
export interface IPolygonKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'POLYGON';
}
export interface ILineSegmentKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'LINE_SEGMENT';
}
export interface ICollisionBodyKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'COLLISION_BODY';
}
export interface IPointKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'POINT';
}
export interface ITilemapKeyframe extends IBaseSymbolKeyframe {
  symbol: string;
  type: 'TILEMAP';
}
export interface IContainerKeyframe extends IKeyframe {
  type: 'CONTAINER';
}

export type KeyframeTypes = IFrameScriptKeyframe | ILabelKeyframe | ICollisionBoxKeyframe | IImageKeyframe | IPolygonKeyframe | ILineSegmentKeyframe | ICollisionBodyKeyframe | IPointKeyframe | ITilemapKeyframe | IContainerKeyframe;

export type BaseSymbolKeyframeTypes = ICollisionBoxKeyframe | IImageKeyframe | IPolygonKeyframe | ILineSegmentKeyframe | ICollisionBodyKeyframe | IPointKeyframe | ITilemapKeyframe;

export type SymbolTypeValues = KeyframeTypeValues;

export interface IBaseSymbol {
  $id?: string;
  type: SymbolTypeValues;
  alpha: number;
  pluginMetadata: {[pluginKey:string]: any};
}

export interface ITranslatableSymbol {
  x: number;
  y: number;
}

export interface IScalableSymbol {
  scaleX: number;
  scaleY: number;
}

export interface IRotatableSymbol {
  rotation: number;
}

export interface IPivotableSymbol extends IRotatableSymbol {
  pivotX: number;
  pivotY: number;
}

export interface IColorableSymbol {
  color: string;
}

export interface IPointArraySymbol {
  points: number[];
}

export interface ICollisionBoxSymbol extends IBaseSymbol, ITranslatableSymbol, IScalableSymbol, IPivotableSymbol, IColorableSymbol {
  type: 'COLLISION_BOX';
}

export interface IImageSymbol extends IBaseSymbol, ITranslatableSymbol, IScalableSymbol, IPivotableSymbol {
  type: 'IMAGE';
  imageAsset:string;
}

export interface IPolygonSymbol extends IBaseSymbol, ITranslatableSymbol, IRotatableSymbol, IColorableSymbol, IPointArraySymbol {
  type: 'POLYGON';
}
export interface ITilemapSymbol extends IBaseSymbol, ITranslatableSymbol, IScalableSymbol, IPivotableSymbol {
  type: 'TILEMAP';
  tiles: number[];
}

export interface ILineSegmentSymbol extends IBaseSymbol, IColorableSymbol, IPointArraySymbol {
  type: 'LINE_SEGMENT';
}

export interface ICollisionBodySymbol extends IBaseSymbol, IColorableSymbol {
  type: 'COLLISION_BODY';
  head: number;
  foot: number;
  hipWidth: number;
  hipXOffset: number;
  hipYOffset: number;
}

export interface IPointSymbol extends IBaseSymbol, ITranslatableSymbol, IRotatableSymbol, IColorableSymbol {
  type: 'POINT';
}

export type TranslatableSymbolTypes = IImageSymbol | ICollisionBoxSymbol | IPolygonSymbol | IPointSymbol | ITilemapSymbol;

export type ScalableSymbolTypes = IImageSymbol | ICollisionBoxSymbol | ITilemapSymbol;

export type RotatableSymbolTypes = PivotableSymbolTypes | IPolygonSymbol | IPointSymbol;

export type PivotableSymbolTypes = IImageSymbol | ICollisionBoxSymbol | IPolygonSymbol | ITilemapSymbol;

export type ColorableSymbolTypes = ICollisionBoxSymbol | IPolygonSymbol | ILineSegmentSymbol | ICollisionBodySymbol | IPointSymbol;

export type PointArraySymbolTypes = IPolygonSymbol | ILineSegmentSymbol;

export type BaseSymbolTypes = IImageSymbol | ICollisionBoxSymbol | IPolygonSymbol | ILineSegmentSymbol | ICollisionBodySymbol | IPointSymbol | ITilemapSymbol;

export interface ILibraryAssetMetadata {
  version: number;
  id:string;
  guid:string;
  export:boolean;
  tags:string[];
  plugins:string[];
  pluginMetadata: {[pluginKey:string]: any};
}
export interface ISpriteEntityPaletteMap {
  paletteCollection:string;
  paletteMap:string;
}
export interface ISpriteEntityAssetMetadata extends ILibraryAssetMetadata {
  animations: ISpriteAnimation[];
  layers: LayerTypes[];
  keyframes: KeyframeTypes[];
  symbols: BaseSymbolTypes[];
  paletteMap: ISpriteEntityPaletteMap;
}
export interface IImageAssetMetadata extends ILibraryAssetMetadata {
}
export interface IAudioAssetMetadata extends ILibraryAssetMetadata {
}
export interface IBinaryAssetMetadata extends ILibraryAssetMetadata {
}
export interface IScriptAssetMetadata extends ILibraryAssetMetadata {
  language: string;
  script: string;
}

export interface IPaletteMapColorData {
  paletteColorId: string;
  targetColor: string;
}
export interface IPaletteMap {
  $id?: string;
  name: string;
  colors: IPaletteMapColorData[]
  pluginMetadata: {[pluginKey:string]: any};
}
export interface IPaletteColor {
  $id?: string;
  color: string;
  name: string;
  pluginMetadata: {[pluginKey:string]: any};
}
export interface IPaletteCollectionAssetMetadata extends ILibraryAssetMetadata {
  imageAsset: string;
  maps: IPaletteMap[];
  colors: IPaletteColor[];
}

export interface INineSliceAssetMetadata extends ILibraryAssetMetadata {
  imageAsset:string;
  borderLeft:number;
  borderTop:number;
  borderRight:number|null;
  borderBottom:number|null;
}
