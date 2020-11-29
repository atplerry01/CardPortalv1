import axios from "axios";
import { authHeader, config } from './../utils';

export const branchService = {
    getAll
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
      };

    return axios
        .get(config.apiUrl + `/branches`, requestOptions)
        .then(resp => {
            return {
                success: true,
                data: resp.data,
            };
        })
        .catch(error => {
            return {
                success: false,
                data: error.message,
            };
        });
}