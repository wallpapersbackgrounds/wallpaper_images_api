var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var routes=require('./routes/route.js');
mongoose.Promise = require('bluebird');

var app=express();
var port=process.env.PORT||3000;


mongoose.connect('mongodb://sherryduggal:sofittech@ds051720.mlab.com:51720/image');
mongoose.connection.on('connected',function (){
  console.log('connected to database');
});

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(bodyParser.json());
app.use(routes);

app.all('*',(req,res)=>res.send({msg:'insan ban oay'}));

app.listen(port,function(){
  console.log('server is live on port'+port);
});

