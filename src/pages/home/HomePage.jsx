import './HomePage.css';
import { useEffect, useState } from 'react';
import Header from '@/components/Header.jsx';
import Product from './components/product/Product.jsx';
import { setStateFromAPIResponse } from '@/utils';

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const api = 'products';
		setStateFromAPIResponse(api, setProducts);
	}, []);

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
