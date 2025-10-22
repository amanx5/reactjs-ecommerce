import './HomePage.css';
import Header from '../../components/Header.jsx';
import {ProductHomeCard} from '../../components/Product.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		const response = await axios.get('/api/products');
		const data = response.data;
		if (data?.length) {
			setProducts(data);
		}
	}



	return (
		<>
			<link rel='icon' type='image/png' href='favicon/home.png' />
			<title>Ecommerce</title>
			<Header/>
			<div className='home-page'>
				<div className='products-grid'>
					{products.map((product) => (
						<ProductHomeCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</>
	);
}
