import './HomePage.css';
import { useContext, useEffect, useState } from 'react';
import Header from '@/components/Header.jsx';
import Product from './components/product/Product.jsx';
import { refreshStateViaAPI } from '@/utils';
import AppContext from '@/context/AppContext';

export default function HomePage() {
	const { setError} = useContext(AppContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		refreshStateViaAPI('products', setProducts, setError);
	}, [setError]);

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
