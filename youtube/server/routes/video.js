const express = require('express')
const router = express.Router()
// const { Video } = require('../models/Video')
const multer = require('multer')
var ffmpeg = require('fluent-ffmpeg')
const { auth } = require('../middleware/auth')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false)
    }
    cb(null, true)
  }
})
const upload = multer({ storage : storage }).single('file')


router.post('/uploadfiles', (req, res) => {
  // req 가 업로드 파일일 것임.

  // 비디오 정보 가져오기
  


  // todo... 비디오를 서버에 저장하기
  upload(req, res , err => {
    if (err) {
      return res.json({ success : false , err})
    }
    
    return res.json({ success : true , url : res.req.file.path , fileName : res.req.file.filename })
    // url 은 저장된 파일의 경로
  })
})
router.post('/thumbnail', (req, res) => {
  // create thumbnail and Get the Video's runningtime 
  let filePath = ""
  let fileDuration = ""

  ffmpeg.ffprobe(req.body.url, function(err, metadata) {
    console.dir(metadata)
    console.log(metadata.format.duration)
    fileDuration = metadata.format.duration
  })


  ffmpeg(req.body.url) // res.body.url : /uploads -- ffmpeg 에게 파일의 경로를 넘겨줌
  .on('filenames', function(filenames) {
    console.log('Will Generate : ' + filenames.join(', '))

    filePath = "uploads/thumbnails/" + filenames[0]
  })
  .on('end', function() {
    console.log("Screenshots Taken")
    return res.json({ success : true, url: filePath, fileDuration: fileDuration})
  })
  .on('error', function(err) {
    console.log(err)
    return res.json({success: false, err})
  })
  .screenshots({
    count:3,
    folder:'uploads/thumbnails',
    size: '320x240',
    filename: 'thumbnail-%b.png'
  })

})



module.exports = router