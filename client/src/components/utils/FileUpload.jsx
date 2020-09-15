import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload({ updateImages }) {
  const [ images, setImages ] = useState([]);

  const dropHandler = (files) => {
    
    // 이미지 파일을 보낼 때 
    let formData = new FormData();

    const config = {
      header: {'content-type' : 'multipart/form-data'}
    }
    formData.append("file", files[0]);

    axios.post('/api/product/image', formData, config)
      .then(response => {
        if(response.data.success){
          // console.log(response.data);
          setImages([ ...images, response.data.filePath ]);
          updateImages([ ...images, response.data.filePath ]);
        } else {
          alert('파일을 저장하는데 실패했습니다');
        }
      })
  }

  const onClickDelete = (image) => {
    const currentIndex = images.indexOf(image);

    let newImages = [ ...images ]
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    updateImages(newImages);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div 
              style={{
                width: '300px', height: '240px', border: '1px solid lightgray',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem'}} />
            </div>
          </section>
        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'auto', overflowY: 'hidden' }}>
        {images.map((image, index) => (
          <div 
            key={index}
            onClick={() => onClickDelete(image)}  
          >
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }} 
              src={`http://localhost:5000/${image}`}
            />
          
          </div>
        ))}
      </div>

    </div>
  )
}

export default FileUpload
