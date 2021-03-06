import { message } from "antd";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";
import { DEFAULT_ERROR_MESSAGE } from "../common/constants";

export const client = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

client.interceptors.request.use(
  async (req) => {
    req.headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
    };
    return req;
  },
  error => {
    return Promise.reject(error)
  }
);

client.interceptors.response.use(
  (res) => {
    if (!res.data.result) {
      message.error(res.data.message ?? DEFAULT_ERROR_MESSAGE);
      return null;
    }
    return res.data;
  }, (error) => {
    console.error(error);
    message.error(DEFAULT_ERROR_MESSAGE);
    return Promise.reject(error);
  }
);

export default client;