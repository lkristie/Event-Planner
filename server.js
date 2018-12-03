var express= require('express');
var app=express();
const bodyParser= require("body-parser");
var fs=require('fs');
//connect firebase with the server / node.js
var admin = require('firebase-admin');
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://event-planner-2bed5.firebaseio.com/'
 });
 //need to  create a json configuration file for firebase... figure out how to do it..
//respond with the login page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Html docs/Login.html');
 });


 app.listen(8080, () => {
    console.log('listening on 8080');
  });