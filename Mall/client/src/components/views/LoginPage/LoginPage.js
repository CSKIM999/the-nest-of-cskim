import { Axios } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { Form, Input, Button } from "antd";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    // event.preventDefault();
    // submit event 이기때문에 이 이 페이지는 제출되나, 이동시키는 페이지가 없어
    // 페이지가 새로고침 되기만 함.
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        window.localStorage.setItem("userId", response.payload.userId);
        navigate("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onSubmitHandler}
        autoComplete="off"
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Please Input Your E-Mail Adress" },
          ]}
        >
          <Input onChange={onEmailHandler} />
        </Form.Item>

        {/* <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} /> */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please Input Your Password" }]}
        >
          <Input.Password onChange={onPasswordHandler} />
        </Form.Item>
        {/* <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} /> */}
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
