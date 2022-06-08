import React, { useState }  from 'react'
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Menu } from 'antd';
import Icon from '@ant-design/icons'
import './Sections/Navbar.css';


function NavBar() {
  const item = [{label : (<a href="/">Logo</a>)}]
  const RightMenuItem = RightMenu().items
  const LeftMenuItem = LeftMenu().items
  return <Menu mode='horizontal' items = {item.concat(LeftMenuItem,RightMenuItem)} />
}

export default NavBar