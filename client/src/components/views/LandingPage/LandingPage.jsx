import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas';

function LandingPage() {
	const [ products, setProducts ] = useState([]);
	const [ skip, setSkip ] = useState(0);
	const [ limit, setLimit ] = useState(8);
	const [ postSize, setPostSize ] = useState(0);
	const [ filters, setFilters ] = useState({
		continent: [],
		price: [],
	})
	const [ searchTerm, setSearchTerm ] = useState("");

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
					cover={<Link to={`/product/${prod._id}`}><ImageSlider images={prod.images}/></Link>}
				>
					<Card.Meta 
						title={prod.title}
						description={`$${prod.price}`}
					/>
				</Card>
			</Col>
		)
	})

	const showFilteredResults = (filter) => {
		let body = {
			skip: 0,
			limit: limit,
			filter: filter
		}
		getProducts(body);
		setSkip(0);
	}

	const handlePrice = (value) => {
		const data = price;
		let array = [];

		for(let key in data) {
			if(data[key]._id === parseInt(value, 10)){
				array = data[key].array;
			}
		}
		return array;
	}

	// filters : 체크된 나라들이 담긴 array (CheckBox에서 전달됨)
	const handlerFilters = (filter, category) => {
		const newFilters = { ...filters }

		// filters state의 continents 또는 price
		newFilters[category] = filter;

		if(category === 'price'){
		newFilters[category] = filter;
			let priceValues = handlePrice(filter);
			newFilters[category] = priceValues; // [0, 199]
		}
		showFilteredResults(newFilters);
		setFilters(newFilters);
	}

	const updateSearchTerm = (term) => {
		let body = {
			skip: 0,
			limit: limit,
			filter: filters,
			searchTerm: term,
		}
		
		setSkip(0);
		setSearchTerm(term);
		getProducts(body);
	}

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			
			<div style={{ textAlign: 'center' }}>
				<h2>Let's Travel Anywhere<Icon type="rocket" /></h2>
			</div>

			{/* Filter */}

			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					{/* CheckBox */}
					<CheckBox 
						list={continents}
						handleFilters={filter => handlerFilters(filter, "continent")}
					/>
				</Col>
				<Col lg={12} xs={24}>
					{/* RadioBox */}
					<RadioBox 
						list={price}
						handleFilters={filter => handlerFilters(filter, "price")}
					/>
				</Col>
			</Row>


			{/* Search */}
			<div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
				<SearchFeature 
					updateSearchTerm={updateSearchTerm}
				/>
			</div>
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
