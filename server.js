// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// get time of right now
app.get("/api/timestamp", function(req,res,next){
  req.time = new Date().toString();
        next();
        }, (req,res)=>{
          res.json({time:req.time})
        })

app.get("/api/timestamp/:date_string",function(req,res,next){
    req.date = req.params.date_string
    next();
    },(req,res,next)=>{
      req.utc = new Date(req.date).toUTCString()
      next()
    },(req,res,next)=>{
      req.unix = new Date(req.date).getTime()
      next()
    },(req,res)=>{
        res.send({unix:req.unix, utc: req.utc})
      })