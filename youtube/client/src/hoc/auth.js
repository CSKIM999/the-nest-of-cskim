import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  // option : null/아무나 true/로그인한 자 false/로그인하지 않은 자
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        // console.log(response)
        // without login
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          // with login
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (!option) {
              navigate("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
