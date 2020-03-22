// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
const parseDate = date =>
  Number(date) ? new Date(Number(date)) : new Date(date);

// If date is invalid return the responses accordingly
const ifDateInvalid = (req, res, next) => {
  if (!req.params.date)
    return res.json({
      unix: Date.parse(new Date()),
      utc: new Date().toUTCString()
    });

  const date = new Date(parseDate(req.params.date)).toString();
  if (date === "Invalid Date") return res.json({ error: "Invalid Date" });
  next();
};

// timestamp microservice
// uses "ifDateInvalid" middleware that checks whether the date is invalid
app.get("/api/timestamp/:date?", ifDateInvalid, function(req, res) {
  const date = parseDate(req.params.date);
  const utc = date.toUTCString();
  const unix = Date.parse(date);
  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

