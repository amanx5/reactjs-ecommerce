import axios from 'axios';

/**
 * Makes an HTTP request to the given API endpoint using Axios.
 *
 * @param {string} api - The API endpoint (relative to '/api/'). Required.
 * @param {Object|null} [data=null] - The request payload. Optional for GET and DELETE requests.
 * @param {'get'|'post'|'put'|'delete'} [method='get'] - HTTP method to use.
 * @returns {Promise<{ data: any, error: any, success: boolean }>}
 *          A promise that resolves to an object containing the response data,
 *          an error (if any occurred), and a success flag.
 *
 * @example
 * const { success, data, error } = await apiRequest('cart-items', { productId: 'abc', quantity: 2 }, 'post');
 */
export const apiRequest = async function (api, data, method = 'get') {
	const result = { success: null, data: null, error: null };
	if (!api) {
		console.warn('Request not sent. [api param is missing]');
		return result;
	}

	const url = '/api/' + api;

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
		result.success = false;
	}

	return result;
};

export const setStateFromAPIResponse = async function (api, setter) {
	if (!setter) {
		console.warn('Request not sent. [Setter param is missing]');
		return;
	}

	const { success, data } = await apiRequest(api);
	if (success) {
		setter(data);
	}
};
