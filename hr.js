var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var tables = [];
var count = 0;

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
  count ++;
  console.log(count);
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
  count ++;
  console.log(count);
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/t5", function(req, res) {
  var onlyFive = [];
  tables.forEach(function(itm, idx) {
    if(idx < 5) {
      onlyFive.push(tables[idx]);
    }
  });
  res.json(onlyFive);
});
app.get("/wait", function(req, res) {
  var wait = [];
  tables.forEach(function(itm, idx) {
    if(idx >= 5) {
      wait.push(tables[idx]);
    }
  });
  res.json(wait);
});
app.get("/api", function(req, res) {
  console.log(tables);
  return res.json(tables);
});
app.post("/clear", function(req, res) {
  tables = [];
  res.json("Table Cleared");
});


app.post("/api/new", function(req, res) {
  var newtable = req.body;
  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});