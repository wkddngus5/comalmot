var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var con = mongoose.connect('mongodb://localhost:27017/test');
var schema = mongoose.Schema;
var model1 = new schema({
  test: String,
  address: String,
  phone: Number
});

var study = mongoose.model('study', model1, 'study');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '컴퓨터 알지도 못하는' });
});

router.get('/test', function(req, res, next){
  res.send('test');
})

router.get('/db', function(req, res, next) {
  study.find({}, function(error, data){
    res.render('index', {
      data: data
    });
  });
});

module.exports = router;
