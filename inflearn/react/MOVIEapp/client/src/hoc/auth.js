import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  // option List [ null, true, false ]
  // null => 아무나 출입 가능한 페이지
  // True => 로그인 한 유저만 출입가능
  // false => 로그인 한 유저는 출입 불가
  
  // adminRoute 는 Default 값이 null 이므로 누구나 출입 가능하나, true 로 넣어주면 admin만 가능한 라우트가 됨
  
  
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response)

        // login하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login')
            alert('로그인해야 사용할 수 있습니다')
          }
        } else {
          // login 한 상태
          if (adminRoute && !response.payload.isAdmin) { //admin이 아닌데 adminpage로 가려할때
            navigate('/')
            alert('접근할 수 없습니다')
          } else {
            if (option === false) {
              navigate('/')
              alert('ERROR')
            }
          }
        }





      })
    }, [])

    return (
      <SpecificComponent />
    )

  }


  return AuthenticationCheck
}