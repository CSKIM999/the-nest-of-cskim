import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Typography, Button, Form, message, Input } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import * as Axios from 'axios'; //for error "Axios.post is not a funtion ""
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  {value : 0, label : "Private"},
  {value : 1, label : "Public"}
]

const CategoryOptions = [
  { value : 0 , label : "Film & Animation"},
  { value : 1 , label : "Auto & Vehicles"},
  { value : 2 , label : "Music"},
  { value : 3 , label : "Pets & Animals"}
]


function VideoUploadPage() {
  const navigate = useNavigate()
  // useSelector 를 통해 Redux 의 state 에 접근, state 의 user를 가져온다.
  const user = useSelector(state => state.user)
  // 정보들을 state 에 저장
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState("Film & Animation")
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [ThumbnailPath, setThumbnailPath] = useState("")

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value)
  }
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value)
  }

  const onDrop = (files) => {
    let formData = new FormData;
    const config = {
      header : {'content-type' : 'miltipart/form-data'}
    }

    formData.append('file', files[0])
    Axios.post('/api/video/uploadfiles', formData, config)
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          
          let variable ={
            url : response.data.url,
            fileName : response.data.fileName
          }

          setFilePath(response.data.url)

          Axios.post('/api/video/thumbnail', variable)
            .then( response => {
              if (response.data.success) {
                setDuration(response.data.fileDuration)
                setThumbnailPath(response.data.url)
                console.log(response.data.url)
              } else {
                alert('Thumbnail Create Failed')
              }
            })

          
        } else {
          alert('비디오 업로드 실패')
          console.log(response)
        }
      })
  }
  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    }
    Axios.post('/api/video/uploadVideo', variable)
      .then(response => {
        if (response.data.success) {

          message.success('upload successfuly')
          setTimeout(() => {
            navigate('/')
          },1000)

        } else {
          alert('비디오 업로드에 실패했습니다.')
        }
      })
  }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
      <div style={{textAlign:'center',marginBottom:'2rem'}}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{display : 'flex' , justifyContent: 'space-between'}}>
          {/* dropzone */}
          <Dropzone 
          onDrop = {onDrop}
          multiple={false}
          maxSize = {100000000}
          >
            {({ getRootProps, getInputProps }) => (
            <div style={{width : '300px', height:'240px', border:'1px solid lightgray', display:'flex',
            alignItems: 'center', justifyContent:'center'}} {...getRootProps()}>
              <input {...getInputProps()} />
              <PlusOutlined />
            </div>
          )}
          </Dropzone>

          {/* thumnail */}
          {/* 앞에 ThumbnailPatah && 을 붙여서 유사 If문을 구현 */}
          {ThumbnailPath && 
          
            <div>
              {/* ThumbnailPath state 사용하기 */}
              <img  src={`http://localhost:5000/${ThumbnailPath}`} alt='thumbnail'/>
            </div>
          }


        </div>

        <br /><br />

        <label>Title</label>
        <Input 
        onChange = {onTitleChange}
        value = {VideoTitle}
        />

        <br /><br />

        <label>Description</label>
        <TextArea 
        onChange = {onDescriptionChange}
        value={Description}
        />

        <br /><br />

        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item,index) => (
            <option key = {index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br /><br />

        <select onChange = {onCategoryChange}>
          {CategoryOptions.map((item,index) => (
              <option key = {index} value={item.value}>{item.label}</option>
            ))}
        </select>

        <br /><br />

        <Button type='primary' size='large' onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage