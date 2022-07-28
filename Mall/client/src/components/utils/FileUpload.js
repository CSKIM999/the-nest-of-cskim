import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined } from "@ant-design/icons";
import * as axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    // 여기서 formData 와 config 를 넣어주지 않으면 에러 발생
    // 파일에 대한 정보를 formData 에, 컨텐츠타입에 대한 정보를 config 에 넣어주어서 BE 에 전해주기
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.fileName]);
        props.refreshFunction([...Images, response.data.fileName]);
      } else {
        alert("파일을 업로드하는데 실패했습니다.");
      }
    });
  };
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <CloudUploadOutlined style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: 350,
          height: 240,
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          // 여기서 onclick={deleteHandler(image)} 가 아닌 이유?
          // 1. onClick={deleteHandler(image)}
          //    는 map 에 따른 div가 생성됨과 동시에 onclick 핸들러가 호출, 반환값을 onClick 에 할당하게 됨.
          // 2. onClick={() => deleteHandler(image)}
          //    반면 이 방법은 렌더링단계에서 div 생성과 동시에 핸들러 함수를 만들고 "함수"를 onClick에 할당하게 됨.
          // 따라서 함수 자체를 할당하고싶다면, 2번 방법을 사용해야 한다는 뜻.
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{
                minWidth: 300,
                width: 300,
                height: 240,
              }}
              src={`http://localhost:5000/uploads/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
