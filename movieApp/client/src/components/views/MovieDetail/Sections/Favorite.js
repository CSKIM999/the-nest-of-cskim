import * as Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from 'antd'

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    // userFrom 이라고 작성하면
    // userFrom : userFrom 으로 인식하게 됨.
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Error:Get Favorite Number");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Error: Post Favorited");
      }
    });
  }, []);

  const onClickFavorite = () => {
    console.log(variables)
    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables)
      .then ( response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1)
          setFavorited(!Favorited)
        } else {
          alert('ERROR : REMOVE FAVORITE')
        }
      })
      
    } else {
      Axios.post('/api/favorite/addToFavorite', variables)
      .then ( response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1)
          setFavorited(!Favorited)
        } else {
          alert('ERROR : ADD FAVORITE')
        }
      })

    }
  }


  return (
    <Button onClick={onClickFavorite}>
      {Favorited ? "NOT FAVORITE" : "ADD TO FAVORITE"} {FavoriteNumber}
    </Button>
  );
}

export default Favorite;
