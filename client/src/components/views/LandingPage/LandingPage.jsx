import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
	const [ products, setProducts ] = useState([]);

	useEffect(() => {

		axios.post('/api/product/products')
			.then(response => {
				if(response.data.success) {
					setProducts(response.data.productInfo);
				} else {
					alert('상품을 가져오는데 실패했습니다.');
				}
			})
	}, [])
 //<img src={`http://localhost:5000/${prod.images[0]}`} />
	

	const renderCards = products.map((prod, index) => {
		return (
			<Col lg={6} md={8} xs={24} key={`prod.${index}`}>
				<Card
					cover={<ImageSlider images={prod.images}/>}
				>
					<Card.Meta 
						title={prod.title}
						description={`$${prod.price}`}
					/>
				</Card>
			</Col>
		)
	})

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			
			<div style={{ textAlign: 'center' }}>
				<h2>Let's Travel Anywhere<Icon type="rocket" /></h2>
			</div>

			{/* Filter */}

			{/* Search */}

			{/* Cards */}

			<Row gutter={16, 16}>
				{renderCards}
			</Row>



			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button>더 보기</button>
			</div>
		</div>
	)
}

export default LandingPage
