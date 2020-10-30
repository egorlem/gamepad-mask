const b = `\x1b[42;30m DONE \x1b[0m`;
const e = `\x1b[41;30m ERROR \x1b[0m`;
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

async function start() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/lasttest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(port, () => {
      console.log(`${b} App: work on http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e.message, `Опаньки`);
    process.exit(1);
  }
}
start();
