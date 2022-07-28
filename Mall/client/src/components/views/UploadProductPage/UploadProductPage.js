import React, { useState } from "react";
import { Typography, Button, Form, Input, Select } from "antd";
import FileUpload from "../../utils/FileUpload";
import * as Axios from "axios";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const navigate = useNavigate();
  const [TitleName, setTitleName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandeler = (event) => {
    setTitleName(event.currentTarget.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };
  const continentChangeHandler = (event) => {
    setContinent(event);
  };

  const updateImages = (newImages) => {
    // 하위 컴포넌트에서 어떻게 상위 컴포넌트로 자료를 전송할것인가?
    // refreshFunction 을 prop 으로 주고
    // 하위 컴포넌트에서 props.rf(param) 을 통해 해당 핸들러를 호출하는 방식
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(props.user.userData);
    if (!TitleName || !Description || !Price || !Continent || !Images) {
      return alert("값이 입력되지 않은 항목이 있습니다.");
    }
    // 서버에 데이터를 request 로 전송
    const body = {
      // 로그인된 아이디 정보 가져오기
      // 여기서 redux 내의 userData 를 써도 되지만, auth 를 통해 user 데이터가 prop으로 넘어온걸 사용해도 됨.
      writer: props.user.userData._id,
      title: TitleName,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent,
    };
    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        navigate("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>여행상품 업로드</Title>
      </div>
      <Form onSubmitCapture={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input
          onChange={titleChangeHandeler}
          value={TitleName}
          placeholder={"이름을 입력해주세요"}
        />
        <br />
        <br />
        <label>설명</label>
        <TextArea
          onChange={descriptionChangeHandler}
          value={Description}
          placeholder={"상세정보를 입력해주세요"}
        />
        <br />
        <br />
        <label>가격($)</label>
        <Input onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <Select
          value={Continent}
          style={{ width: 120 }}
          onChange={continentChangeHandler}
        >
          {Continents.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
