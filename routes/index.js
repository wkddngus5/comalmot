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
  company: String,
  part: String,
  details: Object
}, {collection: 'products'});

var informationSchema = new Schema({
  title: String,
  contents: String,
  name: String,
}, {collection: 'informations'});

var userSchema = new Schema({
  id: String,
  password: String,
  authority: Number
}, {collection: 'users'});

var Product = mongoose.model('products', productSchema);
var Information = mongoose.model('informations', informationSchema);
var User = mongoose.model('users', userSchema);


/* GET home page. */
router.get('/', function(req, res) {
  var informationsArray=[];
  var productsArray=[];

  Product.find({}, {_id:0, name:1, company:1, details:1, part:1}, function(err, products){
    if(err) return res.status(500).send({error: 'database failure'});
    productsArray = products;
    // console.log(productsArray);
    Information.find({}, {_id:0, name:1, title:1, contents:1}, function(err, informations){
      if(err) return res.status(500).send({error: 'database failure'});
      informationsArray = informations;
      console.log(informationsArray[0].contents);
      res.render('index', {
        title: '컴퓨터 알지도 못하는',
        login_ok: req.session.login_ok,
        login_id: req.session.login_id,
        productsList:productsArray,
        informationsList:informationsArray});
      });
    });
  });

router.get('/addProduct', function(req, res){
  res.render('addProduct', {title: '새 제품 추가'});
});

router.post('/signIn', function(req, res){
  var user = new User();
  user.id = req.body.id;
  user.password = req.body.password;
  user.authority = 1;
  user.save(function(err){
    if(err) {
      console.error(err);
      res.status(500).send({error: 'data save failure'});
    }
    res.redirect('/');
  })
})

router.post('/login', function(req, res){
  var inputId = req.body.id;
  var inputPassword = req.body.password;
  User.findOne({id: inputId}, {_id:0, id:1, password:1, authority:1}, function(err, user){
    if(err) return res.status(500).send({error: 'database failure'});
    console.log(user);
    if(user == null) {res.redirect('/')}
    else if(user.password == inputPassword){
      req.session.login_ok = true;
      req.session.login_id = inputId;
      res.redirect('/');
    }else{
      console.log('login false');
      req.session.login_ok = false;
      res.redirect('/');
    }
  });
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
});

router.post('/addInformation', function(req, res){
  var information = new Information();
  information.title = req.body.title;
  information.contents = req.body.contents;

  information.save(function(err){
    if(err) {
      console.error(err);
      res.status(500).send({error: 'data save failure'});
    }
    res.redirect('/');
  });
});

router.post('/addProduct', function(req, res){
  var information = new Information();
  information.title = req.body.title;
  information.contents = req.body.contents;

  information.save(function(err){
    if(err) {
      console.error(err);
      res.status(500).send({error: 'data save failure'});
    }
    res.redirect('/');
  });
});



module.exports = router;
