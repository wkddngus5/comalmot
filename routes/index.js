var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/comalmot');

var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  company: String
}, {collection: 'products'});

var informationSchema = new Schema({
  title: String,
  contents: String
}, {collection: 'informations'});

var Product = mongoose.model('products', productSchema);
var Information = mongoose.model('informations', informationSchema);


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: '컴퓨터 알지도 못하는' });
});

router.get('/test', function(req, res, next){
  res.send('test');
});

router.get('/input', function(req, res){
  res.render('input');
})

router.post('/input', function(req, res, next){
  var information = new Information();
  information.title = req.body.name;
  information.contents = req.body.contents;

  information.save(function(err){
    if(err) {
      console.error(err);
      res.status(500).send({error: 'data save failure'})
    }
    res.send('add success');
  });
});



router.get('/db', function(req, res) {
  Product.find({part: 'CPU'}, {_id:0, name:1, company:1, details:1}, function(err, products){
    if(err) return res.status(500).send({error: 'database failure'});


    res.render('index', {title: 'db', result: products});
  });
});

module.exports = router;
