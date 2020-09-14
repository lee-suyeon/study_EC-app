const express = require('express');
const router = express.Router();
const multer  = require('multer');

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
})

module.exports = router;
