export default function AddToCart() {
	return (
		<button
			className='add-to-cart-button button-primary'
			onClick={addToCartOnClick}
		>
			Add to Cart
		</button>
	);

	function addToCartOnClick() {}
}
