const fs = require("fs");
const usb = JSON.parse(fs.readFileSync("usbvendorsdb.json", "utf8"));
const regExpClear = /\t(.+)/g;
const regExpVid = {
  primary: /(?<=Vendor:\s).{4}/,
  secondary: /(?<=^).{4}(?=-.{4}-)/,
};
const regExpPid = {
  primary: /(?<=Product:\s).{4}/,
  secondary: /(?<=^.{4}-).{4}(?=-)/,
};
const regExpName = {
  primary: /\s\(.*Vendor:\s.*Product:.*\)/g,
  secondary: /^.{4}-.{4}-/g,
};

function __createGamePadObject(string, index) {
  const padObject = new Object();
  const regExp = (regExp, string) => {
    string = string.match(regExp.primary) || string.match(regExp.secondary);
    if (!string) {
      return null;
    }
    return string.toString();
  };
  const getManufacturer = (vid) => {
    if (!vid) {
      return null;
    }
    let result = usb.filter((item) => Object.keys(item) == vid);
    if (result == false) {
      return null;
    }
    return Object.values(result[0]).toString();
  };
  const getGamepadName = (title) => {
    if (regExpVid.primary.test(title)) {
      title = title.replace(regExpName.primary, "");
      return title;
    } else if (regExpVid.secondary.test(title)) {
      title = title.replace(regExpName.secondary, "");
      return title;
    } else return title;
  };
  padObject.id = index + 1;
  padObject.title = string;
  padObject.name = getGamepadName(padObject.title);
  padObject.vid = regExp(regExpVid, string);
  padObject.pid = regExp(regExpPid, string);
  padObject.manufacturer = getManufacturer(padObject.vid);
  return padObject;
}

const setGamePad = (piece) => {
  if (typeof piece === "string") {
    console.log("\x1b[32m%s\x1b[0m", "Processing...");
    piece = __createGamePadObject(piece, (i = "INITIAL ID"));
    console.log("\x1b[32m%s\x1b[0m", `Done 1 more`);
    return piece;
  } else if (typeof piece === "object" && piece.constructor === Array) {
    console.log("\x1b[32m%s\x1b[0m", "Processing...");
    piece = piece.map((e, i) => __createGamePadObject(e, i));
    console.log("\x1b[32m%s\x1b[0m", `Done ${piece.length + 1} more`);
    return piece;
  }
  return console.log(
    "\x1b[41m%s\x1b[0m",
    "The argument must be a string or an array."
  );
};

module.exports = setGamePad;
