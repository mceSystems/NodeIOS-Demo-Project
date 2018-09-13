# node-jsc Demo App
A demo iOS app demonstrating using node-jsc and node-native-script.

The demo app:
* Uses the NodeIOS framework.
* Bundles a sample javascript application, which uses express, socket io and node-native-script.
* Runs node in a separate thread.

For convenience, console (stdout) is redirected to the UI (a TextView).

## Bundled JavaScript App
The demo app bundles a simple node.js application, which actuallay contains two unrelated examples of:
- Using express and socket io, serving local static files.
- Using node-native-script to read and print contacts.

App details and organization:
- All javascript related files are bundled in a separate folder ("js").
- A basic "loader" (loader.js) is used as a simple entry point:
  ```javascript
  process.chdir(__dirname + "/app");
  require("./app");
  ```
  While javascript app itself is under the js/app directory.
- Dependencies for both the app and node-native-script is installed using npm during the build (using a custom Xcode build step).

## How to build
**Prerequisites**
- Compiled **node-jsc** (NodeIOS framework): Follow [node-jsc](https://github.com/mceSystems/node-native-script)'s instructions
- Compiled (and signed) **node-native-script**: [node-native-script](https://github.com/mceSystems/node-native-script)'s build instructions
- A valid, configured, code signing identity: See [node-native-script](https://github.com/mceSystems/node-native-script)'s "Prerequisites" section for more information
- An iOS device (simulator is currently not supported)

**To build and run the demo app**, open the project in Xcode and:
- Add node-jsc NodeIOS framework to the project (you can simply drag it to your project)
  - After building node-jsc, the iOS framework can be found at tools/NodeIOS/build in node-jsc directory.
  - Make sure the framework is embedded in the app. The easiest way to ensure it is to check "Copy items if needed" when adding the framework.
  - Copy node-native-script (after building it) to js/app/lib. 
     - You could omit files that ar not needed for running it, like "src" and "script" folders, build_ios.sh and the README.md file.
- Configure code signing under "General" settings
