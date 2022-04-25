import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/views/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers';

// 원래 createStore 를 통해 만들어진 store 를 바로 사용하지만, function 과 promise type handling 을 위해
// applyMi--- 를 통해 promise--- 와 ReduxThunk 를 가공 한 후 그 내용을 throw 해줌
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)


ReactDOM.render( // 찾아보니 React.StrictMode 는 app의 모든것을 감싸야 한다
  // 따라서 provider 도 R.S 의 안에 넣어야하는것
  <React.StrictMode>
    <Provider store = {createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>

      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
