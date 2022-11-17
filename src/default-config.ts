export const defaultsArr = {
  style: ["scss", "less", "css", "sass", false] as const,
  component: ["function", "class"] as const,
  fileExtension: ["tsx", "js", "jsx"] as const,
  sourceDir: [] as ReadonlyArray<string>,
};

export const ComponentTemplate = {
  class: (
    fileName: string,
    style: string | false
  ) => `import React, { Component } from 'react';${
    style ? `\nimport "./${fileName}.${style}";` : ""
  }

export class ${fileName} extends Component {
  render() {
    return <div>${fileName}</div>
  }
}

export default ${fileName}`,
  function: (
    fileName: string,
    style: string | false
  ) => `import React from 'react';${
    style ? `\nimport "./${fileName}.${style}";` : ""
  }

const ${fileName} = () => {
  return <div>${fileName}</div>
}

export default ${fileName}`,
};

export type _<T extends keyof typeof defaultsArr> =
  typeof defaultsArr[T][number];

export class DefaultConfig {
  "style": _<"style"> = "css";
  "component": _<"component"> = "function";
  "fileExtension": _<"fileExtension"> = "jsx";
  "sourceDir": _<"sourceDir"> = "src";

  "set": (key: string, value: string) => void;
  constructor() {
    Object.defineProperty(this, "set", {
      enumerable: false,
      value: (key: keyof DefaultConfig, value: string) => {
        (this as any)[key] = value;
      },
    });
  }
}

export function toPascal(str: string): string {
  return str
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}
