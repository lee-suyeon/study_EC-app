import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage({ detail }) {
  const [ images, setImages ] = useState([]);
  
  useEffect(() => {
    if(detail.images && detail.images.length > 0){
      let arr = [];
      detail.images.map(item => {
        arr.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`
        })
      })
      setImages(arr);
    }
  }, [detail]);

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  )
}

export default ProductImage
