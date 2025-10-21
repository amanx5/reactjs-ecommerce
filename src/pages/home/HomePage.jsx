import './HomePage.css';
import Header from '../../components/Header.jsx';
import Product from './Product.jsx';
import { products } from './data/products.js';
export default function HomePage() {

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
