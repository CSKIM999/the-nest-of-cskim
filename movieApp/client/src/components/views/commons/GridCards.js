import React from 'react'
import {Col} from 'antd'

function GridCards(props) {
  if (props.LandingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{position:'relative'}}>
          <a href={`/movie/${props.movieId}`}>
            <img style={{width: "100%", height:'320px'}} src={props.image} alt={props.movieName} />
          </a>
        </div>
      </Col>
    )
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{position:'relative'}}>
          <img style={{width: "100%", height:'320px'}} src={props.image} alt={props.characterName} />
          <div style={{color:'black', textShadow:'.5px .5px gray', textAlign:'center'}}>{props.character} ({props.characterName})</div>
        </div>
      </Col>
    )
  }

}

export default GridCards