import axios from "axios";
import { authHeader, config } from '../../utils';

export const issuanceService = {
  instanceQueryService,
  instanceHotListQueryService,
  linkedAccountQueryService,
  postDebitCard
};

async function instanceQueryService(accountNumber, appId = 'CMP') {

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/api/Main/GetAccountDetails?acctnum=${accountNumber}&appID=${appId}`, requestOptions)
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

async function instanceHotListQueryService(accountNumber, appId = 'CMP') {
  
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  if (accountNumber && accountNumber.length === 10) {
    return await axios.get(`${config.apiUrl}/api/CardSearch/GetCardsbyAccount?acctnum=${accountNumber}&appID=${appId}`, requestOptions)
      .then(resp => {
        return {
          success: true,
          data: resp.data
        }
      });
  } else {
    return await axios.get(`${config.apiUrl}/api/CardSearch/GetCardsbyPan?clearpan=${accountNumber}&appID=${appId}`, requestOptions)
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
}

async function linkedAccountQueryService(accountNumber) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/linkedAccounts`, requestOptions)
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

async function postDebitCard() {
  const data = {};
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  const response = await axios.post(`${config.apiUrl}/linkedAccounts`, data, requestOptions)
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
  const startProcess = response.data;

  return startProcess.id;
}
