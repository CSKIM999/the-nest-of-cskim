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

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert(`getVideoError in ${tag}`);
      }
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${VideoDetail.filePath}`}
            controls
          />
          
          <List.Item actions={[<Subscribe userTo ={VideoDetail.writer?._id} userFrom = {localStorage.getItem('userId')}  />]}>
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
  );
}

export default VideoDetailPage;
