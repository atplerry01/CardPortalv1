import axios from "axios";
import { authHeader, config } from '../../utils';

export const lookupService = {
    getCardProduct,
    getDeliveryBranch,
    getSelectedBranch,
};

async function getCardProduct() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/cardProducts`, requestOptions)
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

async function getDeliveryBranch(appId = 'CMP') {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/Main/GetBranchList?appID=${appId}`, requestOptions)
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

async function getSelectedBranch(appId = 'CMP') {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/Main/GetBranchList?appID=${appId}`, requestOptions)
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