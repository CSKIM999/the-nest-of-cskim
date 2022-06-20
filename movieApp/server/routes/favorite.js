const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  // mongoDB 에서 Fav 숫자 가져오기
  // Favorite 에서 movieId 가 req.body.movieId 와 같은것을 찾아줘!
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favoriteNumber: info.length });
  });
  // 다시 FE 에 Fav 숫자 정보 던져주기
});

router.post("/favorited", (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    return res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  // Favorite 모델에서 req.body.movieId 를 movieId . . . 를 조건으로 가진 데이터를 찾아서 삭제해줘
  Favorite.findOneAndDelete({movieId: req.body.movieId,userFrom: req.body.userFrom})
    .exec((err, doc) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({success: true , doc})
    })
});

router.post("/addToFavorite", (req, res) => {
  // new Favorite 를 통해 새로운 모델 Document 객체를 생성하고 그 안에 req.body 를 넣어줌.
  const favorite = new Favorite(req.body)

  // 객체를 mongoose 의 save 를 통해 mongodb에 넣어주기
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success : true })
  })

});

module.exports = router;
