"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascal = exports.DefaultConfig = exports.ComponentTemplate = exports.defaultsArr = void 0;
exports.defaultsArr = {
    style: ["scss", "less", "css", "sass", false],
    component: ["function", "class"],
    fileExtension: ["tsx", "js", "jsx"],
    sourceDir: [],
};
exports.ComponentTemplate = {
    class: function (fileName, style) { return "import React, { Component } from 'react';".concat(style ? "\nimport \"./".concat(fileName, ".").concat(style, "\";") : "", "\n\nexport class ").concat(fileName, " extends Component {\n  render() {\n    return <div>").concat(fileName, "</div>\n  }\n}\n\nexport default ").concat(fileName); },
    function: function (fileName, style) { return "import React from 'react';".concat(style ? "\nimport \"./".concat(fileName, ".").concat(style, "\";") : "", "\n\nconst ").concat(fileName, " = () => {\n  return <div>").concat(fileName, "</div>\n}\n\nexport default ").concat(fileName); },
};
var DefaultConfig = /** @class */ (function () {
    function DefaultConfig() {
        var _this = this;
        this["style"] = "css";
        this["component"] = "function";
        this["fileExtension"] = "jsx";
        this["sourceDir"] = "src";
        Object.defineProperty(this, "set", {
            enumerable: false,
            value: function (key, value) {
                _this[key] = value;
            },
        });
    }
    return DefaultConfig;
}());
exports.DefaultConfig = DefaultConfig;
function toPascal(str) {
    return str
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(new RegExp(/\s+(.)(\w*)/, "g"), function ($1, $2, $3) { return "".concat($2.toUpperCase() + $3); })
        .replace(new RegExp(/\w/), function (s) { return s.toUpperCase(); });
}
exports.toPascal = toPascal;
