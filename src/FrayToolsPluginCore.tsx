import { IMetadataDefinition, IPluginConfig, ITypeDefinitionFile, PublishPluginMessageDataFilesMap } from './types';
import { ILibraryAssetMetadata } from './types/fraytools';

/** Unique id auto-generated by FrayTools to identify specific instance of the plugin  */
var PLUGIN_UID:any = null;
class FrayToolsPluginCore {
  /** Assign the default plugin configuration metadata to this field. */
  public static PLUGIN_CONFIG_METADATA_DEFAULTS = {} as any;
  /** Assign a callback to this field which will be run after the plugin receives a 'loadPlugin' command from the parent. */
  public static setupHandler:(props:any) => void;
  /** Assign a callback to this field to handle pluginPropsReceived events. */
  public static propsReceivedHandler:(props:any) => void;
  /** Assign a callback to this field to run against the plugin configMetadata before the setup process begins. This can be used to migrate the data based on the plugin's current version. */
  public static migrationHandler: (configMetadata:any) => void;
  /** Assign a callback to this field to handle a request for types data from the parent plugin. */
  public static typeDefinitionRequestHandler:() => void;
  /** Assign a callback to this field to handle a request for metadata definition data from the parent plugin. */
  public static metadataDefinitionRequestHandler:() => void;
  /** Assign a callback to this field to handle a request for metadata migration data from the parent plugin. */
  public static assetMetadataMigrationRequestHandler:() => void;
  /** Assign a callback to this field to handle a request to force start a publish. */
  public static forcePublishRequestHandler:() => void;
  /**
   * Function for sending log messages back to the parent
   * @param level Log level (log, info, warn, error, or debug)
   * @param args Arguments to pass to the log function.
   */
  public static log(level:string, ...args):void {
    parent.postMessage({
      id: PLUGIN_UID,
      command: 'pluginLog',
      data: {
        level: level,
        args: args
      }
    }, '*');
  }
  /**
   * Informs the parent window to sync and persist the specified config metadata.
   * @param pluginType The type of plugin.
   * @param configMetadata The metadata to sync.
   */
  public static configMetadataSync(configMetadata:IPluginConfig) {
    parent.postMessage(
      {
        id: PLUGIN_UID,
        command: 'pluginConfigSyncRequest',
        data: {
          data: {
            configMetadata: configMetadata
          }
        }
      },
      '*'
    );
  }
  /**
   * Informs the parent window to sync and persist the specified asset metadata.
   * @param pluginType The type of plugin.
   * @param configMetadata The metadata to sync.
   */
  public static assetMetadataSync(assetMetadata: ILibraryAssetMetadata) {
    parent.postMessage(
      {
        id: PLUGIN_UID,
        command: 'pluginAssetMetadataSyncRequest',
        data: {
          data: {
            assetMetadata: assetMetadata
          }
        }
      },
      '*'
    );
  }
  /**
   * Informs the parent window that the plugin is mounted
   */
  public static sendReady() {
    parent.postMessage({
      id: PLUGIN_UID,
      command: 'pluginReady'
    }, '*');
  }
  public static sendTypeDefinitions(typeFilesData:ITypeDefinitionFile[]) {
    parent.postMessage({
      id: PLUGIN_UID,
      command: 'pluginTypeDefinitions',
      data: {
        types: typeFilesData
      }
    }, '*');
  }
  public static sendMetadataDefinitions(metadataDefinitions:IMetadataDefinition[]) {
    parent.postMessage({
      id: PLUGIN_UID,
      command: 'pluginMetadataDefinitions',
      data: {
        metadataDefinitions: metadataDefinitions
      }
    }, '*');
  }
  public static sendAssetMetadataMigrations(assetMetadata:ILibraryAssetMetadata) {
    parent.postMessage({
      id: PLUGIN_UID,
      command: 'pluginAssetMetadataMigrations',
      data: {
        assetMetadata: assetMetadata
      }
    }, '*');
  }
  public static sendPublishStart() {
    parent.postMessage(
      {
        id: PLUGIN_UID,
        command: 'publishStart'
      },
      '*'
    );
  }
  public static sendPublishEnd(files:PublishPluginMessageDataFilesMap) {
    parent.postMessage(
      {
        id: PLUGIN_UID,
        command: 'publishEnd',
        data: {
          files: files
        }
      },
      '*'
    );
  }
  public static sendPublishError(message:string) {
    parent.postMessage(
      {
        id: PLUGIN_UID,
        command: 'publishError',
        data: {
          message: message
        }
      },
      '*'
    );
  }
}

// Set up window message listener
window.addEventListener('message', function (e) {
  var data = e.data || {};
  if (data) {
    // Determine next course of action
    switch(data.command) {
      case 'loadPlugin':
        if (!data.data) {
          FrayToolsPluginCore.log('error', 'No data provided for loadPlugin() parameters.');

          return;
        } else if (!data.data.uid) {
          FrayToolsPluginCore.log('error', 'loadPlugin() missing "uid" field.');

          return;
        } else if (!data.data.props) {
          FrayToolsPluginCore.log('error', 'loadPlugin() missing "props" field.');

          return;
        }
        // Store the plugin UID
        PLUGIN_UID = data.data.uid;

        var props:any = data.data.props;

        // Ensure at least something is assigned to props.configMetadata
        props.configMetadata = props.configMetadata || {};
  
        // Migrate the configMetadata
        if (FrayToolsPluginCore.migrationHandler != null) {
          FrayToolsPluginCore.migrationHandler(props.configMetadata);
        }
  
        // Override any default config settings
        for (var key in FrayToolsPluginCore.PLUGIN_CONFIG_METADATA_DEFAULTS) {
          if (!FrayToolsPluginCore.PLUGIN_CONFIG_METADATA_DEFAULTS.hasOwnProperty(key) || typeof props.configMetadata[key] !== 'undefined') {
            continue;
          }
          props.configMetadata[key] = FrayToolsPluginCore.PLUGIN_CONFIG_METADATA_DEFAULTS[key];
        }
        
        // Trigger load
        if (FrayToolsPluginCore.setupHandler != null) {
          FrayToolsPluginCore.setupHandler(props);
        } else {
          FrayToolsPluginCore.log('error', 'No setupHandler function was provided to FrayToolsPluginCore.');
        }
        break;
      case 'pluginPropsReceived':
        // Notify plugin that new props were received
        if (FrayToolsPluginCore.propsReceivedHandler != null) {
          FrayToolsPluginCore.propsReceivedHandler(data.data.props);
        } else {
          FrayToolsPluginCore.log('warn', 'Props were received but no propsReceivedHandler was provided to FrayToolsPluginCore.');
        }
        break;
      case 'executeScript':
        if (typeof data.data === 'string') {
          // Create an arbitrary script tag and run its contents
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.innerHTML = data.data;
          document.head.append(s);
        }
        break;
      case 'getTypes':
        if (FrayToolsPluginCore.typeDefinitionRequestHandler != null) {
          FrayToolsPluginCore.typeDefinitionRequestHandler();
        }
        break;
      case 'getMetadataDefinitions':
        if (FrayToolsPluginCore.metadataDefinitionRequestHandler != null) {
          FrayToolsPluginCore.metadataDefinitionRequestHandler();
        }
        break;
      case 'getAssetMetadataMigrations':
        if (FrayToolsPluginCore.assetMetadataMigrationRequestHandler != null) {
          FrayToolsPluginCore.assetMetadataMigrationRequestHandler();
        }
        break;
      case 'forcePublish':
        if (FrayToolsPluginCore.forcePublishRequestHandler != null) {
          FrayToolsPluginCore.forcePublishRequestHandler();
        }
        break;
    }
  }
});

export default FrayToolsPluginCore;
