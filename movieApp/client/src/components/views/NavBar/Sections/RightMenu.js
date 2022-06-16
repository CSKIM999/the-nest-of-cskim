import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const logoutHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        window.localStorage.removeItem('userId')
        navigate("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    const items = [
      {
        label: <a href="/login">Sign-In</a>,
        key: "mail",
      },
      {
        label: <a href="/register">Sign-Up</a>,
        key: "app",
      },
    ];
    return { items };
  } else {
    const items = [
      {
        label: <a href="/video/upload">Video</a>,
        key: "upload",
      },
      {
        label: (
          <a href="/" onClick={logoutHandler}>
            Log-out
          </a>
        ),
        key: "logout",
      },
    ];
    return { items };
  }
}

export default RightMenu;
