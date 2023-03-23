export type FrayToolsPluginTypes = 'PublishPlugin' | 'ScriptAssetPlugin' | 'TypeDefinitionPlugin' | 'MetadataDefinitionPlugin';

/** Manifest JSON structure */
export interface IManifestJson {
  version: string;
  type: string;
  id: string;
  name: string;
  description: string;
}

/** Base interface for plugin configuration data (i.e. plugin metadata) */
export interface IPluginConfig {
  version:string;
}

/** Interface describing type definition file data. */
export interface ITypeDefinitionFile {
  contents: string;
  filename: string;
}

/** Data structure representing file output info for publish plugins */
export type PublishPluginMessageDataFilesMap = {[directoryId:string]: { filename:string; arrayBuffer:Uint8Array }[]; }

/** Data structures for metadata defintion plugins */
export type MetadataDefinitionFieldType = 'BOOLEAN' | 'COLOR' | 'INTEGER' | 'FLOAT' | 'TEXT' | 'TEXTAREA' | 'TAGS' | 'DROPDOWN';

export type MetadataDefinitionConditionalOperator = '='|'!='|'<'|'<='|'>'|'>='|'contains()'|'matches()';

export interface IMetadataDefinitionFieldData {
  name:string;
  label:string;
  type:MetadataDefinitionFieldType;
  dependsOn:IMetadataDefinitionConditional[];
  defaultValue:any;
}
export interface IMetadataDefinitionBooleanFieldData extends IMetadataDefinitionFieldData {
  type: 'BOOLEAN';
  defaultValue:boolean;
}
export interface IMetadataDefinitionColorFieldData extends IMetadataDefinitionFieldData {
  type: 'COLOR';
  defaultValue:string;
}
export interface IMetadataDefinitionIntegerFieldData extends IMetadataDefinitionFieldData {
  type: 'INTEGER';
  defaultValue:number;
}
export interface IMetadataDefinitionFloatFieldData extends IMetadataDefinitionFieldData {
  type: 'FLOAT';
  defaultValue:number;
}
export interface IMetadataDefinitionTextFieldData extends IMetadataDefinitionFieldData {
  type: 'TEXT';
  defaultValue:string;
}
export interface IMetadataDefinitionTextareaFieldData extends IMetadataDefinitionFieldData {
  type: 'TEXTAREA';
  defaultValue:string;
}
export interface IMetadataDefinitionTagsFieldData extends IMetadataDefinitionFieldData {
  type: 'TAGS';
  defaultValue:string[];
}
export interface IMetadataDefinitionDropdownFieldData extends IMetadataDefinitionFieldData {
  type: 'DROPDOWN';
  defaultValue:any;
  options:IMetadataDefinitionDropdownFieldDataOptions<any>[];
}
export interface IMetadataDefinitionDropdownFieldDataOptions<T> {
  label:string;
  value:T;
}
export type MetadataDefinitionFieldDataTypes = IMetadataDefinitionBooleanFieldData | IMetadataDefinitionColorFieldData | IMetadataDefinitionIntegerFieldData | IMetadataDefinitionFloatFieldData | IMetadataDefinitionTextFieldData | IMetadataDefinitionTextareaFieldData | IMetadataDefinitionTagsFieldData | IMetadataDefinitionDropdownFieldData;

export interface IMetadataDefinitionConditional {
  inputField:string;
  inputValue:any;
  operator:MetadataDefinitionConditionalOperator;
}

export interface IMetadataDefinitionEffect {
  dependsOn:IMetadataDefinitionConditional[];
  outputField:string;
  outputValue:any;
}

export interface IMetadataDefinition {
  metadataOwnerTypes:MetadataOwnerTypes[];
  fields:MetadataDefinitionFieldDataTypes[];
  effects:IMetadataDefinitionEffect[]
}

export type AssetMetadataOwnerTypes = 'SPRITE_ENTITY_ASSET_METADATA' | 'SCRIPT_ASSET_METADATA' | 'BINARY_ASSET_METADATA' | 'NINE_SLICE_ASSET_METADATA' | 'AUDIO_ASSET_METADATA' | 'IMAGE_ASSET_METADATA' | 'PALETTE_COLLECTION_METADATA';

export type SpriteAnimationMetadataOwnerTypes = 'SPRITE_ANIMATION_METADATA';

export type LayerMetadataOwnerTypes = 'FRAME_SCRIPT_LAYER_METADATA' | 'LABEL_LAYER_METADATA' | 'IMAGE_LAYER_METADATA' | 'COLLISION_BOX_LAYER_METADATA' | 'POLYGON_LAYER_METADATA' | 'LINE_SEGMENT_LAYER_METADATA' | 'COLLISION_BODY_LAYER_METADATA' | 'POINT_LAYER_METADATA' | 'TILEMAP_LAYER_METADATA' | 'CONTAINER_LAYER_METADATA';


export type KeyframeMetadataOwnerTypes = 'FRAME_SCRIPT_KEYFRAME_METADATA' | 'LABEL_KEYFRAME_METADATA' | 'IMAGE_KEYFRAME_METADATA' | 'COLLISION_BOX_KEYFRAME_METADATA' | 'POLYGON_KEYFRAME_METADATA' | 'LINE_SEGMENT_KEYFRAME_METADATA' | 'COLLISION_BODY_KEYFRAME_METADATA' | 'POINT_KEYFRAME_METADATA' | 'TILEMAP_KEYFRAME_METADATA' | 'CONTAINER_KEYFRAME_METADATA';


export type SymbolMetadataOwnerTypes = 'IMAGE_SYMBOL_METADATA' | 'COLLISION_BOX_SYMBOL_METADATA' | 'POLYGON_SYMBOL_METADATA' | 'LINE_SEGMENT_SYMBOL_METADATA' | 'COLLISION_BODY_SYMBOL_METADATA' | 'POINT_SYMBOL_METADATA' | 'TILEMAP_SYMBOL_METADATA';

export type PaletteColorMetadataOwnerTypes = 'PALETTE_COLOR_METADATA';

export type PaletteMapMetadataOwnerTypes = 'PALETTE_MAP_METADATA';

export type ProjectSettingsMetadataOwnerTypes = 'PROJECT_SETTINGS_METADATA';

export type AppPreferencesMetadataOwnerTypes = 'APP_SETTINGS_METADATA';

export type MetadataOwnerTypes = AssetMetadataOwnerTypes | SpriteAnimationMetadataOwnerTypes | LayerMetadataOwnerTypes | KeyframeMetadataOwnerTypes | SymbolMetadataOwnerTypes | PaletteColorMetadataOwnerTypes | PaletteMapMetadataOwnerTypes | ProjectSettingsMetadataOwnerTypes | AppPreferencesMetadataOwnerTypes;
