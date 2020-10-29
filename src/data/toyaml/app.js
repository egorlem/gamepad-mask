const fs = require("fs");
const yaml = require("js-yaml");
const vendors = fs.readFileSync("./usb.txt", "utf8");
const errsrt = "\x1b[1;41;30m";

const FIRST_LEVEL_KEY = "YAML/FIRST_LEVEL_KEY";
const FIRST_LEVEL_VALUE = "YAML/FIRST_LEVEL_VALUE";

const keyRegexType = /^.{4}\s{2}.+$/;
const valueRegexType = /^\t.{4}\s{2}.*/;

const firstLevelKeyRegex = /^.{4}(?=\s{2}.*$)/;
const firstLevelValueRegex = /(?<=^.{4}\s{2}).*$/;
const secondLevelKeyRegex = /^\t.{4}(?=\s{2})/;
const secondLevelValueRegex = /(?<=^\t.{4}\s{2}).*$/;

// Разбиваем txt на масив строк
const clearString = (str) => {
  return str.match(/.+/g);
};

// Обробатывает каждую строку определяет ключ и значение
function formatParser(str, i) {
  let type = getType(str);
  if (type === FIRST_LEVEL_KEY) {
    return createVendorInYamlFormat(str, i);
  } else if (type === FIRST_LEVEL_VALUE) {
    return createProductInYamlFormat(str, i);
  }
}

// проверяет к какому типу относится строка
function getType(str) {
  if (keyRegexType.test(str)) {
    return FIRST_LEVEL_KEY;
  } else if (valueRegexType.test(str)) {
    return FIRST_LEVEL_VALUE;
  }
}

// create yaml format from string
function createVendorInYamlFormat(str, i) {
  let [key] = str.match(firstLevelKeyRegex);
  let [value] = str.match(firstLevelValueRegex);
  let yamlValue = value.replace(/\\|"/g, "");
  // console.log(key, value);
  return `"${key}":\n  vendor: "${yamlValue}"\n`;
}

function createProductInYamlFormat(str, i) {
  let [key] = str.match(secondLevelKeyRegex);
  let yamlKey = key.replace(/\s/, "");
  let [value] = str.match(secondLevelValueRegex);
  let yamlValue = value.replace(/\\|"/g, "");
  return `  "${yamlKey}": "${yamlValue}"\n`;
}

const objectifyText = (text) => {
  let srt = clearString(text);
  return srt.map((e, i) => {
    return formatParser(e, i);
  });
};
const createYamlFile = (filename, result) => {
  return new Promise((resolve, reject) => {
    if (filename && result) {
      fs.writeFileSync(`./${filename}.yml`, result.join(""), "utf8");
      let stats = fs.statSync(`./${filename}.yml`);
      resolve(stats);
    } else {
      reject("Wrong");
    }
  });
};
const createJsonFile = (filename) => {
  return new Promise((resolve, reject) => {
    let toJSON = yaml.load(
      fs.readFileSync(`./${filename}.yml`, { encoding: "utf-8" })
    );
    if (toJSON) {
      fs.writeFileSync(`./${filename}.json`, JSON.stringify(toJSON, null, 2));
      let stats = fs.statSync(`./${filename}.json`);
      resolve(stats);
    } else {
      reject("Wrong");
    }
  });
};

//" DONE  Packaged: /Users/EgorL/projects/guezwhoz-vscode-theme/guezwhoz-vscode-theme-dev-1.1.0.vsix
// (11 files, 150.12KB)"

const printFileInfo = (...file) => {
  console.log("\x1b[1;42;30m DONE \x1b[0m Created: 2 file");
};

const parseTextToYaml = async (vendors, filename) => {
  try {
    const result = objectifyText(vendors);
    const ymlFile = await createYamlFile(filename, result);
    const jsonFIle = await createJsonFile(filename);
    printFileInfo(ymlFile, jsonFIle);
  } catch (err) {
    console.log(`${errsrt} ERROR \x1b[0m ${err}`);
  }
};
parseTextToYaml(vendors, "usb.uid");

// function getFilesizeInBytes(filename) {
//   var stats = fs.statSync(filename);
//   var fileSizeInBytes = stats["size"];
//   return fileSizeInBytes;
// }
