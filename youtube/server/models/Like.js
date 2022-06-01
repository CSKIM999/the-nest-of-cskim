const mongoose = require("mongoose");
const Schema = require("mongoose");

const likeSchema = mongoose.Schema(
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

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
