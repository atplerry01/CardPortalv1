import axios from 'axios';
import { authHeader, config } from '../../utils';

export const debitCardService = {
    getDebitCards,
    getDirectDebitUploads,
    getDirectDebitUploadDetails,
    postDirectDebitUpload,
    resheduleDirectDebitUpload,
    cancelDirectDebitUpload
};

function getDebitCards() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/debitCards', requestOptions).then(handleResponse, handleError);
}

async function getDirectDebitUploads() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/CreditCard/DirectDebit/GetUploads`, requestOptions)
        .then(resp => {
            return {
                success: true,
                data: resp.data
            }
        }).catch(error => {
            return {
                success: false,
                data: error.message,
            };
        });
}

async function getDirectDebitUploadDetails(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/CreditCard/DirectDebit/GetUploadDetails?ID=${id}`, requestOptions)
        .then(resp => {
            return {
                success: true,
                data: resp.data
            }
        }).catch(error => {
            return {
                success: false,
                data: error.message,
            };
        });
}


async function postDirectDebitUpload(model) {
    const url = `${config.apiUrl}/api/CreditCard/DirectDebit/DebitAdviceUpload`;

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return axios.post(url, model, requestOptions)
        .then(resp => {
            return {
                success: true,
                data: resp.data
            }
        }).catch(function (error) {
            return {
                success: false,
                data: error.message,
            };
        });
}

async function resheduleDirectDebitUpload(model) {
    const url = `${config.apiUrl}/api/CreditCard/DirectDebit/RescheduleDebitAdviceUpload`;

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return axios.post(url, model, requestOptions)
        .then(resp => {
            return {
                success: true,
                data: resp.data
            }
        }).catch(function (error) {

            return {
                success: false,
                data: error.response.data
            };
        });
}

async function cancelDirectDebitUpload(model) {
    const url = `${config.apiUrl}/api/CreditCard/DirectDebit/CancelDebitAdviceUpload`;

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return axios.post(url, model, requestOptions)
        .then(resp => {
            return {
                success: true,
                data: resp.data
            }
        }).catch(function (error) {
            return {
                success: false,
                data: error.message,
            };
        });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}