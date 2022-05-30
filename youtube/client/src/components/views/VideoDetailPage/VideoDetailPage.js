import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import { GithubOutlined } from '@ant-design/icons'
import * as Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";

const tag = "VideoDetailPage";

function VideoDetailPage() {
  const videoId = useParams().videoId;
  const variable = { videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  // Comment 에서 Submit 된 내용 (newComments) 을 현재 VDpage 까지 들고 옴
  // 들고 온 내용 (newComments) 을 기반으로 useState 를 통해 다시 하위 컴포넌츠에 뿌려주게 됨
  const refreshFunction = (newComments) => {
    setComments(Comments.concat(newComments))
  }

  // const AsyncPostVideoDetail = async () => {
  //   await Axios.post("/api/video/getVideoDetail", variable).then((response) => {
  //     if (response.data.success) {
  //       setVideoDetail(response.data.videoDetail);
  //     } else {
  //       alert(`getVideoError in ${tag}`);
  //     }
  //   });

  //   await Axios.post('/api/comment/getComments',variable)
  //     .then(response => {
  //       if (response.data.success) {
  //         setComments(response.data.comments)
  //       } else {
  //         alert(`Failed to get video Info in ${tag}`)
  //       }

  //     })
  // };

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert(`getVideoError in ${tag}`);
      }
    })

    Axios.post('/api/comment/getComments',variable)
      .then(response => {
        if (response.data.success) {
          setComments(response.data.comments)
        } else {
          alert(`Failed to get video Info in ${tag}`)
        }

      })

    // AsyncPostVideoDetail();
  }, []);

  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer?._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VideoDetail.writer?._id}
        userFrom={localStorage.getItem("userId")}
      />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />

            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={<Avatar icon= {<GithubOutlined />} src={VideoDetail.writer?.image} />}
                title={VideoDetail.writer?.name}
                description={VideoDetail.description}
              />
            </List.Item>
            <Comment refreshFunction = {refreshFunction} commentLists={Comments} postId={videoId} />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <div style={{ padding: "3rem 0" }}>
            <SideVideo />
          </div>
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
