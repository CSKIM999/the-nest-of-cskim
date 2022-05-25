import React, { useState } from "react";
import * as Axios from "axios";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";
import { AmazonOutlined } from "@ant-design/icons";
const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.CommentValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        console.log("refresh");
        props.refreshFunction(response.data.result);
      } else {
        alert(" 코멘트 발행에 실패했습니다.");
      }
    });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={
          <Avatar
            icon={<AmazonOutlined />}
            src={props.comment.writer.image}
            alt
          />
        }
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && 
        <form style={{ display: "flex", height: "52px" }} onSubmit={onSubmit}>
          <TextArea
            rows={2}
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="Write Some Comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      }

    </div>
  );
}

export default SingleComment;
