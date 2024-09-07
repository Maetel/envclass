const inputArgs = process.argv.slice(2);
//help
if (
  ["--help", "help", "h", "--h", "-h", "-help"].includes(inputArgs[0]?.trim())
) {
  console.log(`
  Usage: envclass [options]

  Options:
    --init  :  Write default option file to the root (envclass.config.json)
    --transpile : Writes transpiled js files. Refer to envclass.config.json for the output directory
  `);
  return;
}

const fs = require("fs");
const path = require("path");
const findup = require("findup-sync");

console.log = console.log.bind(console, "[envclass] :");
console.warn = console.warn.bind(console, "[envclass] :");
console.error = console.error.bind(console, "[envclass] :");

const defaultOptions = {
  ENV_NAME: "DST_ENV",
  ENV_ORDER: ["NEXT_PUBLIC_ENVIRONMENT", "NEXT_PUBLIC_VERCEL_ENV", "NODE_ENV"],
  publicFileName: "ENV_PUBLIC",
  privateFileName: "ENV_SERVER",
  publicFileDirPath: "./scripts/",
  publicImportDirPath: "./",
  privateFileDirPath: "./scripts/",
  searchThrough: [".env.local", ".env"],
  createDirIfNotExist: true,
  devEnvs: ["development", "dev", "d"],
  qaEnvs: ["preview", "test", "qa"],
  prodEnvs: ["prod", "production", "p"],
  initIgnorePrefix: "NULLABLE_",
  overrideSuffix: "_OVERRIDE",
  envIgnore: "@env-ignore",
  envIgnoreStart: "@env-ignore-start",
  envIgnoreEnd: "@env-ignore-end",
  speakOnEnvIgnore: true,
  transpileOutDir: "./_ENV",
};

const readJSON = (path) =>
  path ? JSON.parse(fs.readFileSync(path, "utf-8")) : null;
const optionFile = readJSON(findup("envclass.config.json"));

if (inputArgs[0]?.trim() === "--init") {
  //abort if the file already exists
  if (optionFile) {
    console.warn(
      "Option file already exists. Aborting to write default option file"
    );
    return;
  }
  const rootDirectory = process.cwd();
  const filePath = path.join(rootDirectory, "envclass.config.json");

  fs.writeFileSync(filePath, JSON.stringify(defaultOptions, null, 2));
  console.log("Default option file written to the root : ", filePath);
  return;
}

if (!optionFile) {
  console.warn(
    "No option file found. Using default options. If you want default option file written to the root, run `envclass --init`"
  );
}

const options = optionFile ?? defaultOptions;

const { envclass } = require("./envclass.js");
envclass(options);
