import axios from 'axios';
import { authHeader, config } from "../../utils";

export const roleService = {
    getRolePackages,
    getRolePackageDetail,
    getModuleRoles,
    addPackageRole,
    removePackageRole,

    getFinacleRoles,
    getFinacleRoleMapping,
    linkFinacleRoleToPackage,

    createRolePackage,
};

// Create

async function createRolePackage(model) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return await axios.post(`${config.apiUrl}/api/UserRole/CreateRolePackage`, model, requestOptions)
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

// RoleManager

async function getRolePackages() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/UserRole/GetRolePackages`, requestOptions)
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

async function getRolePackageDetail(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/UserRole/GetRolePackageDetail?Id=${id}`, requestOptions)
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

async function addPackageRole(model) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    
    return await axios.post(`${config.apiUrl}/api/UserRole/AddPackageRole`, model, requestOptions)
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

async function removePackageRole(model) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    
    return await axios.post(`${config.apiUrl}/api/UserRole/RemovePackageRole`, model, requestOptions)
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

async function getModuleRoles() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/UserRole/GetModuleRoles`, requestOptions)
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
// FinacleManager

async function getFinacleRoles() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/UserRole/GetFinacleRoles`, requestOptions)
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

async function getFinacleRoleMapping() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await axios.get(`${config.apiUrl}/api/UserRole/GetFinacleRoleMapping`, requestOptions)
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

async function linkFinacleRoleToPackage(model) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return await axios.post(`${config.apiUrl}/api/UserRole/LinkFinacleRoleToPackage`, model, requestOptions)
        .then(resp => {
            
            return {
                success: true,
                data: resp.data
            }
        }).catch(error => {
            return {
                success: false,
                data: error.response.data.message,
            };
        });
}
