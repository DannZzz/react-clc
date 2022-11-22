import path from "path";
import fs from "fs";

export const defaultsArr = {
  style: ["scss", "less", "css", "sass", "none"] as const,
  component: ["function", "class"] as const,
  fileExtension: ["tsx", "js", "jsx"] as const,
  directoryComponent: ["yes", "no"] as const,
  sourceDir: [] as ReadonlyArray<string>,
  nativeStyle: ["file", "in", "none"] as const,
};

export const CONFIG_FILE_NAME = "component-config.json";


export type _<T extends keyof typeof defaultsArr> =
  typeof defaultsArr[T][number];

export class DefaultConfig {
  "style": _<"style"> = "css";
  "component": _<"component"> = "function";
  "fileExtension": _<"fileExtension"> = "jsx";
  "sourceDir": _<"sourceDir"> = "src";
  "directoryComponent": _<"directoryComponent"> = "no";
  "nativeStyle": _<"nativeStyle"> = "file";

  "set": (key: string, value: string) => void;
  constructor() {
    Object.defineProperty(this, "set", {
      enumerable: false,
      value: (key: keyof DefaultConfig, value: string | boolean | number) => {
        if (key in defaultsArr) {
          const setting = (defaultsArr as any)[key];
          if (setting?.length === 0) {
            (this as any)[key] = value;
          } else if (setting.includes(value)) {
            (this as any)[key] = value;
          } else if (typeof value === "string") {
            try {
              const evaled = eval(value as string);
              if (setting.includes(evaled)) {
                (this as any)[key] = evaled;
              }
            } catch {}
          }
        }
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

export function writeFile(
  _path: string,
  fileName: string,
  contents: string,
  cb: (err: any) => any
) {
  fs.mkdir(_path, { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.writeFile(path.join(_path, fileName), contents, cb);
  });
}

export function compareDefaults(settings: DefaultConfig) {
  try {
    const json = fs.readFileSync(path.join(process.cwd(), CONFIG_FILE_NAME));
    if (json) {
      const newSettings = JSON.parse(json as any);
      for (let k in newSettings) {
        const exists = (defaultsArr as any)[k];
        if (exists) {
          if (exists.length && exists.includes(newSettings[k])) {
            settings.set(k, newSettings[k]);
          } else if (!exists.length) {
            settings.set(k, newSettings[k]);
          }
        }
      }
    }
  } catch {}
}
