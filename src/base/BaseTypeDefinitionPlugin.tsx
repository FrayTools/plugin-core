
import * as React from 'react';
import { IPluginConfig } from 'src/types';
import { ILibraryAssetMetadata } from 'src/types/fraytools';
import FrayToolsPluginCore from '../FrayToolsPluginCore';

export interface ITypeDefinitionPluginProps {
  configMode:boolean;
  configMetadata:IPluginConfig;
  assetMetadata:ILibraryAssetMetadata;
  language: string;
  filename: string;
}
export interface ITypeDefinitionPluginState {
}

/**
 * Base class for React-powered script types plugins.
 * 
 * Note that this same setup structure could be used in a Vanilla JS component as well. The main requirements are as follows:
 * 1) Assign a callback to FrayToolsCore.propsReceivedHandler to handle new props being passed to the plugin from the parent window.
 * 2) Assign a callback to FrayToolsCore.setupHandler that render a UI using the props passed to the function (check "props.configMode" to determine what view to render)
 * 3) Use FrayToolsPluginCore.sendReady() after the above steps are completed and plugin DOM is ready.
 * To sync plugin configuration data that should persist between sessions to the filesystem, use FrayToolsPluginCore.configMetadataSync('TypeDefinitionPlugin', yourConfigMetadata).
 */
export default class BaseTypeDefinitionPlugin<P extends ITypeDefinitionPluginProps, S extends ITypeDefinitionPluginState> extends React.Component<P, S> {
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    // Set up listeners
    FrayToolsPluginCore.propsReceivedHandler = this.onPropsUpdated.bind(this);
    FrayToolsPluginCore.typeDefinitionRequestHandler = this.onTypeDefinitionRequest.bind(this);
    FrayToolsPluginCore.sendReady();
  }
  public componentWillUnmount() {
    FrayToolsPluginCore.propsReceivedHandler = null;
    FrayToolsPluginCore.typeDefinitionRequestHandler = null;
  }
  protected onTypeDefinitionRequest() {
    throw new Error('onTypeDefinitionRequest() not implemented');
  }
  protected onPropsUpdated(props:ITypeDefinitionPluginProps) {
    // Override this with custom behavior
  }
}
