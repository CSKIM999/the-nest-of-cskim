import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import * as Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

const tag = "VideoDetailPage";

function VideoDetailPage() {
  const videoId = useParams().videoId;
  const variable = { videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const AsyncPostVideoDetail = async () => {
  await Axios.post("/api/video/getVideoDetail", variable)
    .then((response) => {
    if (response.data.success) {
      setVideoDetail(response.data.videoDetail);
    } else {
      alert(`getVideoError in ${tag}`);
    }})
  }

  useEffect(() => {
    // Axios.post("/api/video/getVideoDetail", variable).then((response) => {
    //   if (response.data.success) {
    //     setVideoDetail(response.data.videoDetail);
    //   } else {
    //     alert(`getVideoError in ${tag}`);
    //   }
    // });
    AsyncPostVideoDetail()
  }, [])
  if (VideoDetail.writer) {

    const subscribeButton = VideoDetail.writer?._id !== localStorage.getItem('userId') && <Subscribe userTo ={VideoDetail.writer?._id} userFrom = {localStorage.getItem('userId')}  />

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
                avatar={<Avatar src={VideoDetail.writer?.image} />}
                title={VideoDetail.writer?.name}
                description={VideoDetail.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <div style={{ padding: "3rem 0" }}>
            <SideVideo />
          </div>
        </Col>
      </Row>
    )} else {
      return (
        <div>Loading...</div>
      )
  }
    ;
}

export default VideoDetailPage;
