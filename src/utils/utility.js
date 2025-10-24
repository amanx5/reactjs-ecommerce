import axios from 'axios';

export const setStateFromAPIResponse = async function (api, setter) {
	if (api && setter) {
		try {
			const response = await axios.get(api);
			console.log(api, ' => ', response.data);
			const data = response.data;

			if (data) {
				setter(data);
			}
		} catch (error) {
			console.error(error);
		}
	}
};

export const addNewCartItem = async function (data) {
	const result = await apiRequest('cart-items', data, 'post');

	if (result.success) {
		return true;
	}
};

export const apiRequest = async function (api, data, method = 'get') {
	const url = '/api/' + api;
	const result = { data: null, error: null, success: false };

	try {
		let response;
		if (method === 'delete') {
			response = await axios.delete(url);
		} else if (method === 'put') {
			response = await axios.put(url, data);
		} else if (method === 'post') {
			response = await axios.post(url, data);
		} else {
			response = await axios.get(url);
		}

		result.data = response.data;
		result.success = true;
	} catch (error) {
		console.error(error);
		result.error = error;
	}

	return result;
}
