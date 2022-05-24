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

}

export default LeftMenu