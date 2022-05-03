/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import {useLocation,useNavigate,useParams} from "react-router-dom";
import { useSelector } from "react-redux";

// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     console.log('tag2')
//     return (
//       <Component
//         {...props}
//         router={{ location, navigate, params }}
//       />
//     );
//   }
//   return ComponentWithRouterProp;
// }

function RightMenu(props) {
  const user = useSelector(state => state.user)
  let navigate = useNavigate();
  const logoutHandler = () => {
    axios.get(`/api/users/logout`)
      .then(response => {
        if (response.data.success) {
          navigate('/login')
        } else {
          alert('로그아웃 실패')
        }
      })
  }

  if (user.userData && !user.userData.isAuth) {

    const items = [
      {
        label:(<a href='/login'>Sign-In</a>),
        key : "mail"
      },
      {
        label:(<a href='/register'>Sign-Up</a>),
        key : "app"
      }
    ]
    return { items }

    // return (
    //   <Menu mode={props.mode}>
    //     <Menu.Item key="mail">
    //       <a href="/login">Signin</a>
    //     </Menu.Item>
    //     <Menu.Item key="app">
    //       <a href="/register">Signup</a>
    //     </Menu.Item>
    //   </Menu>
    // )
    
  } else {
    const items = [
      {
        label:(<a href='/logout' onClick={logoutHandler}>Log-out</a>),
        key : "logout"
      }
    ]
    return { items }

    // return (

    //   <Menu mode={props.mode}>
    //     <Menu.Item key="logout">
    //       <a onClick={logoutHandler}>Logout</a>
    //     </Menu.Item>
    //   </Menu>
    // )
  }
}

export default RightMenu;

