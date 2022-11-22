import { _ } from "./default-config";
export declare const ComponentTemplate: {
    class: (fileName: string, style: string) => string;
    function: (fileName: string, style: string) => string;
};
export declare const NativeComponentTemplate: {
    function: (fileName: string, nativeStyle: _<"nativeStyle">) => string;
    class: (fileName: string, nativeStyle: _<"nativeStyle">) => string;
};
export declare const ReactNativeStyleTemplate = "import {StyleSheet} from \"react-native\";\n\nexport default StyleSheet.create({\n    \n});";
