const setGamePad = require("./createGamepadObject");
const fs = require("fs");
//let gamepadlist = JSON.parse(fs.readFileSync("gamepadmidl.json", "utf8"));
let test = "Bluetooth Wireless Controller (Vendor: 2dc8 Product: 6100)";

let data = setGamePad(test);
let gamepadDataBase = JSON.stringify(data, null, "\t");
fs.writeFileSync("./gamerefactor.json", gamepadDataBase);
