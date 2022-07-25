import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined } from "@ant-design/icons";
import * as axios from "axios";

function FileUpload() {
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
      } else {
        alert("파일을 업로드하는데 실패했습니다.");
      }
    });
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
          <div key={index}>
            {console.log(Images)}
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
