import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Card, Avatar, Typography, Row, Col } from "antd";
import * as Axios from "axios";
import moment from "moment";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Video, setVideo] = useState([]);

  //useEffect 의 역할??
  // DOM 이 생성되자마자 무엇을 할것인가??
  // [third] 가 입력되지 않으면 계속해서 return function을 실행
  // 만약 [] 만 입력되면 한번만.
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setVideo(response.data.videos);
      } else {
        alert("비디오 가져오기 실패");
      }
    });
  }, []);

  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col key = {video._id} lg={6} md={8} xs={24}>
        {/* 해당 동영상으로 이동하기 위해 비디오 아이디로의 링크를 걸어줌 */}
        <div style={{ position: "relative" }}>
          <Link to={`./video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>
                {minutes}:{seconds}
              </span>
            </div>
          </Link>
        </div>
        <br />
        {/* User 의 이미지 */}
        <Meta
          avatar={<Avatar scr={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginleft: "3rem" }}>{video.views} views</span> -{" "}
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
