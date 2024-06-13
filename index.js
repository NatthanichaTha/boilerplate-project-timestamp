// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res)=>{
  const {input} = req.params;

  const now = new Date();
  const unix = Math.floor(now.getTime());
  const dateString = now.toUTCString(); 
  res.json({"unix": unix, "utc": dateString});
  });

app.get("/api/:input", (req, res)=>{
  const {input} = req.params;
  const isUnix = !isNaN(Number(input)) && Number(input).toString().length === 13;

  if (isUnix) {
    const unix = parseInt(input);
    const date = new Date(unix);
    const dateString = date.toUTCString();
    res.json({"unix": unix, "utc": dateString});
  }
  else{
    const date = new Date(input);
    if (date.getTime() !== date.getTime()){
      res.json({ error : "Invalid Date" });
    }
    const dateString = date.toUTCString();
    const unix = Math.floor(date.getTime());
    res.json({"unix": unix, "utc": dateString})
  } 
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
