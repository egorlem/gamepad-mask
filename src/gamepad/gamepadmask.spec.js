const { GamepadMask, regExp } = require("./gamepadmask");
const log = require("../scripts/colorconsole.js");
const baseName =
  "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02e0)";
const baseName2 = "145f-01c5-Trust Gamepad";
const testBlink = [
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
const testGamepadMask = new GamepadMask(baseName);

describe(log("Regular expression tests"), () => {
  describe(log("Blink"), () => {
    test("совпадение Chrome/Opera и на разнизу с Gecko", () => {
      const res = testBlink.map((e) => {
        let [shadowRes] = e.match(regExp.fromBlink);
        return shadowRes;
      });
      expect(res).toEqual(testBlink);
      expect(res).not.toEqual(testGecko);
    });
    test("Метод возвращяет браузер", () => {
      const res = testBlink.map((e) => {
        let [shadowRes] = e.match(regExp.fromBlink);
        expect(testGamepadMask.setUserAgent(shadowRes)).toEqual("Blink");
        expect(testGamepadMask.setUserAgent(shadowRes)).not.toEqual("Gecko");
      });
    });

    /////////add webkit later
  });
  describe(log("Gecko"), () => {
    test("base провекра regex", () => {
      let [test] = baseName2.match(regExp.fromGecko);
      expect(test).toEqual(baseName2);
      expect(testGamepadMask.setUserAgent(baseName2)).toEqual("Gecko");
    });
    test("Проверяет регулярное вырожение на совпадение", () => {
      const res = testGecko.map((e) => {
        let [shadowRes] = e.match(regExp.fromGecko);
        return shadowRes;
      });
      expect(res).toEqual(testGecko);
      expect(res).not.toEqual(testBlink);
    });
    test("must be Gecko", () => {
      const res = testGecko.map((e) => {
        let [shadowRes] = e.match(regExp.fromGecko);
        expect(testGamepadMask.setUserAgent(shadowRes)).not.toEqual("Blink");
      });
    });
  });
});

// 54c-9cc-Wireless Controller SAFARI WebKit style
// Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc) Blink Chrome / opera
// Gecko Firefox

// REAL ARCADE PRO.4 VLX (Vendor: 0f0d Product: 006f) chrome ps4
// REAL ARCADE PRO.4 VLX (Vendor: 0f0d Product: 0070) chrome ps3

//f0d-70-REAL ARCADE PRO.4 VLX safari ps3 safari
//f0d-6f-REAL ARCADE PRO.4 VLX safari ps4
