import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { API_URL , API_KEY } from '../../Config'

function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    fetch(endpoint)
      .then(response => response.json())
      .then(response => console.log(response))
  }, []) 

  return (
    <div style={{
      width:'100%', margin : '0'
    }}>
      <div style={{
        width:'85%', margin : '1rem auto'
      }}>
        <h2>Movie By Lastest</h2>
        <hr />
      </div>
      <div style={{
        display:'flex', justifyContent : 'center'
      }}>
        <button>Load More</button>
      </div>

    </div>
  )
}

export default LandingPage;
