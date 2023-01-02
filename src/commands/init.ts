import chalk from "chalk";
import { Command } from "commander";
import path from "path";
import { DefaultConfig, CONFIG_FILE_NAME } from "../default-config";
import fs from "fs";

export default function commandInit(program: Command) {
  program
    .command("init")
    .description("add config file to your project folder")
    .option("-t, --type <extension>", "extension of components", "jsx")
    .option("-s, --style <extension>", "css preprocessor", "css")
    .option(
      "-sd, --sourceDir <folder>",
      "folder path (ex. src, src/components)",
      "src"
    )
    .option(
      "-c, --component <type>",
      "component type (class or function)",
      "function"
    )
    .action((str, options) => {
      const settings = new DefaultConfig();
      const newSettings = options.opts();
      if ("type" in newSettings) {
        newSettings.fileExtension = newSettings.type;
      }

      for (let k in newSettings) {
        settings.set(k, newSettings[k]);
      }

      fs.writeFile(
        path.join(process.cwd(), CONFIG_FILE_NAME),
        JSON.stringify(settings, null, 2),
        (err) => {
          if (err) return console.error(err);
          console.log(
            chalk.greenBright(`Successfully created ${CONFIG_FILE_NAME} file.`)
          );
        }
      );
    });
}
