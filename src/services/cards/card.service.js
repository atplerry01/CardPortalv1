import axios from "axios";
import { authHeader, config } from "../../utils";

export const cardService = {
  getPendingCardRequests,
  getPendingCardRequestDetails,
  authPostCardRequest,
  controlPostCardRequest,
  submitCardRequest,
  getSearchDetail,
  getAuditLog,
  findCardAlternateAccounts,
  validateCreditCardRequest,
  addCardAccount,
  deleteCardAccount,
  validateCreditCardListRequest,
  getCreditCardExemptions,
  addCreditCardExemption,
  removeCreditCardExemption,
};

async function getPendingCardRequests(role, branchId, appId = 'CMP') {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/api/CardRequest/GetPendingCardRequests?role=${role}&branch=${branchId}&appID=${appId}`, requestOptions)
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

async function getPendingCardRequestDetails(cardRef, appId = 'CMP') {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return await axios.get(`${config.apiUrl}/api/CardRequest/GetCardRequestDetails?cardref=${cardRef}&appID=${appId}`, requestOptions)
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

async function submitCardRequest(data, appId = 'CMP') {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/CardRequest/SubmitCardRequest?appID='CMP'`, data, requestOptions)
    .then(resp => {
      return {
        success: true,
        data: resp.data
      }
    })
    .catch(err => {
      if (err.response && err.response.data.message) {
        return {
          success: false,
          data: err.response.data.message
        }
      }
    });
}

async function authPostCardRequest(items, appId = 'CMP') {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/CardRequest/AuthorizeCardRequest??appID=${appId}`, items, requestOptions)
    .then(resp => {
      return {
        success: true
      }
    }).catch(error => {
      return {
        success: false,
      };
    });
}

async function controlPostCardRequest(items, appId = 'CMP') {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/CardRequest/AuthorizeCardRequest?appID=${appId}`, items, requestOptions)
    .then(resp => {
      return {
        success: true
      }
    }).catch(error => {
      return {
        success: false,
      };
    });

}



async function getSearchDetail(hashedPAN) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const res = `${config.apiUrl}/api/CardSearch/GetFullCardDetails?hashedpan=${hashedPAN}`;

  return await axios
    .get(
      `${config.apiUrl}/api/CardSearch/GetFullCardDetails?hashedpan=${hashedPAN}`,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error.message,
      };
    });
}
//getCreditCardExemptions
async function getAuditLog(items) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return await axios
    .post(`${config.apiUrl}/api/Audit/FetchAudit`, items, requestOptions)
    .then((resp) => {
      return {
        data: resp,
        success: true,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message
      };
    });
}

async function findCardAlternateAccounts(
  cardaccount,
  altaccount,
  custname,
  appId = "CMP"
) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return await axios
    .get(
      `${config.apiUrl}/api/CreditCard/Enrollment/FindCardAccounts?cardaccount=${cardaccount}&altaccount=${altaccount}&custname=${custname}`,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message,
      };
    });
}

async function validateCreditCardRequest(cardaccount, altaccount) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return await axios
    .get(
      `${config.apiUrl}/api/CreditCard/Enrollment/ValidateCardAccount?cardaccount=${cardaccount}&altaccount=${altaccount}`,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message,
      };
    });
}

async function validateCreditCardListRequest(body) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return await axios
    .post(
      `${config.apiUrl}/api/CreditCard/Enrollment/ValidateCardAccountList`,
      body,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      const errMsg = error?.response?.data.message;
      return {
        success: false,
        data: errMsg,
      };
    });
}
//addCreditCardExemption
async function addCardAccount(items) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return await axios
    .post(
      `${config.apiUrl}/api/CreditCard/Enrollment/AddCardAccount`,
      items,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message
      };
    });
}

async function deleteCardAccount(items) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return await axios
    .post(
      `${config.apiUrl}/api/CreditCard/Enrollment/DeleteCardAccount`,
      items,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message,
      };
    });
}

//
async function getCreditCardExemptions() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return await axios
    .get(
      `${config.apiUrl}/api/CreditCard/DirectDebit/GetExemptions`,
      requestOptions
    )
    .then((resp) => {
      return {
        data: resp,
        success: true,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message
      };
    });
}

//
async function addCreditCardExemption(items) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return await axios
    .post(
      `${config.apiUrl}/api/CreditCard/DirectDebit/AddExemption`,
      items,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message,
      };
    });
}

async function removeCreditCardExemption(cardaccount) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return await axios
    .post(
      `${config.apiUrl}/api/CreditCard/DirectDebit/RemoveExemption`,
      cardaccount,
      requestOptions
    )
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: error?.response?.data.message,
      };
    });
}
