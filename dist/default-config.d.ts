export declare const defaultsArr: {
    style: readonly ["scss", "less", "css", "sass", "none"];
    component: readonly ["function", "class"];
    fileExtension: readonly ["tsx", "js", "jsx"];
    directoryComponent: readonly ["yes", "no"];
    sourceDir: readonly string[];
    nativeStyle: readonly ["file", "in", "none"];
};
export declare const CONFIG_FILE_NAME = "component-config.json";
export type _<T extends keyof typeof defaultsArr> = typeof defaultsArr[T][number];
export declare class DefaultConfig {
    "style": _<"style">;
    "component": _<"component">;
    "fileExtension": _<"fileExtension">;
    "sourceDir": _<"sourceDir">;
    "directoryComponent": _<"directoryComponent">;
    "nativeStyle": _<"nativeStyle">;
    "set": (key: string, value: string) => void;
    constructor();
}
export declare function toPascal(str: string): string;
export declare function writeFile(_path: string, fileName: string, contents: string, cb: (err: any) => any): void;
export declare function compareDefaults(settings: DefaultConfig): void;
