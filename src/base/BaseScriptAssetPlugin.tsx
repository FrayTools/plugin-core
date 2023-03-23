
import * as React from 'react';
import { IPluginConfig } from 'src/types';
import { IScriptAssetMetadata } from 'src/types/fraytools';
import FrayToolsPluginCore from '../FrayToolsPluginCore';

export interface IScriptAssetPluginProps {
  configMode:boolean;
  configMetadata: IPluginConfig;
  assetMetadata:IScriptAssetMetadata;
}
export interface IScriptAssetPluginState {
}
/**
 * Base class for React-powered script asset plugins.
 * 
 * Note that this same setup structure could be used in a Vanilla JS component as well. The main requirements are as follows:
 * 1) Assign a callback to FrayToolsCore.propsReceivedHandler to handle new props being passed to the plugin from the parent window.
 * 2) Assign a callback to FrayToolsCore.setupHandler that render a UI using the props passed to the function (check "props.configMode" to determine what view to render)
 * 3) Use FrayToolsPluginCore.sendReady() after the above steps are completed and plugin DOM is ready.
 * To sync plugin configuration data that should persist between sessions to the filesystem, use FrayToolsPluginCore.configMetadataSync('ScriptAssetPlugin', yourConfigMetadata). To persist data to the current script asset currently being edited, use FrayToolsPluginCore.assetMetadataSync('ScriptAssetPlugin', yourAssetMetadata).
 */
export default class BaseScriptAssetPlugin<P extends IScriptAssetPluginProps, S extends IScriptAssetPluginState> extends React.Component<P, S> {
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    // Set up listeners
    FrayToolsPluginCore.propsReceivedHandler = this.onPropsUpdated.bind(this);
    FrayToolsPluginCore.sendReady();
  }
  public componentWillUnmount() {
    FrayToolsPluginCore.propsReceivedHandler = null;
  }
  protected onPropsUpdated(props:IScriptAssetPluginProps) {
    // Override this with custom behavior
  }
}
