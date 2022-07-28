import React, { useEffect } from "react";
import { SlackOutlined } from '@ant-design/icons'

function LandingPage() {

  useEffect(() => {
  }, [])

  return (
    <div style={{
      display:'flex', flexDirection : 'column' ,justifyContent: 'center', alignItems:'center'
      , width:'100%', height:'100%'
    }}>
      <SlackOutlined style={{fontSize:'10rem'}} />
      <br />
      <br />
      <h2>WELCOME TO THE LANDINGPAGE</h2>
    </div>
  )
}

export default LandingPage;
