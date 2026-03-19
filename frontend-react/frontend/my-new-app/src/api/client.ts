import axios from "axios";

const apiClient = axios.create({
  // ВАЖНО: Для Android-эмулятора используй 10.0.2.2, для реального устройства — свой IP
  baseURL: "http://192.168.1.100:8080/api/v1",
  timeout: 10000,
});

export default apiClient;
