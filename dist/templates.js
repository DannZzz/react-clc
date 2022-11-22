"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactNativeStyleTemplate = exports.NativeComponentTemplate = exports.ComponentTemplate = void 0;
exports.ComponentTemplate = {
    class: function (fileName, style) { return "import React, { Component } from 'react';".concat(style !== "none" ? "\nimport \"./".concat(fileName, ".").concat(style, "\";") : "", "\n  \n  export class ").concat(fileName, " extends Component {\n    render() {\n      return <div>").concat(fileName, "</div>\n    }\n  }\n  \n  export default ").concat(fileName); },
    function: function (fileName, style) { return "import React from 'react';".concat(style !== "none" ? "\nimport \"./".concat(fileName, ".").concat(style, "\";") : "", "\n  \n  const ").concat(fileName, " = () => {\n    return <div>").concat(fileName, "</div>\n  }\n  \n  export default ").concat(fileName); },
};
exports.NativeComponentTemplate = {
    function: function (fileName, nativeStyle) {
        return "import { View, Text } from 'react-native';\nimport React from 'react';".concat(nativeStyle === "file"
            ? "\nimport styles from \"./".concat(fileName, ".style\";")
            : "", "\n\nconst ").concat(fileName, " = () => {\n  return (\n    <View>\n      <Text>").concat(fileName, "</Text>\n    </View>\n  )\n}\n\nexport default ").concat(fileName, ";").concat(nativeStyle === "in"
            ? "\n\nconst styles = StyleSheet.create({\n    \n});"
            : "");
    },
    class: function (fileName, nativeStyle) {
        return "import { Text, View } from 'react-native';\nimport React, { Component } from 'react';".concat(nativeStyle === "file"
            ? "\nimport styles from \"./".concat(fileName, ".style\";")
            : "", "\n\nexport class ").concat(fileName, " extends Component {\n  render() {\n    return (\n      <View>\n        <Text>").concat(fileName, "</Text>\n      </View>\n    )\n  }\n}\n\nexport default ").concat(fileName, ";").concat(nativeStyle === "in"
            ? "\n\nconst styles = StyleSheet.create({\n    \n});"
            : "");
    },
};
exports.ReactNativeStyleTemplate = "import {StyleSheet} from \"react-native\";\n\nexport default StyleSheet.create({\n    \n});";
