import axios from 'axios';
import { ID_TOKEN } from '../constants/utils';

//Rest calls
export const callApi = ({ url, config }) => {
  return axios({
    url,
    mode: 'cors',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem(ID_TOKEN),
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...config
  })
}

//Auth only
export const authApi = ({ url, config }) => {
  return axios({
    url,
    mode: 'cors',
    headers: {
      'Authorization': 'Basic ' + btoa("authservice:IpDegBarwut8"),
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    ...config
  })
}