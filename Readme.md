# FrayTools Plugin Core

## Overview

This repository contains the shared core for FrayTools plugins. Include this library in your FrayTools plugin project to bootstrap the setup process of your plugin.

## Plugin Types

This repo contains the following base classes in the `src/ts/base/` folder built in React to get you up and running more quickly. Using these classes is not strictly required but will be a bit quicker than vanilla JS.

See the list of plugin types below:

`BasePublishPlugin` - Base class for Publish Plugin creation. These types of plugins allow you to define export logic for your assets. FrayTools will provide the plugin with all of the resource metadata on initialization, which you can then use to compile the data into something more meaningful.

`BaseScriptAssetPlugin` (WIP) - Base class for Script Asset Plugin creation. These types of plugins allow you to create a custom UI for manipulating Script Asset metadata and contents.

`BaseTypeDefinitionPlugin` - Base class for Script Types Plugin creation. These types of plugins allow you to define type definition data to the script editor component when editing code in script assets and frame scripts.

`BaseMetadataDefinitionPlugin` - Base class for Metadata Definition Plugin creation. These types of plugins allow you to define custom fields and validation rules for the FrayTools Properties panel for various object types.

## Basic Setup

Step 1) Install [Node.js](https://nodejs.org/en/)

Step 2) Add the latest version of `@fraytools/plugin-core` to the package.json dependencies for your plugin and run `npm install`.

Step 3) Build your plugin interface classes by extending one of the base plugin React classes from `src/base` (or alternatively create your plugin UI from scratch and follow the React classes for guidance).

Step 4) Import `FrayToolsPluginCore` and configure after your UI classes are defined in your entry point:

```typescript
import FrayToolsPluginCore from '@fraytools/plugin-core';

/*** [UI CLASSES CAN GO HERE] ***/

// Assign default persistent configuration metadata here
FrayToolsPluginCore.PLUGIN_CONFIG_METADATA_DEFAULTS = { version: "0.0.1" };

FrayToolsPluginCore.migrationHandler = (configMetadata) => {
  // Perform any necessary config metadata migrations
};

// Initialize the plugin
FrayToolsPluginCore.setupHandler = (props) => {
  // Now initialize your UI components
  // Note: If creating a custom UI without React, you can replace this with your own rendering logic
  var appContainer = document.createElement('div');
  appContainer.className = 'MyScriptAssetPluginWrapper';
  document.body.appendChild(appContainer);

  // Make sure props is provided to your component
  ReactDOM.render(React.createElement(MyScriptAssetPlugin, {...props}), appContainer);
};
```

Step 5) Create a `manifest.json` file for your plugin with the following fields (customize them for your use case):

```json
{
  "version": "0.0.1",
  "type": "TypeDefinitionPlugin",
  "id": "my.example.types.plugin",
  "name": "My Example Types Plugin",
  "description": "Example of a types plugin."
}
```
Valid `type` fields are `PublishPlugin`, `ScriptAssetPlugin`,  `TypeDefinitionPlugin`, and `MetadataDefinitionPlugin`.

Step 6) Compile your plugin into a single folder that contains the `manifest.json` file, a `.js` file containing your plugin code, and an `index.html` file that loads your entry point `.js` file with a relative url. (It is recommended to use a module bundler such as [Webpack](https://webpack.js.org/) to simplify this process)

## Examples

View some sample projects below that demonstrate how to create each plugin type:

**Publish Plugins:**
* [Minimal Publish Plugin Example](https://github.com/FrayTools/publish-plugin-example)
* [Fraymakers Content Exporter Plugin](https://github.com/Fraymakers/content-exporter-plugin)

**Type Definition Plugins:**
* [Minimal Type Definition Plugin Example](https://github.com/FrayTools/types-plugin-example)
* [Fraymakers API Types Plugin](https://github.com/Fraymakers/api-types-plugin)

**Metadata Definition Plugins:**
* [Minimal Metadata Definiton Plugin Example](https://github.com/FrayTools/metadata-plugin-example)
* [Fraymakers Metadata Plugin](https://github.com/Fraymakers/metadata-plugin)

**Script Asset Plugins:**
* [Minimal Script Asset Plugin Example (WIP)](https://github.com/FrayTools/script-plugin-example)

