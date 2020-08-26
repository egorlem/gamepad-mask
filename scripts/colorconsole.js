const reset = "\u001b[0m";

const fg = {
  Black: "\u001b[30m",
  Red: "\u001b[31m",
  Green: "\u001b[32m",
  Yellow: "\u001b[33m",
  Blue: "\u001b[34m",
  Magenta: "\u001b[35m",
  Cyan: "\u001b[36m",
  White: "\u001b[37;1m",
};

const bg = {
  Black: "\u001b[40m",
  Red: "\u001b[41m",
  Green: "\u001b[42;1m",
  Yellow: "\u001b[43m",
  Blue: "\u001b[44m",
  Magenta: "\u001b[45m",
  Cyan: "\u001b[46",
  White: "\u001b[47m",
};

function log(string) {
  return bg.Green + " " + string + " " + reset;
}

module.exports = log;

//  Background Green: \u001b[42m
// Background Yellow: \u001b[43m
//     Background Blue: \u001b[44m
//     Background Magenta: \u001b[45m
//     Background Cyan: \u001b[46m
//     Background White: \u001b[47m
