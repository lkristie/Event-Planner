const PORT =process.env.PORT || 8080;

var express= require('express');
var app=express();
const server= require('http').Server(app);
const bodyParser= require("body-parser");
const nodemailer = require('nodemailer');
var fs=require('fs');
var schedule=require("node-schedule");
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

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "myremindservice@gmail.com",
		pass: "asddsaasd"
	}
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

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

app.post('/remindersubmit', (req, res) => {
	
	//idk
	let body = '';
	var date = req.body.d;
	var email = req.body.email;
	var eventDate = req.body.date;
	var eventTime = req.body.time;
	var name = req.body.name;
	console.log(email);
	console.log(date);
	res.end("yes");
	
	const mailOptions = {
		from: "myremindeservice@gmail.com",
		to: email,
		subject: "MyRemind Reminder!",
		html: "Hello! This is your reminder that you have an event: " +name+", on " + eventDate + " at " + eventTime
	};
	var j = schedule.scheduleJob(date, function(){
	transporter.sendMail(mailOptions, function (err, info) {
		if(err)
			console.log(err)
		else
			console.log(info)
	});
	}.bind(null,mailOptions));
});

app.listen(PORT || 8080, () => {
    console.log('listening on 8080');
});
