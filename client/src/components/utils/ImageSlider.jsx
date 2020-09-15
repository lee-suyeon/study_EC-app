import React from 'react';
import { Carousel } from 'antd';

function ImageSlider({ images }) {
  return (
    <div>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img style={{ width: '100%', height: '150px' }} src={`http://localhost:5000/${image}`} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
