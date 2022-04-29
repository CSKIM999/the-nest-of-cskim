import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }


  const onSubmitHandler = (event) => {
    event.preventDefault();
    // submit event 이기때문에 이 이 페이지는 제출되나, 이동시키는 페이지가 없어
    // 페이지가 새로고침 되기만 함.
    if (Password !== ConfirmPassword) {
      return alert('비밀번호가 일치하지 않습니다')
    }
    let body = {
      email : Email,
      password : Password,
      name : Name
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/')
        } else {
          alert('회원가입에 실패했습니다')
        }
      })
  }

  return (
    <div style={{
      display:'flex', justifyContent: 'center', alignItems:'center'
      , width:'100%', height:'100%'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        
        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        
        <button type='submit'>회원가입</button>
      </form>

    </div>
  )
}

export default RegisterPage