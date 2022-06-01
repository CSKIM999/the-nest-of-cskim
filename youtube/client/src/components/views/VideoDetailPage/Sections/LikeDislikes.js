import React , {useEffect, useState} from 'react'
import { Tooltip } from 'antd'
import {LikeOutlined, LikeFilled ,DislikeOutlined , DislikeFilled} from '@ant-design/icons'
import * as Axios from 'axios'

const tag = 'LikeDislikes'

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DislikeAction, setDislikeAction] = useState(null)
  let variable = {}

  if (props.video) {
    variable ={ videoId: props.videoId,userId: props.userId}
  } else {
    variable ={ commentId:props.commentId,userId:props.userId}
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes',variable)
    .then(response => {
      if (response.data.success) {
        // GET HOW MANY LIKES
        setLikes(response.data.likes.length)
        // AM I ALREADY LIKED?
        response.data.likes.map(like => {
          if (like.userId === props.userId) {
            setLikeAction('liked')
          }
        })
      } else {
        alert(`ErrorCode : ${tag} LIKE `)
      }
    })

    Axios.post('/api/like/getDislikes',variable)
    .then(response => {
      if (response.data.success) {
        // GET HOW MANY DISLIKES
        setDislikes(response.data.dislikes.length)
        // AM I ALREADY DISLIKED?
        response.data.dislikes.map(dislike => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked')
          }
        })
      } else {
        alert(`ErrorCode : ${tag} DISLIKE`)
      }
    })

  }, [])
  

  return (
    <div>
      <span key={"comment-basic-like"}>
        <Tooltip title="Like">
          {LikeAction === 'liked' ? <LikeOutlined /> : <LikeFilled />}
          {/* <LikeOutlined /> */}
        </Tooltip>
      <span style={{paddingLeft:'8px', cursor:'auto'}}> {Likes} </span>
      </span>
      <span key={"comment-basic-dislike"}>
        <Tooltip title="Dislike">
          <DislikeOutlined  />
        </Tooltip>
      <span style={{paddingLeft:'8px', cursor:'auto'}}> {Dislikes} </span>
      </span>
    </div>
  )
}

export default LikeDislikes