import React from 'react';

function LeftMenu(props) {
  const items = [
    {
      label:(<a href='/'>Home</a>),
      key : "home"
    },
    {
      label:(<a href='/subscription'>Subscription</a>),
      key : "Subscription"
    }
  ]

  return { items }

}

export default LeftMenu