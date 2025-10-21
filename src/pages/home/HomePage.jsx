import './HomePage.css';
import Header from '../../components/Header.jsx';
import Product from './Product.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setData();
	}, []);

	async function setData() {
		const response = await axios.get('http://localhost:3000/api/products');
		const data = response.data;
		if (data?.length) {
			setProducts(data);
		}
	}

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/home.png' />
			<title>Ecommerce</title>
			<Header />
			<div className='home-page'>
				<div className='products-grid'>
					{products.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</div>
			</div>
		</>
	);
}
