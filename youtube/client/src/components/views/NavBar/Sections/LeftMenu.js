import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  const items = [
    {
      label:(<a href='/'>Home</a>),
      key : "home"
    },
    {
      label:(<span>Blogs</span>),
      children : [
        {
          type : 'group',
          children : [
            {
              type: 'group',
              label: 'Item 1',
              children: [
                {
                  label: 'Option 1',
                  key: 'setting:1',
                },
                {
                  label: 'Option 2',
                  key: 'setting:2',
                }
              ]
            },
            {
              type: 'group',
              label: 'Item 2',
              children: [
                {
                  label: 'Option 3',
                  key: 'setting:3',
                },
                {
                  label: 'Option 4',
                  key: 'setting:4',
                }
              ]
            },
          ]
        }
      ]
    }
  ]

  return { items }
  // return <Menu mode={props.mode} items = {items} />



  // return (


  //   <Menu mode={props.mode}>
  //   <Menu.Item key="mail">
  //     <a href="/">Home</a>
  //   </Menu.Item>
  //   <SubMenu title={<span>Blogs</span>}>
  //     <MenuItemGroup title="Item 1">
  //       <Menu.Item key="setting:1">Option 1</Menu.Item>
  //       <Menu.Item key="setting:2">Option 2</Menu.Item>
  //     </MenuItemGroup>
  //     <MenuItemGroup title="Item 2">
  //       <Menu.Item key="setting:3">Option 3</Menu.Item>
  //       <Menu.Item key="setting:4">Option 4</Menu.Item>
  //     </MenuItemGroup>
  //   </SubMenu>
  // </Menu>
  // )
}

export default LeftMenu