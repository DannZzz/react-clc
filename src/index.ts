#!/usr/bin/env node
import chalk from "chalk";
import path from "path";
import { program } from "commander";
import fs, { write } from "fs";
import {
  ComponentTemplate,
  DefaultConfig,
  defaultsArr,
  toPascal,
} from "./default-config";

const CONFIG_FILE_NAME = "component-config.json";

program
  .version("0.0.1")
  .description("Create react components easily")
  .allowUnknownOption()
  .parse(process.argv);

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

    for (let k in newSettings) {
      const exists = (defaultsArr as any)[k];
      if (exists) {
        if (exists.length && exists.includes(newSettings[k])) {
          settings.set(k, newSettings[k]);
        } else if (!exists.length) {
          settings.set(k, newSettings[k]);
        }
      }
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

program
  .command("component")
  .alias("c")
  .description("create component")
  .argument("<path>", "path with file name (ex. components/home)")
  .action(async (str: string, options) => {
    let paths = str.split("/") as string[];
    const fileName = toPascal(paths.pop() as any);
    const settings = new DefaultConfig();
    if (paths.length) {
      const lastDir = paths.pop();
      paths.push(toPascal(lastDir as any));
    }
    try {
      const json = fs.readFileSync(path.join(process.cwd(), CONFIG_FILE_NAME));
      if (json) {
        const newSettings = JSON.parse(json as any);
        for (let k in newSettings) {
          const exists = (defaultsArr as any)[k];
          if (exists) {
            if (exists.length && exists.includes(newSettings[k])) {
              settings.set(k, newSettings[k]);
            } else if (!exists.length) {
              settings.set(k, newSettings[k]);
            }
          }
        }
      }
    } catch {}
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
    if (settings.style) {
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

program.parse();

function writeFile(
  _path: string,
  fileName: string,
  contents: string,
  cb: (err: any) => any
) {
  fs.mkdir(_path, { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.writeFile(path.join(_path, fileName), contents, cb);
  });
}
