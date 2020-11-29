import axios from "axios";
import { authHeader, config } from '../../utils';

export const authService = {
  loginQuery,
  refreshTokenQuery,
  getUserDetails,
  getProfiledUsers,
  assignUserPackage,
  enableUser,
  disableUser,
  deleteUserRole,
  getRolePackages,
  getApplications,
  createUserProfile,
};

// TODO: remove the ALAT HardCode
async function loginQuery(username, password, appId = 'CMP') {

  const body = {
    username,
    password
  }

  return await axios.post(`${config.apiUrl}/api/User/Login?appID=${appId}`, body)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function refreshTokenQuery(refreshtoken) {
  const body = {
    token: refreshtoken
  }

  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/User/TokenRefresh`, body, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    })
    .catch(error => {
      return {
        success: false,
        data: error.message,
      };
    });
}

async function getUserDetails(username) {

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/api/User/GetUserDetails?username=${username}`, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function getProfiledUsers() {

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  // ?username=benedict.okojie&branchcode=999&role=SuperUser
  // return await axios.get(`${config.apiUrl}/api/User/GetUserDetails?username=${username}`, requestOptions)
  return await axios.get(`${config.apiUrl}/api/User/GetUsers`, requestOptions)
    .then(resp => {      
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

// createUserProfile
async function createUserProfile(model) {

  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/User/CreateUser`, model, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function assignUserPackage(username, roleId) {
  const body = {
    userName: username,
    rolePackage: roleId
  }

  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/User/AssignUserPackage`, body, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function deleteUserRole(username, roleId) {
  const body = {
    userName: username,
    rolePackage: roleId
  }

  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/User/DeleteUserRole`, body, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function enableUser(username) {
  const body = {
    username,
  }

  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/User/EnableUser`, body, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function disableUser(username) {
  const body = {
    username,
  }
  
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/User/DisableUser`, body, requestOptions)
    .then(resp => {
      
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function getRolePackages() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/api/User/GetRolePackages`, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}

async function getApplications() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/api/User/GetApplications`, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    }).catch(error => {
      return {
        success: false,
        data: error.response.data
      };
    });
}