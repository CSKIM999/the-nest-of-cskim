import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action'
import { useNavigate } from 'react-router-dom'


export default function (SpecificComponent,option, adminRoute = null) {
  // option : null/아무나 true/로그인한 자 false/로그인하지 않은 자
  function AuthenticationCheck(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(auth()).then(response => {
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login')
            alert('잘못 된 접근입니다')
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/')
            alert('관리자 권한이 필요합니다')
          } else {
            if (option === false) {
              navigate('/')
              alert('이미 로그인되어있습니다')
            }
          }
        }



      })
    }, [])


    return <SpecificComponent {...props} />;
  }



  return AuthenticationCheck
}