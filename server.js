var express= require('express');
var app=express();
const bodyParser= require("body-parser");
var fs=require('fs');

 var database=admin.database();
//respond with the login page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Html docs/Login.html');
 });


 app.listen(8080, () => {
    console.log('listening on 8080');
  });