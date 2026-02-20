import {
	addNewCartItem,
	deleteCartItem,
	getPriceNative,
	refreshStateViaAPI,
} from '@/utils';
import { useContext, useState } from 'react';
import CartItemContext from '@/context/CartItemContext';
import AppContext from '@/context/AppContext';
import CheckoutContext from '@/context/CheckoutContext';

export default function Product() {
	const { setCart, setError, APP_CONSTANTS } = useContext(AppContext);
	const {
		QUANTITY_ADD_MIN_LIMIT_PER_REQUEST,
		QUANTITY_ADD_MAX_LIMIT_PER_REQUEST,
	} = APP_CONSTANTS;
	const { setPaymentSummary } = useContext(CheckoutContext);
	const { cartItem } = useContext(CartItemContext);
	const { product, quantity, deliveryOptionId, createdAt, updatedAt } =
		cartItem;
	const { id, image, name, rating, priceCents, keywords } = product;
	const stock = 100; // TODO: return from BE as per product availability
	const [updateQuantity, setUpdateQuantity] = useState(1);
	const [enableUpdateQuantity, setEnableUpdateQuantity] = useState(false);
	const price = getPriceNative(priceCents);
	const priceTotal = getPriceNative(priceCents * quantity);
	const priceTotalText = quantity > 1 ? `(Total: ${priceTotal})` : '';

	return (
		<>
			<img className='product-image' src={image} />

			<div className='cart-item-details'>
				<div className='product-name'>{name}</div>
				<div className='product-price'>
					<span className='one'>{price}</span>
					<span className='total'>{priceTotalText}</span>
				</div>
				<div className='product-quantity'>
					<span>
						{'Quantity: ' + quantity}
						<input
							style={{
								display: enableUpdateQuantity
									? 'inline'
									: 'none',
							}}
							className='add-quantity-input'
							type='number'
							value={updateQuantity}
							onChange={updateQuantityInputOnChange}
							onKeyDown={updateQuantityInputOnKeyDown}
						/>
					</span>
					<span
						className='update-quantity-link link-primary'
						onClick={updateQuantityOnClick}
					>
						{enableUpdateQuantity ? 'Save' : 'Update'}
					</span>
					<span
						className='delete-quantity-link link-primary'
						onClick={deleteLinkOnClick}
					>
						Delete
					</span>
				</div>
			</div>
		</>
	);

	async function deleteLinkOnClick() {
		removeProduct();
	}

	async function updateQuantityInputOnChange(event) {
		const updateQuantityNew = event.target.value;
		const updateQuantityNewInt = parseInt(event.target.value);

		if (updateQuantityNew != '') {
			if (isNaN(updateQuantityNewInt)) {
				alert(
					`Please select a valid quantity between ${QUANTITY_ADD_MIN_LIMIT_PER_REQUEST} and ${QUANTITY_ADD_MAX_LIMIT_PER_REQUEST}`,
				);
				return;
			} else if (
				updateQuantityNewInt < QUANTITY_ADD_MIN_LIMIT_PER_REQUEST
			) {
				alert(
					'Please select quantity greater than or equal to ' +
						QUANTITY_ADD_MIN_LIMIT_PER_REQUEST,
				);
				return;
			} else if (updateQuantityNewInt > stock) {
				alert(
					'Maximum quantity available for this product is ' + stock,
				);
				return;
			} else if (
				updateQuantityNewInt > QUANTITY_ADD_MAX_LIMIT_PER_REQUEST
			) {
				alert(
					'Please select quantity less than or equal to ' +
						QUANTITY_ADD_MAX_LIMIT_PER_REQUEST,
				);
				return;
			}
		}

		setUpdateQuantity(updateQuantityNewInt);
	}

	function updateQuantityInputOnKeyDown(event) {
		if (event.key == 'Escape') {
			setEnableUpdateQuantity(false);
		} else if (event.key == 'Enter') {
			onConfirmUpdateQuantity();
		}
	}

	function updateQuantityOnClick() {
		onConfirmUpdateQuantity();
	}

	function onConfirmUpdateQuantity() {
		if (enableUpdateQuantity) {
			setEnableUpdateQuantity(false);
			updateQuantity === 0 ? removeProduct() : addProductQuantity();
		} else {
			setEnableUpdateQuantity(true);
		}
	}

	async function addProductQuantity() {
		const data = {
			productId: id,
			quantity: updateQuantity,
		};
		const isAdded = await addNewCartItem(data);
		if (isAdded) {
			const { isCartRefreshed, isPaymentSummaryRefreshed } =
				await refreshCartAndPaymentSummary();
			if (!isCartRefreshed || !isPaymentSummaryRefreshed) {
				// TODO - implement error state: api failure message
				setEnableUpdateQuantity(true);
			} else {
				setUpdateQuantity(1);
			}
		}
	}

	async function removeProduct() {
		const isDeleted = await deleteCartItem(id);
		if (isDeleted) {
			await refreshCartAndPaymentSummary();
		}
	}

	async function refreshCartAndPaymentSummary() {
		const isCartRefreshed = await refreshStateViaAPI(
			'/api/cartItems?expand=product',
			setCart,
			setError,
		);
		const isPaymentSummaryRefreshed = await refreshStateViaAPI(
			'/api/paymentSummary',
			setPaymentSummary,
			setError,
		);

		return { isCartRefreshed, isPaymentSummaryRefreshed };
	}
}
