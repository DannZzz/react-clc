#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var init_1 = __importDefault(require("./commands/init"));
var component_1 = __importDefault(require("./commands/component"));
var native_1 = __importDefault(require("./commands/native"));
commander_1.program
    .version("1.0.1")
    .description("Create react components easily")
    .allowUnknownOption();
(0, init_1.default)(commander_1.program);
(0, component_1.default)(commander_1.program);
(0, native_1.default)(commander_1.program);
commander_1.program.parse(process.argv);
