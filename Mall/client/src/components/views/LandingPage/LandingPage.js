import React, { useEffect, useState } from "react";
import { RocketOutlined } from "@ant-design/icons";
import * as axios from "axios";
import { Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSilder from "../../utils/ImageSilder";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(2);
  const [PostSize, setPostSize] = useState(0);
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품 샘플 로딩에 실패했습니다.");
      }
    });
  };

  const loadHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={12} xs={24} key={index}>
        <Card
          cover={
            <ImageSilder images={product.images} />
            // <img
            //   style={{ width: "100%", maxHeight: "150px" }}
            //   src={`http://localhost:5000/${product.images[0]}`}
            // />
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketOutlined />
        </h2>
      </div>
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />
      {PostSize >= Limit && (
        <div
          style={{ margin: "1rem", display: "flex", justifyContent: "center" }}
        >
          <Button onClick={loadHandler}>더보기</Button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
