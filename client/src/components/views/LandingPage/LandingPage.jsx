import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
	const [ products, setProducts ] = useState([]);
	const [ skip, setSkip ] = useState(0);
	const [ limit, setLimit ] = useState(8);
	const [ postSize, setPostSize ] = useState(0);

	useEffect(() => {
		// 초기 랜딩시 상품 8개만 가져온다
		let body = {
			skip: skip,
			limit: limit,
		}
		getProducts(body);
	}, []);

	const getProducts = (body) => {
		axios.post('/api/product/products', body)
			.then(response => {
				if(response.data.success) {
					if(body.loadMore) { // 더보기 버튼을 눌렀을 때
						setProducts( [...products, ...response.data.productInfo ]);
					} else {
						setProducts(response.data.productInfo);
					}
					setPostSize(response.data.postSize);
				} else {
					alert('상품을 가져오는데 실패했습니다.');
				}
		});
	} 

	const loadMoreHandler = () => {
		let more = skip + limit;

		let body = {
			skip: more,
			limit: limit,
			loadMore: true,
		}
		getProducts(body);
		setSkip(more);
	}


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

			<Row gutter={[16, 16]}>
				{renderCards}
			</Row>

			{postSize >= limit &&
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button onClick={loadMoreHandler}>더 보기</button>
				</div>
			}
		</div>
	)
}

export default LandingPage
