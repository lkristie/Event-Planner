var express= require('express');
var app=express();
var server= require('http').Server(app);
const bodyParser= require("body-parser");
var fs=require('fs');
//stuff for nodemailer
const exphbs=require('express-handlebars');
const nodemailer=require('nodemailer');
app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

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

//post for sending a message
/*
name: name,
address: address,
city: city,
state: state,
zip: zip,
date: date,
eTime: eTime,
reminder: reminder,
email: email
*/
app.post('/sendMessage', (req, res) => {
   console.log(req.body);
   const output=
   `<h3>Event Reminder!!!</h3>
   <ul>
      <li>${req.body.name} </li>
      <li>${req.body.address} </li>
      <li>${req.body.city} ${req.body.state} ${req.body.zip}</li>
      <li>${req.body.date} </li>
      <li>${req.body.eTime} </li>
   </ul>`;
   let transporter = nodemailer.createTransport({
      host: 'smtp.example.com',//not sure about this
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'myremindservice@gmail.com', // generated ethereal user
          pass: 'asddsaasd' // generated ethereal password
      },
      tls:{
         rejectUnauthorized:false
      }
  });
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"MyRemind" <myremindservice@gmail.com>', // sender address
      to: body.req.email, // list of receivers
      subject: 'Event Reminder', // Subject line
      text: 'Hello, ', // plain text body
      html: output // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      window.alert("Email Sent");
   });
});

//not using this post
app.post('/loginsubmit', (req, res) => {
   //res.statusCode=200;
   //res.status(200).send();
   console.log("in app.post login/submit");
  // res.setHeader('Content-Type', 'text/html');
  // res.send('Html docs/homepage.html');
});


app.listen(8080, () => {
    console.log('listening on 8080');
});
