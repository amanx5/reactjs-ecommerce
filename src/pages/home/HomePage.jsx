import './HomePage.css';
import Header from '../../components/Header.jsx';
import Product from './Product.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HomePage() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		fetchProducts();
		fetchCartItems();
	}, []);

	async function fetchProducts() {
		const response = await axios.get('/api/products');
		const data = response.data;
		if (data?.length) {
			setProducts(data);
		}
	}

	async function fetchCartItems() {
		const response = await axios.get('/api/cart-items');
		const data = response.data;
		if (data?.length) {
			setCart(data);
		}
	}

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/home.png' />
			<title>Ecommerce</title>
			<Header cart={cart} />
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
