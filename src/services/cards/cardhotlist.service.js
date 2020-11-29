import axios from "axios";
import { authHeader, config } from '../../utils';

export const cardHotlistService = {
  SubmitCardHotlist
};

async function SubmitCardHotlist(data) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return await axios.post(`${config.apiUrl}/api/CardHotlist/SubmitCardHotlist?appID='CMP'`, data, requestOptions);
}
