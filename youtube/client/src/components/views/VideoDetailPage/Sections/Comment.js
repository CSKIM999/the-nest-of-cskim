import * as Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import { Input, Button } from "antd";
const { TextArea } = Input;

function Comment(props) {
  const videoId = props.postId;
  const user = useSelector((state) => state.user);
  const [commentValue, setcommentValue] = useState("");

  const handleClick = (event) => {
    setcommentValue(event.currentTarget.value);
  };

  const onSutmit = (event) => {
    event.preventDefault();

    const variable = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId
    };

    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result)
      } else {
        alert(" 코멘트 발행에 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists  */}
      {props.commentLists && props.commentLists.map((comment, index) => (
        (!comment.responseTo && 
            <SingleComment comment={comment} postId={ videoId } refreshFunction={ props.refreshFunction }></SingleComment>
        )
      ))}
      
      <br />

      {/* Root Comment Form */}
      <form style={{ display: "flex", height: "52px" }} onSubmit={onSutmit}>
        <TextArea
          rows={2}
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="Write Some Comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSutmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
