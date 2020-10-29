var mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

var db = mongoose.connection;
mongoose.connect("mongodb://127.0.0.1:27017");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log(__dirname);
