export default function QuantitySelector({quantity, setQuantity }) {

    return (
			<div className='product-quantity-container'>
				<select value={quantity} onChange={quantitySelectorOnChange}>
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
    )

    function quantitySelectorOnChange(event) {
        if (event.target.value) {
            const newValueStr = event.target.value;
            const newValueNum = parseInt(newValueStr);
            setQuantity(newValueNum);
        }
    }
}