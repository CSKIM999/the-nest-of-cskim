const mongoose = require("mongoose");
const Schema = require("mongoose");

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamp: true }
);

const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = { Dislike };
