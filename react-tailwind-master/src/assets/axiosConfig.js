import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

let isRefreshing = false;
let refreshRequestQueue = [];

// Function to refresh the access token
const refreshToken = async () => {
  // Implement logic to request a new access token using the refresh token
  // This will depend on your authentication system
  // For example:
  const response = await axios.post(
    process.env.REACT_APP_API_BASE_URL + "/refresh",
    {
      refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      userid: JSON.parse(localStorage.getItem("userid")),
    }
  );
  return response.data;
};

// Axios request interceptor to check and refresh access token if expired
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!hasAccessToken()) {
      return config;
    }

    if (!hasUserId()) {
      return config;
    }
    if (isAccessTokenExpired()) {
      if (isRefreshing) {
        const retryOriginalRequest = new Promise((resolve) => {
          refreshRequestQueue.push((newAccessToken) => {
            localStorage.setItem("token", newAccessToken);
            resolve(axios(config));
          });
        });
        return retryOriginalRequest;
      }

      isRefreshing = true;
      const newAccessToken = await refreshToken();
      localStorage.setItem("token", JSON.stringify(newAccessToken));

      isRefreshing = false;
      refreshRequestQueue.forEach((resolveOriginalRequest) => {
        resolveOriginalRequest(newAccessToken);
      });
      refreshRequestQueue = [];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Function to check if access token is expired (implement your own logic)
const isAccessTokenExpired = () => {
  // Implement your logic to check if the access token is expired
  // You might compare the token's expiration date with the current time
  // Return true if it's expired, otherwise false

  // Get the current time on the frontend
  const currentTime = new Date().getTime();

  // Calculate the difference in milliseconds
  const timeDifferenceMillis =
    currentTime - JSON.parse(localStorage.getItem("token")).assignedAt;

  // Convert milliseconds to minutes
  const timeDifferenceMinutes = Math.floor(timeDifferenceMillis / (1000 * 60));
  if (timeDifferenceMinutes >= 20) {
    return true;
  }
  return false;
};

// Function to check if an access token exists
const hasAccessToken = () => {
  // Implement your logic to check if an access token exists
  // For example, check if it's stored in a cookie, local storage, or a state variable
  // Return true if it exists, otherwise false

  if ("token" in localStorage && "refreshToken" in localStorage) {
    return true;
  }
  return false;
};

const hasUserId = () => {
  if ("userid" in localStorage) {
    return true;
  }
  return false;
};

// Axios response interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => {
    // You can add any response handling logic here, such as logging or transformation
    return response;
  },
  async (error) => {
    // Handle error responses here, you can also check for specific error codes and take action
    if (error.response.status !== 200) {
      // Handle 401 Unauthorized error
      // Example: Redirect to the login page or clear tokens
      // Example: window.location.href = "/login"; or localStorage.removeItem("token");
      alert("Your login has expired please login again!");
      console.log(error.response.data);
      // alert(error.response.data);
      // console.log(error);
      // window.location.href = "/logout";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
