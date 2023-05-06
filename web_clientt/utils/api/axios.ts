import axios from "axios";

export const ARGUN = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

// // Add a response interceptor
// function successInterceptor(response) {
//   return {
//     ok: true,
//     status: response.status,
//     extras: response.headers,
//     data: response.data,
//   };
// }

// function errorInterceptor(error) {
//   return Promise.resolve({
//     ok: false,
//     status: error.response.status || -1,
//     extras: error.response.headers,
//     error: error.message.toString(),
//   });
// }

// function getAxiosClient(baseURL, headers = {}, timeout = defaultTimeout) {
//   let instance = axios.create({
//     baseURL,
//     timeout,
//     headers: { ...defaultHeaders, ...headers },
//   });
//   instance.interceptors.response.use(successInterceptor, errorInterceptor);
//   return instance;
// }

module.exports = {
  ARGUN,
};
