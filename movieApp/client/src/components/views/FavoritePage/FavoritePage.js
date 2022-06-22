import React, {useEffect, useState} from 'react'
import './favorite.css'
import {Popover} from 'antd'
import * as Axios from 'axios'
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {

  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavoredMovie()
  }, [])

  const fetchFavoredMovie = () => {
    Axios.post('/api/favorite/getFavoredMovie', {userFrom : localStorage.getItem('userId')})
    .then(response => {
      if (response.data.success) {
        setFavorites(response.data.favorite)
      } else {
        alert("ERROR : GET FAVMOVIEDATA")
      }
    })
  }


  const onClickDelete = (movieId,userFrom) => {
    const variables = {
      movieId,
      userFrom
    }
    Axios.post('/api/favorite/removeFromFavorite',variables)
    .then(response => {
      if (response.data.success) {
        fetchFavoredMovie()
      } else {
        alert('ERROR : DEL FAV ERROR IN FAVPAGE')
      }
    })
  }

  const renderCards = Favorites.map((fav,index) => {
    const content = (
      <div>
        {fav.moviePost ?
        <img src={`${IMAGE_BASE_URL}w500${fav.moviePost}`} /> : 'no image'
      }
      </div>
    )
    return <tr key={index}>
      <Popover content={content} title={`${fav.movieTitle}`}>
        <td>{fav.movieTitle}</td>
      </Popover>

      <td>{fav.movieRunTime}</td>

      {/* 평소같으면 그냥 onclick function 만들어서 지워주고 끝이었겠지만, 
      이번엔 현재 Fav 취소하려는 데이터를 mongodb에 보내서 지워줘야하므로 조금 다른 방법을 사용 */}
      <td><button onClick={() => onClickDelete(fav.movieId,fav.userFrom)}>Remove</button></td>
    </tr>
})
  
  return (
    <div style={{width:'85%', margin: '3rem auto'}}>
      <h2> Favorite Moives </h2>
      <hr />
      
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>

    </div>
  )
}

export default FavoritePage