"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDefaults = exports.writeFile = exports.toPascal = exports.DefaultConfig = exports.CONFIG_FILE_NAME = exports.defaultsArr = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
exports.defaultsArr = {
    style: ["scss", "less", "css", "sass", "none"],
    component: ["function", "class"],
    fileExtension: ["tsx", "js", "jsx"],
    directoryComponent: ["yes", "no"],
    sourceDir: [],
    nativeStyle: ["file", "in", "none"],
};
exports.CONFIG_FILE_NAME = "component-config.json";
var DefaultConfig = /** @class */ (function () {
    function DefaultConfig() {
        var _this = this;
        this["style"] = "css";
        this["component"] = "function";
        this["fileExtension"] = "jsx";
        this["sourceDir"] = "src";
        this["directoryComponent"] = "no";
        this["nativeStyle"] = "file";
        Object.defineProperty(this, "set", {
            enumerable: false,
            value: function (key, value) {
                if (key in exports.defaultsArr) {
                    var setting = exports.defaultsArr[key];
                    if ((setting === null || setting === void 0 ? void 0 : setting.length) === 0) {
                        _this[key] = value;
                    }
                    else if (setting.includes(value)) {
                        _this[key] = value;
                    }
                    else if (typeof value === "string") {
                        try {
                            var evaled = eval(value);
                            if (setting.includes(evaled)) {
                                _this[key] = evaled;
                            }
                        }
                        catch (_a) { }
                    }
                }
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
function writeFile(_path, fileName, contents, cb) {
    fs_1.default.mkdir(_path, { recursive: true }, function (err) {
        if (err)
            return cb(err);
        fs_1.default.writeFile(path_1.default.join(_path, fileName), contents, cb);
    });
}
exports.writeFile = writeFile;
function compareDefaults(settings) {
    try {
        var json = fs_1.default.readFileSync(path_1.default.join(process.cwd(), exports.CONFIG_FILE_NAME));
        if (json) {
            var newSettings = JSON.parse(json);
            for (var k in newSettings) {
                var exists = exports.defaultsArr[k];
                if (exists) {
                    if (exists.length && exists.includes(newSettings[k])) {
                        settings.set(k, newSettings[k]);
                    }
                    else if (!exists.length) {
                        settings.set(k, newSettings[k]);
                    }
                }
            }
        }
    }
    catch (_a) { }
}
exports.compareDefaults = compareDefaults;
