require('dotenv').load();
var express = require('express');
var notelyServerApp = express();
var Note=require('./models/note');
var bodyParser = require('body-parser');

//allow ourselves to use 'req.body' to work with form data
notelyServerApp.use(bodyParser.json());
//var db = require('./config/db');

// var db = require('mongoose');
// db.connect('mongodb://localhost:27017/notely/');
// var NoteSchema = db.Schema({
//   name:String
// });
// var Note=db.model('Note', NoteSchema);

// Cross-Origin Resource Sharing (CORS) middleware
notelyServerApp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
notelyServerApp.get('/notes', function(req, res){
  Note.find().then(function(noteData){
    res.json(noteData);
  });

});


notelyServerApp.post('/notes', function(req, res) {
  var note=new Note({
    // console.log('jgfjgfj: ' + req.body.note.body_html);
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  note.save().then(function(noteData){
    res.json({
      message: 'saved',
      note: noteData
    });
  });
});

notelyServerApp.listen(3030, function(){
  console.log('listening on http://localhost:3030');
});
