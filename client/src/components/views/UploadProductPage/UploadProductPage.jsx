import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  const descChangeHandler = (e) => {
    setDescription(e.target.value);
  }
  
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  }


  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', margionBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form>

        {/* dropzone */}
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
          onChange={priceChangeHandler}
          value={price}
        />

        <br /><br />

        <select>
          <option></option>
        </select>

        <br /><br />

        <Button>확인</Button>


      </Form>

    </div>
  )
}

export default UploadProductPage
