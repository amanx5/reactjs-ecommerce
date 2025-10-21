export const ProductHomeCard = function ({ product = {} }) {
	const { id, image, name, rating, priceCents, keywords } = product;
	const { stars: ratingStars = 0, count: ratingCount = 0 } = rating;
	const priceNative = getPriceNative(priceCents, 'USD');

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

			<div className='product-price'>{priceNative}</div>

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

			<button
				className='add-to-cart-button button-primary'
				onClick={addToCartOnClick}
			>
				Add to Cart
			</button>
		</div>
	);
};

export const ProductCartItem = function ({ cartItem = {} }) {
	const { product, quantity, deliveryOptionId, createdAt, updatedAt } =
		cartItem || {};
	const { id, image, name, rating, priceCents, keywords } = product;
	const priceNative = getPriceNative(priceCents, 'USD');

	return (
		<>
			<img className='product-image' src={image} />

			<div className='cart-item-details'>
				<div className='product-name'>{name}</div>
				<div className='product-price'>{priceNative}</div>
				<div className='product-quantity'>
					<span>
						Quantity:{' '}
						<span className='quantity-label'>{quantity}</span>
					</span>
					<span className='update-quantity-link link-primary'>
						Update
					</span>
					<span className='delete-quantity-link link-primary'>
						Delete
					</span>
				</div>
			</div>
		</>
	);
};


function getPriceNative(price, currency) {
	return (price / 100).toFixed(2);
}

function addToCartOnClick() {}
