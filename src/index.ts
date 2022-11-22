#!/usr/bin/env node
import { program } from "commander";
import commandInit from "./commands/init";
import commandComponent from "./commands/component";
import commandNative from "./commands/native";

program
  .version("1.0.1")
  .description("Create react components easily")
  .allowUnknownOption();

commandInit(program);
commandComponent(program);
commandNative(program);

program.parse(process.argv);
