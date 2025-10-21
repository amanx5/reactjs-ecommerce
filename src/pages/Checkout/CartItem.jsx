import {ProductCartItem} from "../../components/Product";

export default function CartItem({cartItem}) {

    const {id, productId, product, quantity, deliveryOptionId, createdAt, updatedAt} = cartItem;
	
    return (
		<div className='cart-item-container'>
			<div className='delivery-date'>
				Delivery date: Wednesday, June 15
			</div>

			<div className='cart-item-details-grid'>
				<ProductCartItem cartItem={cartItem}/>

				<div className='delivery-options'>
					<div className='delivery-options-title'>
						Choose a delivery option:
					</div>

					<div className='delivery-option'>
						<input
							type='radio'
							className='delivery-option-input'
							name='delivery-option-2'
						/>
						<div>
							<div className='delivery-option-date'>
								Tuesday, June 21
							</div>
							<div className='delivery-option-price'>
								FREE Shipping
							</div>
						</div>
					</div>
					<div className='delivery-option'>
						<input
							type='radio'
							defaultChecked
							className='delivery-option-input'
							name='delivery-option-2'
						/>
						<div>
							<div className='delivery-option-date'>
								Wednesday, June 15
							</div>
							<div className='delivery-option-price'>
								$4.99 - Shipping
							</div>
						</div>
					</div>
					<div className='delivery-option'>
						<input
							type='radio'
							className='delivery-option-input'
							name='delivery-option-2'
						/>
						<div>
							<div className='delivery-option-date'>
								Monday, June 13
							</div>
							<div className='delivery-option-price'>
								$9.99 - Shipping
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
