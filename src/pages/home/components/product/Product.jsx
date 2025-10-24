import { useState } from 'react';
import { getPriceNative } from '@/utils';
import AddToCart from './AddToCart';
import QuantitySelector from './QuantitySelector';


export default function Product({ product }) {
    const [quantity, setQuantity] = useState(1);

	const { id, image, name, rating={}, priceCents, keywords } = product;
	const { stars: ratingStars = 0, count: ratingCount = 0 } = rating;

	return (
		<div className='product-container'>
			<div className='product-image-container'>
				<img className='product-image' src={image} />
			</div>

			<div className='product-name limit-text-to-2-lines'>{name}</div>

			<div className='product-rating-container'>
				<img
					className='product-rating-stars'
					src={`images/ratings/rating-${ratingStars * 10}.png`}
				/>
				<div className='product-rating-count link-primary'>
					{ratingCount}
				</div>
			</div>

			<div className='product-price'>{getPriceNative(priceCents)}</div>

            <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>

			<div className='product-spacer'></div>

			<AddToCart product={product} quantity={quantity}/>
		</div>
	);
}

