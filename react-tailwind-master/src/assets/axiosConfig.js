import axios from "axios";
// Axios interceptor to attach the access token to every request
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, handle token refresh or re-authentication
    }
    return Promise.reject(error);
  }
);
