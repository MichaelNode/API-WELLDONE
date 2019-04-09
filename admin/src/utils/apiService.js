/**
 * Function for check if a response is success
 * @param response
 * @returns {boolean|*}
 */
export const isSuccessResponse = (response) => {
    return !(response.status >= 400 || response.error);
};

const initialHeaders = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

/**
 * Function for get/post data from external url
 * @param url
 * @param method
 * @param headers
 * @param body
 * @returns {Promise<*>}
 */
export const asyncFetch = async (url, method = 'GET', body = null, headers = initialHeaders) => {
    const options = {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
      
    };

    // add body to the request if exist
    if (body) {
        options.body = body;
    }

    // add headers to the request if exist
    if (headers) {
        options.headers = headers;
    }

    // get data from url
    const response = await fetch(url, options);
 
    return await response.json();
};

