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
  
  Product.find()
    .populate("writer") // 사용자에 대한 모든 정보를 가져온다. 
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success: false, err})
      return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
    });
})

module.exports = router;
