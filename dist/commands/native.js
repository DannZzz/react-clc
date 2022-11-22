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
var default_config_1 = require("../default-config");
var templates_1 = require("../templates");
function commandNative(program) {
    var _this = this;
    program
        .command("native")
        .alias("n")
        .description("create react native component")
        .argument("<path>", "path with file name (ex. components/home)")
        .option("-dc, --directory-component", "wheter the component must be created in own directory")
        .action(function (str, options) { return __awaiter(_this, void 0, void 0, function () {
        var paths, fileName, settings, ext_1;
        return __generator(this, function (_a) {
            paths = str.split("/");
            fileName = (0, default_config_1.toPascal)(paths.pop());
            settings = new default_config_1.DefaultConfig();
            (0, default_config_1.compareDefaults)(settings);
            if (options["directoryComponent"]) {
                settings.set("directoryComponent", options["directoryComponent"] ? "yes" : "no");
            }
            if (settings.directoryComponent === "yes") {
                paths.push(fileName);
            }
            (0, default_config_1.writeFile)(path_1.default.join.apply(path_1.default, __spreadArray([process.cwd(), settings.sourceDir], paths, false)), fileName + ".".concat(settings.fileExtension), templates_1.NativeComponentTemplate[settings.component](fileName, settings.nativeStyle), function (err) {
                if (err)
                    return console.error(err);
                console.log(chalk_1.default.italic.green("Created ".concat(path_1.default.join(settings.sourceDir, paths.join("/"), fileName + "." + settings.fileExtension))));
            });
            if (settings.nativeStyle === "file") {
                ext_1 = settings.fileExtension === "tsx" ? "ts" : "js";
                (0, default_config_1.writeFile)(path_1.default.join.apply(path_1.default, __spreadArray([process.cwd(), settings.sourceDir], paths, false)), fileName + ".style.".concat(ext_1), templates_1.ReactNativeStyleTemplate, function (err) {
                    if (err)
                        return console.error(err);
                    console.log(chalk_1.default.italic.green("Created ".concat(path_1.default.join(settings.sourceDir, paths.join("/"), fileName + ".style." + ext_1))));
                });
            }
            return [2 /*return*/];
        });
    }); });
}
exports.default = commandNative;
