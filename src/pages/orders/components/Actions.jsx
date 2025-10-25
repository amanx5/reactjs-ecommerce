import { useNavigate } from 'react-router';

export default function Actions({ order, productId }) {
	const { id: orderId } = order;
	const navigate = useNavigate();

	return (
		<div className='product-actions'>
			<button
				className='track-package-button button-secondary'
				onClick={trackPackageOnClick}
			>
				Track package
			</button>
		</div>
	);

	function trackPackageOnClick(event) {
		navigate(`/tracking?orderId=${orderId}&productId=${productId}`);
	}
}
