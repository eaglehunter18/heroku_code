
//The first thing we need to do is require express, and create an app
var express=require('express');
var app=express();

var port = process.env.PORT || 8080;
//connect to our MongoDB server
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist'])
//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
var  bodyParser=require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.get('/', function(req, res) {
	res.render('index');
})

app.get('/contactlist',function(req,res){
console.log('I received a GET request for users')
db.contactlist.find(function(err,docs){
console.log(docs);
res.json(docs);
});
//res.json(contactlist);
});

app.post('/contactlist',function(req,res){
console.log(req.body);//we must parse this data go to console and type npm install body parser
//insert entered data into database 'contactlist' , and  convert res data using json to view in view model
db.contactlist.insert(req.body,function(err,doc){
	res.json(doc);
})
});//end of post

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("id of user we want to delete from database "+ id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});//end of delete

app.get('/contactlist/:id', function (req, res) {
var id=req.params.id;
console.log("id of the user we want to edit "+id);
db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
	if(doc){
		console.log("doc id is "+doc._id);
	}
	else{
		console.log("no data for this user");
	}
    res.json(doc);
});//return id of selected user that is stored in database
});//end of app.get

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("Name of user we want to Edit from database "+ req.body.name);
  db.contactlist.findAndModify({
	query: {_id:mongojs.ObjectId(id)},
	update: {$set:{name:req.body.name,email:req.body.email,number:req.body.number}} ,
	new: true
},function(err,doc){
	res.json(doc); }

)//end of db.contactlist
});//end of put

app.listen(port, function() {
	console.log('app running')
})