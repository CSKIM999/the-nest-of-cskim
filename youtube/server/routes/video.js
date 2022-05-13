const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
// const { Video } = require('../models/Video')
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  // req 가 업로드 파일일 것임.

  // 비디오 정보 가져오기

  // todo... 비디오를 서버에 저장하기
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
    // url 은 저장된 파일의 경로
  });
});

router.post("/getVideoDetail", (req, res) => {
  // todo.... 비디오Id를 이용해서 데이터 가져오기
  Video.findOne({ _id: req.body.videoId })
    .populate("writer") // 이번에도 마찬가지로 writer 와 모든 정보를 가져오게됨
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      debugger;
      return res.status(200).json({ success: true, videoDetail });
    });
});

router.post("/uploadVideo", (req, res) => {
  // todo.... 비디오 정보들 저장하기
  // req.body : Client 에서 onSubmit 을 통해 건넨 모든 Data 를 갖게 됨
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  // 비디오를 DB 에서 가져와서 client 에 보내기
  // find() 를 사용해서 Video 안의 모든 Video 를 가져옴
  // Video 의 모든것을 가져오나, 사용한 Schema Method 가 ObjectId 여서 ID 만 가져옴
  // 따라서 populate('writer') 를 사용해서 원하는 모든 정보를 가져올 수 있음.
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ success: true, videos });
    });
});

router.post("/thumbnail", (req, res) => {
  // create thumbnail and Get the Video's runningtime
  let filePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.url) // res.body.url : /uploads -- ffmpeg 에게 파일의 경로를 넘겨줌
    .on("filenames", function (filenames) {
      console.log("Will Generate : " + filenames.join(", "));

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots Taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

module.exports = router;
