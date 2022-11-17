#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var default_config_1 = require("./default-config");
var CONFIG_FILE_NAME = "component-config.json";
commander_1.program
    .version("1.0.1")
    .description("Create react components easily")
    .allowUnknownOption()
    .parse(process.argv);
commander_1.program
    .command("init")
    .description("add config file to your project folder")
    .option("-t, --type <extension>", "extension of components", "jsx")
    .option("-s, --style <extension>", "css preprocessor", "css")
    .option("-sd, --sourceDir <folder>", "folder path (ex. src, src/components)", "src")
    .option("-c, --component <type>", "component type (class or function)", "function")
    .action(function (str, options) {
    var settings = new default_config_1.DefaultConfig();
    var newSettings = options.opts();
    for (var k in newSettings) {
        var exists = default_config_1.defaultsArr[k];
        if (exists) {
            if (exists.length && exists.includes(newSettings[k])) {
                settings.set(k, newSettings[k]);
            }
            else if (!exists.length) {
                settings.set(k, newSettings[k]);
            }
        }
    }
    fs_1.default.writeFile(path_1.default.join(process.cwd(), CONFIG_FILE_NAME), JSON.stringify(settings, null, 2), function (err) {
        if (err)
            return console.error(err);
        console.log(chalk_1.default.greenBright("Successfully created ".concat(CONFIG_FILE_NAME, " file.")));
    });
});
commander_1.program
    .command("component")
    .alias("c")
    .description("create component")
    .argument("<path>", "path with file name (ex. components/home)")
    .action(function (str, options) { return __awaiter(void 0, void 0, void 0, function () {
    var paths, fileName, settings, json, newSettings, k, exists;
    return __generator(this, function (_a) {
        paths = str.split("/");
        fileName = (0, default_config_1.toPascal)(paths.pop());
        settings = new default_config_1.DefaultConfig();
        try {
            json = fs_1.default.readFileSync(path_1.default.join(process.cwd(), CONFIG_FILE_NAME));
            if (json) {
                newSettings = JSON.parse(json);
                for (k in newSettings) {
                    exists = default_config_1.defaultsArr[k];
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
        catch (_b) { }
        writeFile(path_1.default.join.apply(path_1.default, __spreadArray([process.cwd(), settings.sourceDir], paths, false)), fileName + ".".concat(settings.fileExtension), default_config_1.ComponentTemplate[settings.component](fileName, settings.style), function (err) {
            if (err)
                return console.error(err);
            console.log(chalk_1.default.italic.green("Created ".concat(path_1.default.join(settings.sourceDir, paths.join("/"), fileName + "." + settings.fileExtension))));
        });
        if (settings.style) {
            writeFile(path_1.default.join.apply(path_1.default, __spreadArray([process.cwd(), settings.sourceDir], paths, false)), fileName + ".".concat(settings.style), "", function (err) {
                if (err)
                    return console.error(err);
                console.log(chalk_1.default.italic.green("Created ".concat(path_1.default.join(settings.sourceDir, paths.join("/"), fileName + "." + settings.style))));
            });
        }
        return [2 /*return*/];
    });
}); });
commander_1.program
    .command("component-directory")
    .alias("cd")
    .description("create component within its folder")
    .argument("<path>", "path with directory name (ex. components/home)")
    .action(function (str, options) { return __awaiter(void 0, void 0, void 0, function () {
    var paths, fileName, settings, lastDir, json, newSettings, k, exists;
    return __generator(this, function (_a) {
        paths = str.split("/");
        fileName = (0, default_config_1.toPascal)(paths.at(-1));
        settings = new default_config_1.DefaultConfig();
        if (paths.length) {
            lastDir = paths.pop();
            paths.push((0, default_config_1.toPascal)(lastDir));
        }
        try {
            json = fs_1.default.readFileSync(path_1.default.join(process.cwd(), CONFIG_FILE_NAME));
            if (json) {
                newSettings = JSON.parse(json);
                for (k in newSettings) {
                    exists = default_config_1.defaultsArr[k];
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
        catch (_b) { }
        writeFile(path_1.default.join.apply(path_1.default, __spreadArray([process.cwd(), settings.sourceDir], paths, false)), fileName + ".".concat(settings.fileExtension), default_config_1.ComponentTemplate[settings.component](fileName, settings.style), function (err) {
            if (err)
                return console.error(err);
            console.log(chalk_1.default.italic.green("Created ".concat(path_1.default.join(settings.sourceDir, paths.join("/"), fileName + "." + settings.fileExtension))));
        });
        if (settings.style) {
            writeFile(path_1.default.join.apply(path_1.default, __spreadArray([process.cwd(), settings.sourceDir], paths, false)), fileName + ".".concat(settings.style), "", function (err) {
                if (err)
                    return console.error(err);
                console.log(chalk_1.default.italic.green("Created ".concat(path_1.default.join(settings.sourceDir, paths.join("/"), fileName + "." + settings.style))));
            });
        }
        return [2 /*return*/];
    });
}); });
commander_1.program.parse();
function writeFile(_path, fileName, contents, cb) {
    fs_1.default.mkdir(_path, { recursive: true }, function (err) {
        if (err)
            return cb(err);
        fs_1.default.writeFile(path_1.default.join(_path, fileName), contents, cb);
    });
}
