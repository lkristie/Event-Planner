var express= require('express');
var app=express();
var server= require('http').Server(app);
const bodyParser= require("body-parser");
var fs=require('fs');
schedule=require("node-schedule");
//connect firebase with the server / node.js
var admin = require('firebase-admin');
//service key
let serviceAccount=require('./firebase-configuration/service-key-file.json');
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   apiKey: "AIzaSyBD-0alEnH2GSG4-ap3JiGhDHi0M5MFhSg",
   authDomain: "event-planner-2bed5.firebaseapp.com",
   databaseURL: 'https://event-planner-2bed5.firebaseio.com/',
   storageBucket: "event-planner-2bed5.appspot.com"
 });
 var db=admin.database();
 //var app=admin.initializeApp();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//respond with the login page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Html docs/Login.html');
 });
app.get('/homepage.html', function(req, res){
   res.sendFile(__dirname+'/Html docs/homepage.html');
});
app.get('/CreateAccount.html', function(req, res){
   res.sendFile(__dirname+"/Html docs/CreateAccount.html");
});
app.get('/login.html', function(req, res){
   res.sendFile(__dirname+"/Html docs/Login.html");
});
//not using this post
app.post('/loginsubmit', (req, res) => {
   //res.statusCode=200;
   //res.status(200).send();
   console.log("in app.post login/submit");
  // res.setHeader('Content-Type', 'text/html');
  // res.send('Html docs/homepage.html');
});

app.post('/remindersubmit',bodyParser, function(req, res){
	
	//idk
	let body = '';
	//var date = req.body.d;
	console.log(date);
	res.end("yes");
	
});

app.listen(8080, () => {
    console.log('listening on 8080');
});
