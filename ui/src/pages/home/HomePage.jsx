import './HomePage.css';
import { useContext, useEffect, useState } from 'react';
import Header from '@/components/Header.jsx';
import Product from './components/product/Product.jsx';
import { refreshStateViaAPI } from '@/utils';
import AppContext from '@/context/AppContext';
import { useSearchParams } from 'react-router';
import Loader from '@/components/Loader';

export default function HomePage() {
	const [urlSearchParams] = useSearchParams();
	const productSearch = urlSearchParams.get('product');
	const { setError } = useContext(AppContext);
	const [products, setProducts] = useState(null);
	const isProductsLoading = products === null;
	const isProductsAvailable = Array.isArray(products) && products.length > 0;
	const noProductsFoundText = productSearch
		? `No products found with name similar to "${productSearch}"`
		: 'No products found';

	useEffect(() => {
		const url =
			'/api/products' + (productSearch ? '?search=' + productSearch : '');

		refreshStateViaAPI(url, setProducts, setError);
	}, [setError, productSearch]);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/home.png' />
			<title>Ecommerce</title>

			<Header />

			<div className='home-page'>
				{isProductsLoading ? (
					<Loader />
				) : isProductsAvailable ? (
					<div className='products-grid'>
						{products.map((product) => (
							<Product key={product.id} product={product} />
						))}
					</div>
				) : (
					noProductsFoundText
				)}
			</div>
		</>
	);
}
