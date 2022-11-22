import chalk from "chalk";
import { Command } from "commander";
import path from "path";
import fs from "fs";
import {
  toPascal,
  DefaultConfig,
  CONFIG_FILE_NAME,
  defaultsArr,
  writeFile,
  compareDefaults,
} from "../default-config";
import { ComponentTemplate } from "../templates";

export default function commandComponent(program: Command) {
  program
    .command("component")
    .alias("c")
    .description("create component")
    .argument("<path>", "path with file name (ex. components/home)")
    .option(
      "-dc, --directory-component",
      "wheter the component must be created in own directory"
    )
    .action(async (str: string, options) => {
      let paths = str.split("/") as string[];
      const fileName = toPascal(paths.pop() as any);
      const settings = new DefaultConfig();

      compareDefaults(settings);

      if (options["directoryComponent"]) {
        settings.set(
          "directoryComponent",
          options["directoryComponent"] ? "yes" : "no"
        );
      }
      if (settings.directoryComponent === "yes") {
        paths.push(fileName);
      }

      writeFile(
        path.join(process.cwd(), settings.sourceDir, ...paths),
        fileName + `.${settings.fileExtension}`,
        ComponentTemplate[settings.component](fileName, settings.style),
        (err) => {
          if (err) return console.error(err);
          console.log(
            chalk.italic.green(
              `Created ${path.join(
                settings.sourceDir,
                paths.join("/"),
                fileName + "." + settings.fileExtension
              )}`
            )
          );
        }
      );
      if (settings.style !== "none") {
        writeFile(
          path.join(process.cwd(), settings.sourceDir, ...paths),
          fileName + `.${settings.style}`,
          "",
          (err) => {
            if (err) return console.error(err);
            console.log(
              chalk.italic.green(
                `Created ${path.join(
                  settings.sourceDir,
                  paths.join("/"),
                  fileName + "." + settings.style
                )}`
              )
            );
          }
        );
      }
    });
}
