import React from 'react'
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { DingdingOutlined } from '@ant-design/icons'
import {  Menu } from 'antd';
import './Sections/Navbar.css';


function NavBar() {
  const item = [{label : (<DingdingOutlined style={{fontSize:'1.5rem'}}  href="/" />)},{label : (<a href="/">Logo</a>)}]
  const RightMenuItem = RightMenu().items
  const LeftMenuItem = LeftMenu().items
  return <Menu mode='horizontal' items = {item.concat(LeftMenuItem,RightMenuItem)} />
}

export default NavBar