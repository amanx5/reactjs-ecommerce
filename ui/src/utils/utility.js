import axios from 'axios';

export const APP_CONSTANTS = {
	QUANTITY_ADD_MIN_LIMIT_PER_REQUEST: 0,
	QUANTITY_ADD_MAX_LIMIT_PER_REQUEST: 10,
};

/**
 * Makes an HTTP request to the given API endpoint using Axios.
 *
 * @param {string} url - The API endpoint URL
 * @param {Object|null} [data=null] - The request payload. Optional for GET and DELETE requests.
 * @param {'get'|'post'|'put'|'delete'} [method='get'] - HTTP method to use.
 * @returns {Promise<{ data: any, error: any, success: boolean }>}
 *          A promise that resolves to an object containing the response data,
 *          an error (if any occurred), and a success flag.
 *
 * @example
 * const { success, data, error } = await apiRequest('/api/cartItems', { productId: 'abc', quantity: 2 }, 'post');
 */
export const apiRequest = async function (url, data, method = 'get') {
	let result = { success: null, data: null, error: null };
	if (!url) {
		warnDev('Request not sent. [url param is missing]');
		return result;
	}

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

		result = response.data;
	} catch (error) {
		console.error(error);
		result.error = error;
		result.success = false;
	}

	return result;
};

export const refreshStateViaAPI = async function (
	api,
	dataStateSetter,
	errorStateSeter,
) {
	if (!dataStateSetter || !errorStateSeter) {
		warnDev('Request not sent. [Setter param is missing]');
		return;
	}

	const { success, data, error } = await apiRequest(api);
	if (success) {
		dataStateSetter(data);
		return true;
	} else if (error) {
		// errorStateSeter(error); // TODO: Uncomment
		return false;
	}
};

export const warnDev = async function (msg) {
	if (isDevMode()) {
		console.warn(msg);
	}
};

export const isDevMode = function () {
	return import.meta.env.MODE !== 'production';
};
