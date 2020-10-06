import React, { useState } from 'react'
import FileUpload from '../../utils/FileUpload';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  {key:1, value: "Africa"},
  {key:2, value: "Europe"},
  {key:3, value: "Asia"},
  {key:4, value: "North America"},
  {key:5, value: "South America"},
  {key:6, value: "Australia"},
  {key:7, value: "Antarctica"},
]

function UploadProductPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);
  const [images, setImages] = useState([]);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  const descChangeHandler = (e) => {
    setDescription(e.target.value);
  }
  
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  }

  const continentChangeHandler = (e) => {
    setContinent(e.target.value);
  }

  const updateImages = (newImages) => {
    setImages(newImages);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    if(!title || !description || !price || !continent || !images){
      return alert("모든 값을 넣어주셔야 합니다.")
    }

    // 서버에 입력 data를 request로 보낸다. 
    const body = {
      writer: props.user.userData._id, // 로그인된 유저의 id
      title: title ,
      description: description,
      price: price,
      images: images,
      continent: continent,
    }

    axios.post('/api/product', body)
      .then(response => {
        if(response.data.success){
          alert("상품 업로드에 성공했습니다.");
          props.history.push('/');
        } else {
          alert("상품 업로드에 실패했습니다.");
        }
      });
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', margionBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form onSubmit={submitHandler}>
        {/* dropzone */}
        <FileUpload updateImages={updateImages}/>

        <br /><br />

        <label>이름</label>
        <Input 
          onChange={titleChangeHandler}
          value={title}
        />

        <br /><br />

        <label>설명</label>
        <Input 
          onChange={descChangeHandler}
          value={description}
        />

        <br /><br />

        <label>가격($)</label>
        <Input
          type='number'
          onChange={priceChangeHandler}
          value={price}
        />

        <br /><br />

        <select 
          onChange={continentChangeHandler}
          value={continent}  
        >
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select>

        <br /><br />

        <button type="submit">확인</button>
      </Form>

    </div>
  )
}

export default UploadProductPage
