/*
 * String sample
 * NAME("Xbox Wireless Controller) (STANDARD GAMEPAD Vendor: VID(045e) Product: PID(02e0))";
 * Removing everything except vid, pid or name.
 */
const regExp = {
  fromBlink: /^.+\(.*?Vendor:\s[a-z0-9]{4}\sProduct:\s[a-z0-9]{4}\)$/gi,
  fromGecko: /^[a-z0-9]{4}-[a-z0-9]{4}-.*$/,
  vid: {
    blink: /(?<=Vendor:\s).{4}/,
    gecko: /(?<=^)[a-z0-9]{4}(?=-[a-z0-9]{4}-)/,
  },
  pid: {
    blink: /(?<=Product:\s).{4}/,
    gecko: /(?<=^.{4}-).{4}(?=-)/,
  },
  name: {
    blink: /\s\(.*Vendor:\s.*Product:.*\)/g,
    gecko: /^[a-z0-9]{4}-[a-z0-9]{4}-/g,
  },
};

let a = `test string ${name.gecko}\n`;
let test = false;
let test2 = this.true;
let obj = {
  title: "Flight Sim Controls (Vendor: 0079 Product: 0006)",
  name: "Flight Sim Controls",
  vid: "0079",
  pid: "0006",
  manufacturer: "DragonRise Inc.",
};

class GamepadMask {
  constructor(string) {
    this.title = string;
    this.name = null;
    this.vid = null;
    this.pid = null;
    this.manufacturer = null;
  }
  findName() {}
  findVid() {}
  findPid() {}
  findName() {}
  findManufacturer() {}
  setUserAgent() {
    switch (true) {
      case regExp.fromBlink.test(this.title):
        return "Blink";
      case regExp.fromGecko.test(this.title):
        return "Gecko";
      default:
        return this.title;
    }
  }
}

module.exports = { GamepadMask, regExp };
