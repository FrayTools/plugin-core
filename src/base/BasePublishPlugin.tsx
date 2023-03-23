
import * as React from 'react';
import { IPluginConfig } from 'src/types';
import { IAudioAssetMetadata, IBinaryAssetMetadata, IImageAssetMetadata, ILibraryAssetMetadata, INineSliceAssetMetadata, IPaletteCollectionAssetMetadata, IScriptAssetMetadata, ISpriteEntityAssetMetadata } from 'src/types/fraytools';
import FrayToolsPluginCore from '../FrayToolsPluginCore';

export interface IPublishPluginProps {
  configMode:boolean;
  configMetadata: IPluginConfig;
  outputFolders:{ id:string; path:string }[];
  guidToAsset:{ [guid:string]: { metadata:ILibraryAssetMetadata, binaryData?:Uint8Array, filename?:string } };
  spriteEntityAssets:ISpriteEntityAssetMetadata[];
  imageAssets:IImageAssetMetadata[];
  audioAssets:IAudioAssetMetadata[]
  scriptAssets:IScriptAssetMetadata[];
  paletteCollectionAssets:IPaletteCollectionAssetMetadata[];
  binaryAssets:IBinaryAssetMetadata[];
  nineSliceAssets:INineSliceAssetMetadata[];
}
export interface IPublishPluginState {
}
/**
 * Base class for React-powered publish plugins.
 * 
 * Note that this same setup structure could be used in a Vanilla JS component as well. The main requirements are as follows:
 * 1) Assign a callback to FrayToolsCore.propsReceivedHandler to handle new props being passed to the plugin from the parent window.
 * 2) Assign a callback to FrayToolsCore.forcePublishHandler to handle when the parent window requests a forced publish.
 * 3) Assign a callback to FrayToolsCore.setupHandler that render a UI using the props passed to the function (check "props.configMode" to determine what view to render)
 * 4) Use FrayToolsPluginCore.sendReady() after the above steps are completed and plugin DOM is ready.
 * To inform the parent window that it's time to publish, use FrayToolsPluginCore.sendPublish(). This will cause the parent UI to lock. When the publish logic is completed, send use FrayToolsPluginCore.sendPublishEnd(publishData) to pass the data back to FrayTools to export. To sync plugin configuration data that should persist between sessions to the filesystem, use FrayToolsPluginCore.configMetadataSync('PublishPlugin', yourConfigMetadata).
 */
export default class BasePublishPlugin<P extends IPublishPluginProps, S extends IPublishPluginState> extends React.Component<P, S> {
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    // Set up listeners
    FrayToolsPluginCore.propsReceivedHandler = this.onPropsUpdated.bind(this);
    FrayToolsPluginCore.forcePublishRequestHandler = this.onForcePublishRequest.bind(this);
    FrayToolsPluginCore.sendReady();
  }
  public componentWillUnmount() {
    FrayToolsPluginCore.propsReceivedHandler = null;
    FrayToolsPluginCore.forcePublishRequestHandler = null;
  }
  protected onForcePublishRequest():void {
    throw new Error('onForcePublishRequest() not implemented');
  }
  protected onPropsUpdated(props:IPublishPluginProps) {
    // Override this with custom behavior
  }
}
