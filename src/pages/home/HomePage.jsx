import './HomePage.css';
import Header from '../../components/Header.jsx';
import {HomeProduct} from '@/components/Product.jsx';
import { useEffect, useState } from 'react';
import { setStateFromAPIResponse } from '@/utils';

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const api = '/api/products';
		setStateFromAPIResponse(api, setProducts);	
	}, []);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/home.png' />
			<title>Ecommerce</title>
			<Header/>
			<div className='home-page'>
				<div className='products-grid'>
					{products.map((product) => (
						<HomeProduct key={product.id} product={product} />
					))}
				</div>
			</div>
		</>
	);
}
