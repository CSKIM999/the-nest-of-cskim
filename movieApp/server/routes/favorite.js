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

module.exports = router;
