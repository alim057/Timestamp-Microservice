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
  req.utc = new Date().toString();
  req.unix = Math.floor(new Date().getTime()/1000)
        next();
        }, (req,res)=>{
          res.json({unix:req.unix,utc:req.utc})
        })

app.get("/api/timestamp/:date_string",function(req,res,next){
  var regexDate = /\d\d\d\d-\d\d-\d\d/g
  var regexUnix = /\d\d\d\d\d\d\d\d\d\d/
                //1450137600
    if(regexDate.test(req.params.date_string)){
      req.date = req.params.date_string
      console.log('a date')
    }if(regexUnix.test(req.params.date_string)){
      req.date = new Date(req.params.date_string*1000)
      console.log('unix time')
      console.log(req.date)
    }
    next();
    },(req,res,next)=>{
      req.unix = Math.floor(new Date(req.date).getTime()/1000)
        console.log(req.unix)
      next()
    },(req,res,next)=>{
      req.utc = new Date(req.date).toUTCString()
        console.log(req.utc)
      next()
    },(req,res)=>{
        res.send({unix:req.unix, utc: req.utc})
      })
