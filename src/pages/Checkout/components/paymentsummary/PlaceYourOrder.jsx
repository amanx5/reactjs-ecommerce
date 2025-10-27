import AppContext from "@/context/AppContext";
import { placeOrder, refreshStateViaAPI } from "@/utils";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function PlaceYourOrder() {
    const navigate = useNavigate();
    const { setCart, setError } = useContext(AppContext);

    return (
        <button className='place-order-button button-primary' onClick={placeOrderOnClick}>
			Place your order
		</button>
    );

    async function placeOrderOnClick(event) {
        const isOrderPlaced = await placeOrder();
        if (isOrderPlaced) {
            refreshStateViaAPI('cart-items?expand=product', setCart, setError);
            navigate('/orders');
        }
    }
}
