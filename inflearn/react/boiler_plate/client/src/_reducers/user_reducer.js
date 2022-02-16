import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from '../_actions/types';



export default function (state ={},action) {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload}
      break;
    case REGISTER_USER:
      return {...state, register: action.payload}
      break;
    case AUTH_USER:
      return {...state, userData: action.payload} 
      // userData 에 server_index.js 의 auth status 가 들어가므로
      // userData 말고 다른 단어로 해도 상관은 없음. 어떤 데이터가 저기 들어오는가가 중요
      break;
    default:
      return state;
  }
}