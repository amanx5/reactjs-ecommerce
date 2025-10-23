import { getPriceNative } from '@/utils';
import AddToCart from './AddToCart';

export default function Product({ product }) {
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

			<div className='product-quantity-container'>
				<select>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
					<option value='6'>6</option>
					<option value='7'>7</option>
					<option value='8'>8</option>
					<option value='9'>9</option>
					<option value='10'>10</option>
				</select>
			</div>

			<div className='product-spacer'></div>

			<div className='added-to-cart'>
				<img src='images/icons/checkmark.png' />
				Added
			</div>
			<AddToCart />
		</div>
	);
}