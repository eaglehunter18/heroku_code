
//The first thing we need to do is require express, and create an app
var express=require('express');
var app=express();
var mongoose = require('mongoose');
var  bodyParser=require('body-parser');
var model = require('./model');
var connection = require('./connection');
var Info = mongoose.model('info', model, 'infos');
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/css/back.jpg'));
app.use(express.static(__dirname + "/public"));
//app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
mongoose.connect(connection.connectionString);

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/contactlist',function(req,res){
console.log('I received a GET request for users')
Info.find(function(err,docs){
console.log(docs);
res.json(docs);
});
});

app.post('/contactlist',function(req,res){
console.log(req.body);
var info = new  Info (
        req.body
    );
info.save(function(err){
    if (err) return console.error(err);
        res.json(info);
});
});//end of post

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("id of user we want to delete from database "+ id);
  Info.remove( {'_id': mongoose.Types.ObjectId(id)}, function(error,docs){
     if (error) {
        console.log(error);
     }
        res.json(docs);
     });
});//end of delete

app.get('/contactlist/:id', function (req, res) {
var id=req.params.id;
console.log("id of the user we want to edit "+id);
 Info.findOne({'_id': mongoose.Types.ObjectId(id)},function (err, docs) {
        if (err) return console.error(err);
        res.json(docs);
    });
});//end of app.get

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("Name of user we want to Edit from database "+ req.body.name);
  console.log(mongoose.Types.ObjectId(id));
   var query = { '_id': mongoose.Types.ObjectId(id) };
    var update = { '$set': { 'name': req.body.name, 'email':req.body.email,'number':req.body.number} };
    var options = { 'new': true };
    Info.findOneAndUpdate(query, update, options, function (err, docs) {
        if (err)   console.log(err);
        res.json(docs);
    });
});//end of put
 
 var port=process.env.PORT || 3030;
app.listen(port, function() {
	console.log("server running on port " + port);
});