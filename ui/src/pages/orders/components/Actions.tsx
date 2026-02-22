import { useNavigate } from 'react-router';
import type { Order } from '@/types';

interface ActionsProps {
	order: Order;
	productId: string;
}

export default function Actions({ order, productId }: ActionsProps) {
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

	function trackPackageOnClick(_event: React.MouseEvent<HTMLButtonElement>) {
		navigate(`/tracking?orderId=${orderId}&productId=${productId}`);
	}
}
