export declare const defaultsArr: {
    style: readonly ["scss", "less", "css", "sass", false];
    component: readonly ["function", "class"];
    fileExtension: readonly ["tsx", "js", "jsx"];
    sourceDir: readonly string[];
};
export declare const ComponentTemplate: {
    class: (fileName: string, style: string | false) => string;
    function: (fileName: string, style: string | false) => string;
};
export type _<T extends keyof typeof defaultsArr> = typeof defaultsArr[T][number];
export declare class DefaultConfig {
    "style": _<"style">;
    "component": _<"component">;
    "fileExtension": _<"fileExtension">;
    "sourceDir": _<"sourceDir">;
    "set": (key: string, value: string) => void;
    constructor();
}
export declare function toPascal(str: string): string;
