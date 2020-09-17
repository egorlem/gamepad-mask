const testBlick = [
  "Flight Sim Controls (Vendor: 0079 Product: 0006)",
  "Fighting Stick mini 4 (Vendor: 0f0d Product: 0088)",
  "Generic USB Joystick (Vendor: 0079 Product: 0002)",
  "Plantronics BT600 (Vendor: 047f Product: 02f7)",
  "DSD 32 Button Controller - EST (Vendor: 04d8 Product: 8a3d)",
  "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02e0)",
];
const testGecko = [
  "145f-01c5-Trust Gamepad",
  "16c0-0487-Teensyduino Serial/Keyboard/Mouse/Joystick",
  "0955-7214-HID Gamepad",
  "06a3-075c-Saitek X52 Flight Control System",
  "d209-0511-Ultimarc Ultra-Stik Player 1",
];

const regExpFromBlink = /^.+\(.*?Vendor:\s[a-z0-9]{4}\sProduct:\s[a-z0-9]{4}\)$/gi;
const regExpFromGecko = /^[a-z0-9]{4}-[a-z0-9]{4}-.*$/;

const regExp = {
  getvid: {
    primary: /(?<=Vendor:\s).{4}/,
    secondary: /(?<=^).{4}(?=-.{4}-)/,
  },
  getpid: {
    primary: /(?<=Product:\s).{4}/,
    secondary: /(?<=^.{4}-).{4}(?=-)/,
  },
  getname: {
    primary: /\s\(.*Vendor:\s.*Product:.*\)/g,
    secondary: /^.{4}-.{4}-/g,
  },
};

let str = "Любо, братцы, любо! test";
let reg = str.match(/\s/g);
let reg2 = str.match(/test$/gi);
const baseName =
  "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02e0)";
let teststr = baseName.match(regExpFromBlink);
let test4 = testBlick.map((e) => e.match(regExpFromBlink) || []);
console.log(teststr);
let test5 = testGecko.map((e) => e.match(regExpFromGecko));
console.log(test5.valueOf());
