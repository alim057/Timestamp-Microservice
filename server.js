// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

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


// create get request for headers
app.get('/api/whoami',function(req,res,next){
  req.userAgent = req.headers['user-agent']
  next()
},(req,res,next)=>{
  req.language = req.headers['accept-language']
  next()
},(req,res,next)=>{
  req.ipAdress = req.headers['x-forwarded-for'].split(',')[0]
  next()
},(req,res)=>{
  res.send({ipaddress:req.ipAdress,language:req.language,software:req.userAgent})
})
