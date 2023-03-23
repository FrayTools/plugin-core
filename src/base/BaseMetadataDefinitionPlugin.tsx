
import * as React from 'react';
import { IPluginConfig } from 'src/types';
import { ILibraryAssetMetadata } from 'src/types/fraytools';
import FrayToolsPluginCore from '../FrayToolsPluginCore';

export interface IMetadataDefinitionPluginProps {
  configMode:boolean;
  configMetadata:IPluginConfig;
  assetMetadata:ILibraryAssetMetadata;
}
export interface IMetadataDefinitionPluginState {
}

/**
 * Base class for React-powered metdata definition plugins.
 * 
 * Note that this same setup structure could be used in a Vanilla JS component as well. The main requirements are as follows:
 * 1) Assign a callback to FrayToolsCore.propsReceivedHandler to handle new props being passed to the plugin from the parent window.
 * 2) Assign a callback to FrayToolsCore.setupHandler that render a UI using the props passed to the function (check "props.configMode" to determine what view to render)
 * 3) Use FrayToolsPluginCore.sendReady() after the above steps are completed and plugin DOM is ready.
 * To sync plugin configuration data that should persist between sessions to the filesystem, use FrayToolsPluginCore.configMetadataSync('MetadataDefinitionPlugin', yourConfigMetadata).
 */
export default class BaseMetadataDefinitionPlugin<P extends IMetadataDefinitionPluginProps, S extends IMetadataDefinitionPluginState> extends React.Component<P, S> {
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    // Set up listeners
    FrayToolsPluginCore.propsReceivedHandler = this.onPropsUpdated.bind(this);
    FrayToolsPluginCore.metadataDefinitionRequestHandler = this.onMetadataDefinitionRequest.bind(this);
    FrayToolsPluginCore.assetMetadataMigrationRequestHandler = this.onAssetMetadataMigrationRequest.bind(this);
    FrayToolsPluginCore.sendReady();
  }
  public componentWillUnmount() {
    FrayToolsPluginCore.propsReceivedHandler = null;
    FrayToolsPluginCore.metadataDefinitionRequestHandler = null;
    FrayToolsPluginCore.assetMetadataMigrationRequestHandler = null;
  }
  protected onMetadataDefinitionRequest() {
    throw new Error('onMetadataDefinitionRequest() not implemented');
  }
  protected onAssetMetadataMigrationRequest() {
    throw new Error('onAssetMetadataMigrationRequest() not implemented');
  }
  protected onPropsUpdated(props:IMetadataDefinitionPluginProps) {
    // Override this with custom behavior
  }
}
