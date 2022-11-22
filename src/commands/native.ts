import chalk from "chalk";
import { Command } from "commander";
import path from "path";
import fs from "fs";
import {
  toPascal,
  DefaultConfig,
  writeFile,
  compareDefaults,
} from "../default-config";
import {
  NativeComponentTemplate,
  ReactNativeStyleTemplate,
} from "../templates";

export default function commandNative(program: Command) {
  program
    .command("native")
    .alias("n")
    .description("create react native component")
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
        NativeComponentTemplate[settings.component](
          fileName,
          settings.nativeStyle
        ),
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
      if (settings.nativeStyle === "file") {
        const ext = settings.fileExtension === "tsx" ? "ts" : "js";
        writeFile(
          path.join(process.cwd(), settings.sourceDir, ...paths),
          fileName + `.style.${ext}`,
          ReactNativeStyleTemplate,
          (err) => {
            if (err) return console.error(err);
            console.log(
              chalk.italic.green(
                `Created ${path.join(
                  settings.sourceDir,
                  paths.join("/"),
                  fileName + ".style." + ext
                )}`
              )
            );
          }
        );
      }
    });
}
