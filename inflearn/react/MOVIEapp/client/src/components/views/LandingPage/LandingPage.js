import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Auth from '../../../hoc/auth'


function LandingPage() {
  useEffect


  return (
    <div style={{width:'100%' , margin : '0'}}>
      {/* MAIN IMAGE */}
      <div style={{width:'85%', margin : '1rem auto'}}>
        <h2>Movies By Latest</h2>
        <hr />
      </div>
      <div style={{display : 'flex' , justifyContent: 'center'}}>
        <button>Load More</button>
      </div>
    </div>
  )
  
}

export default LandingPage