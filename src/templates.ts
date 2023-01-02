import { _ } from "./default-config";

export const ComponentTemplate = {
  class: (
    fileName: string,
    style: string
  ) => `import React, { Component } from 'react';${
    style !== "none" ? `\nimport "./${fileName}.${style}";` : ""
  }
  
  export class ${fileName} extends Component {
    render() {
      return <div>${fileName}</div>
    }
  }
  
  export default ${fileName}`,
  function: (fileName: string, style: string) => `import React from 'react';${
    style !== "none" ? `\nimport "./${fileName}.${style}";` : ""
  }
  
  const ${fileName} = () => {
    return <div>${fileName}</div>
  }
  
  export default ${fileName}`,
};

export const NativeComponentTemplate = {
  function: (fileName: string, nativeStyle: _<"nativeStyle">) =>
    `import { View, Text${
      nativeStyle === "in" ? ", StyleSheet" : ""
    } } from 'react-native';
import React from 'react';${
      nativeStyle === "file"
        ? `\nimport styles from "./${fileName}.style";`
        : ""
    }

const ${fileName} = () => {
  return (
    <View>
      <Text>${fileName}</Text>
    </View>
  )
}

export default ${fileName};${
      nativeStyle === "in"
        ? `

const styles = StyleSheet.create({
    
});`
        : ""
    }`,
  class: (fileName: string, nativeStyle: _<"nativeStyle">) =>
    `import { Text, View } from 'react-native';
import React, { Component } from 'react';${
      nativeStyle === "file"
        ? `\nimport styles from "./${fileName}.style";`
        : ""
    }

export class ${fileName} extends Component {
  render() {
    return (
      <View>
        <Text>${fileName}</Text>
      </View>
    )
  }
}

export default ${fileName};${
      nativeStyle === "in"
        ? `

const styles = StyleSheet.create({
    
});`
        : ""
    }`,
};

export const ReactNativeStyleTemplate = `import {StyleSheet} from "react-native";

export default StyleSheet.create({
    
});`;
