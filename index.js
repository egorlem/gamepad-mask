const setGamePad = require("./createGamepadObject");
const fs = require("fs");
let gamepadlist = JSON.parse(fs.readFileSync("gamepadmidl.json", "utf8"));
let data = setGamePad(gamepadlist);
let gamepadDataBase = JSON.stringify(data, null, '\t');
fs.writeFileSync("./gamepaddatabase.json", gamepadDataBase);
