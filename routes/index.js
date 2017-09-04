const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost:27017/comalmot');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  company: String,
  part: String,
  details: Object
}, {collection: 'products'});

const informationSchema = new Schema({
  title: String,
  contents: String,
  name: String,
}, {collection: 'informations'});

const userSchema = new Schema({
  id: String,
  password: String,
  authority: Number
}, {collection: 'users'});

const Product = mongoose.model('products', productSchema);
const Information = mongoose.model('informations', informationSchema);
const User = mongoose.model('users', userSchema);

function getProducts() {
  return new Promise((resolve, reject) => {
    Product.find({}, {_id:0, name:1, company:1, details:1, part:1}, (err, products) => {
        if(err) {
          reject(err);
        }
        resolve(products);
      });
    });
}

function getInfomations() {
  return new Promise((resolve, reject) => {
    Information.find({}, {_id:0, name:1, title:1, contents:1}, (err, informations) => {
      if(err) {
        reject(err);
      }
      resolve(informations);
    });
  });
}

/* GET home page. */
router.get('/', (req, res) => {
  console.log('session: ', req.session);
  let productsList;
  let informationsList;

  let cpuList = [];
  let ramList = [];
  let mainBoardList = [];
  let vgaList = [];
  let ssdList = [];
  let hddList = [];

  getProducts().then(products => {
    productsList = products;
    return getInfomations();
  }).then(informations => {
    informationsList = informations;

    for(let i = 0 ; i < productsList.length ; i++) {
      switch (productsList[i].part) {
        case 'CPU':
          cpuList.push(productsList[i]);
          break;
        case 'RAM':
          ramList.push(productsList[i]);
          break;
        case 'mainBoard':
          mainBoardList.push(productsList[i]);
          break;
        case 'VGA':
          vgaList.push(productsList[i]);
          break;
        case 'SSD':
          ssdList.push(productsList[i]);
          break;
        case 'HDD':
          hddList.push(productsList[i]);
          break;
        default:
          console.log('others: ', productsList[i]);
      }
    }

    res.render('index', {
      title: '컴퓨터 알지도 못하는',
      login_ok: req.session.login_ok,
      login_id: req.session.login_id,
      cpuList:cpuList,
      ramList:ramList,
      mainBoardList:mainBoardList,
      vgaList:vgaList,
      ssdList:ssdList,
      hddList:hddList,
      informationsList:informationsList
    });

  }).catch(err => {
    res.send(err);
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
});

router.post('/login', (req, res) => {
  const inputId = req.body.id;
  const inputPassword = req.body.password;

  req.session.login_ok = true;
  req.session.login_id = inputId;
  console.log('request session: ', req.session);
  res.status(200).json({
    "id": inputId,
    "password": inputPassword
  });

  console.log(inputId, inputPassword);
  // User.findOne({id: inputId}, {_id:0, id:1, password:1, authority:1}, function(err, user){
  //   if(err) return res.status(500).send({error: 'database failure'});
  //   console.log(user);
  //   if(!user) {
  //     res.json({err: 'no user'});
  //   }
  //   else if(user.password === inputPassword){
  //
  //   }else{
  //     req.session.login_ok = false;
  //     res.json({error: 'login false'});
  //   }
  // });
});

router.post('/product', (req, res) => {
  console.log('input: ', req.body);
  let product = new Product();
  product.name = req.body.name;
  product.company = req.body.company;
  product.part = req.body.part;
  product.details = req.body.details;

  product.save(err => {
    if(err) {
      res.status(500).json({'err':err});
    }
    res.status(201).json(product);
  })
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
