import SearchIcon from '@/assets/icons/search-icon.png';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function SearchBar() {
	const [urlSearchParams] = useSearchParams();
	const productSearch = urlSearchParams.get('product');
	const [searchValue, setSearchValue] = useState(productSearch || '');
	const navigate = useNavigate();

	return (
		<>
			<input
				className='search-bar'
				type='text'
				placeholder='Search'
				value={searchValue}
				onChange={searchInputOnChange}
				onKeyDown={searchInputOnKeyDown}
			/>

			<button className='search-button' onClick={searchButtonOnClick}>
				<img className='search-icon' src={SearchIcon} />
			</button>
		</>
	);

	function searchInputOnChange(event: ChangeEvent<HTMLInputElement>) {
		const newSearchValue = String(event.target.value);

		if (newSearchValue.length > 20) {
			alert('Please enter product name within 20 characters');
		} else {
			setSearchValue(newSearchValue);
		}
	}

	function searchInputOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key == 'Enter') {
			navigateToSearchProduct();
		} else if (event.key == 'Escape') {
			setSearchValue('');
		}
	}

	function searchButtonOnClick() {
		navigateToSearchProduct();
	}

	function navigateToSearchProduct() {
		const url = searchValue ? `/?product=${searchValue}` : '/';
		navigate(url);
	}
}
