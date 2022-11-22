"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var default_config_1 = require("../default-config");
var fs_1 = __importDefault(require("fs"));
function commandInit(program) {
    program
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
            settings.set(k, newSettings[k]);
        }
        fs_1.default.writeFile(path_1.default.join(process.cwd(), default_config_1.CONFIG_FILE_NAME), JSON.stringify(settings, null, 2), function (err) {
            if (err)
                return console.error(err);
            console.log(chalk_1.default.greenBright("Successfully created ".concat(default_config_1.CONFIG_FILE_NAME, " file.")));
        });
    });
}
exports.default = commandInit;
