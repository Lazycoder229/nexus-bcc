import api from "./axios";

let isRefreshing;
false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
};
//Request interceptor

api.interceptors.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

//Respone interceptor token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(Promise.reject);
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const { data } = await api.post("/auth/refresh-token");
        processQueue(null, data.accessToken);
        isRefreshing = false;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
