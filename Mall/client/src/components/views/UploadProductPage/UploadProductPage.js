import React, {useState} from 'react'
import {Typography, Button, Form, Input, Select } from 'antd'
import FileUpload from '../../utils/FileUpload'
const {Title} = Typography
const {TextArea} = Input
const {Option} = Select

const Continents = [
  {key : 1, value : "Africa"},
  {key : 2, value : "Europe"},
  {key : 3, value : "Asia"},
  {key : 4, value : "North America"},
  {key : 5, value : "South America"},
  {key : 6, value : "Australia"},
  {key : 7, value : "Antarctica"}
]

function UploadProductPage() {
  const [TitleName, setTitleName] = useState("")
  const [Description, setDescription] = useState("")
  const [Price, setPrice] = useState(0)
  const [Continent, setContinent] = useState(1)
  const [Images, setImages] = useState([])

  const titleChangeHandeler = (event) => {
    setTitleName(event.currentTarget.value)
  }
  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value)
  }
  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value)
  }
  const continentChangeHandler = (event) => {
    setContinent(event)
  }

  return (
    
    
    
    
    <div style={{ maxWidth : '700px' , margin : '2rem auto'}}>
      <div style={{ textAlign : 'center' , marginBottom : '2rem'}}>
        <Title level={2}>여행상품 업로드</Title>
      </div>
      <Form>
        <FileUpload />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandeler} value={TitleName} placeholder={"이름을 입력해주세요"}/>
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} placeholder={"상세정보를 입력해주세요"}/>
        <br />
        <br />
        <label>가격($)</label>
        <Input onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <Select value={Continent} style={{ width: 120 }} onChange={continentChangeHandler}>
          {Continents.map( item => (
            <Option key={item.key} value={item.key}>{item.value}</Option>
          ))}
        </Select>
        <br />
        <br />
        <Button>
          확인
        </Button>
      </Form>
    </div>
  )
}

export default UploadProductPage