const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) { // 파일 저장 폴더 경로
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) { 
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
var upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {

  // 클라이언트에서 가져온 이미지 저장
  upload(req, res, err => {
    if(err){
      return req.json({ success: false, err });
    }
    // 저장된 정보를 클라이언트로 전달
    return res.json({ 
      success: true, 
      filePath: res.req.file.path, 
      fileName: res.req.file.filename 
    })
  });
});


router.post('/', (req, res) => {

  // 받아온 정보를 DB에 저장
  const product = new Product(req.body);

  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/products', (req, res) => {
  // product collection에 들어 있는 모든 상품 정보를 가져온다.
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};
  for(let key in req.body.filter){ // key : continents, price
    if(req.body.filter[key].length > 0){
      if(key === 'price'){
        findArgs[key] = {
          $gte: req.body.filter[key][0], // greater than equal 이상 ex) 200이상
          $lte: req.body.filter[key][1] // less than equal 이하 ex) 249이하
        }
      } else { // key가 continents일 때 
        findArgs[key] = req.body.filter[key];
      }
    }
  }
  if(term){
    Product.find(findArgs)
      .find({ $text: {$search: term }})
      .populate("writer") // 사용자에 대한 모든 정보를 가져온다. 
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      });
  } else {
    Product.find(findArgs)
      .populate("writer") // 사용자에 대한 모든 정보를 가져온다. 
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      });
  }
});

router.get('/products_by_id', (req, res) => {

  let type = req.query.type;
  let productId = req.query.id;

  // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다. 
  Product.find({ _id: productId })
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product});
    });
});


module.exports = router;
