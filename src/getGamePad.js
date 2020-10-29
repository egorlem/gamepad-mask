const fs = require("fs");
const usb = JSON.parse(fs.readFileSync("usbvendorsdb.json", "utf8"));
const pad = JSON.parse(fs.readFileSync("./gamepadshort.json", "utf8"));
let test = "Bluetooth Wireless Controller (Vendor: 2dc8 Product: 6100)";
// const regExpClear = /\t(.+)/g;
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
let int = 1000000;
console.log(int.length === 100000);

let singleGamepadObject = Object.create(
  {
    setup(title, id) {
      this.title = title;
      this.id = id + 1;
    },
    _regExp(regExp, string) {
      string = string.match(regExp.primary) || string.match(regExp.secondary);
      if (!string) {
        return null;
      }
      return string.toString();
    },
    _findManufacturer(vid) {
      if (!vid) {
        return null;
      }
      let [result] = usb.filter((item) => Object.keys(item) == vid);
      if (!result) {
        return null;
      }
      return Object.values(result).toString();
    },
  },
  {
    id: {
      value: null,
      enumerable: true,
      writable: true,
    },
    title: {
      value: null,
      enumerable: true,
      writable: true,
    },
    name: {
      get() {
        if (regExpVid.primary.test(this.title)) {
          name = this.title.replace(regExpName.primary, "");
          return name;
        } else if (regExpVid.secondary.test(this.title)) {
          name = this.title.replace(regExpName.secondary, "");
          return name;
        } else return this.title;
      },
      enumerable: true,
    },
    vid: {
      get() {
        return this._regExp(regExpVid, this.title);
      },
      enumerable: true,
    },
    pid: {
      get() {
        return this._regExp(regExpPid, this.title);
      },
      enumerable: true,
      configurable: true,
    },
    manufacturer: {
      get() {
        return this._findManufacturer(this.vid);
      },
      enumerable: true,
    },
  }
);

class Joystick {
  constructor(name, id) {
    this.name = name;
    this.id = id + 1;
  }
  test() {
    console.log("test");
  }
}

joy = new Joystick("name", 2);

class TestClass {
  constructor(_var) {
    this.testvar = _var;
  }
}

// let res34 = pad.map((e, i) => new Joystick(e, i));
// console.log(JSON.stringify(res34, null, 2));

//console.log(pad);
// let padresult = pad.map((e, i) => {

//   jou.setup(e, i);
//   return joy;
// });
// console.log(padresult);

//let gamepadDataBase = JSON.stringify(res34, null, "\t");
//fs.writeFileSync("./test1.json", gamepadDataBase);

//let descriptor = Object.getOwnPropertyDescriptor(singleGamepadObject, "title");
//console.log(JSON.stringify(singleGamepadObject, null, 2));

//let arr = [];

//console.log(JSON.stringify(data, null, 2));
