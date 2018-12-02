var express= require('express');
var app=express();
const bodyParser= require("body-parser");
var fs=require('fs');
//connect firebase with the server / node.js
//let serviceKey = require('./firebase-config/firebase.service-key.json'); // The service key of the firebase project
//let firebaseConfig = require('./firebase-config/firebase.config.json'); 
var admin = require('firebase-admin');
admin.initializeApp({
   credential: admin.credential.cert(serviceKey),
   databaseURL: 'https://event-planner-2bed5.firebaseio.com/'
 });
 var database=admin.database();
//respond with the login page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Html docs/Login.html');
 });


 app.listen(8080, () => {
    console.log('listening on 8080');
  });