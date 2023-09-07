import LoginButtons from "./LoginButtons";
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import SigninPage from "./SigninPage";
import { Link } from "react-router-dom";
import React from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [secret, setSecret] = useState("");
  const [verifySecret, setVerifySecret] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({});

  function Submit(e) {
    e.preventDefault();

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/login",
      data: { username: username, password: password },
    };
    axios(config)
      .then(function (response) {
        if (
          response.status === 200 &&
          response.data.status &&
          response.data.accessToken &&
          response.data.refreshToken
        ) {
          setError("");
          setLoginCredentials(response.data);
          setVerifySecret(true);
        } else {
          setError("Login Failed");
        }
      })
      .catch((error) => {
        setError(error.response.data.errorMessage);
      });
  }

  function handleVerifyToken() {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/verify",
      data: {
        userid: loginCredentials.id,
        token: secret,
      },
    };

    axios(config).then((response) => {
      if (response.status === 200 && response.data.valid) {
        localStorage.setItem("userid", JSON.stringify(loginCredentials.id));
        localStorage.setItem(
          "username",
          JSON.stringify(loginCredentials.username)
        );

        if ("profileImage" in loginCredentials) {
          localStorage.setItem(
            "profileImage",
            JSON.stringify(loginCredentials.profileImage)
          );
        }
        localStorage.setItem(
          "authenticationtype",
          JSON.stringify(loginCredentials.authenticationtype)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(loginCredentials.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(loginCredentials.refreshToken)
        );
        var location = JSON.parse(localStorage.getItem("redirectTo"));
        localStorage.removeItem("redirectTo");
        if (
          loginCredentials.authenticationtype !== "Admin" &&
          location === "/xGpAQhWobyTxIPx51LAKKOGnrWZNUtcOImuVUIPdqc="
        ) {
          window.location = "/";
        } else {
          if (location) {
            window.location = location;
          } else {
            window.location = "/";
          }
        }
      } else {
        localStorage.clear();
        setError("Invalid Key");
      }
    });
  }

  return (
    <div>
      {verifySecret ? (
        <div>
          <label
            for="username"
            class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2"
          >
            Please enter the secretKey from your Google Authenticator below:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="SecretKey"
            required
            onChange={(e) => {
              setSecret(e.target.value);
            }}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full mt-2"
            onClick={handleVerifyToken}
          >
            Verify
          </button>
          <p className="text-center text-red-600 font-semibold">{error}</p>
        </div>
      ) : (
        <form
          className="space-y-2"
          action="#"
          class="bg-white dark:bg-gray-900"
        >
          <div>
            <label
              for="username"
              class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Username"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={!showPassword ? "password" : "text"}
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                className="absolute cursor-pointer right-1 top-1.5 text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 512 512"
                >
                  <circle cx="256" cy="256" r="64" fill="currentColor" />
                  <path
                    fill="currentColor"
                    d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76ZM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96Z"
                  />
                </svg>
              </i>
            </div>
          </div>
          <div className="text-left mt-2">
            <Link
              to={"/forgotPassword"}
              className="mt-2 text-left cursor-pointer text-blue-700 text-left text-sm "
            >
              Forgot your password?
            </Link>
          </div>

          <div>
            <LoginButtons />
          </div>
          <div className="mx-auto">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full mt-2"
              onClick={(e) => {
                Submit(e);
              }}
            >
              Login
            </button>
          </div>
        </form>
      )}
      <div>
        <p className="text-lg text-red-600 text-center mt-2">{error}</p>
      </div>
    </div>
  );
}

export function LoginComponent() {
  var [isLogin, setIsLogin] = useState(true);
  var TextAndBgLogin = isLogin
    ? "bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700"
    : "bg-gray-200 text-gray-600 dark:text-gray-600 dark:bg-gray-800";
  var TextAndBgSignUp = !isLogin
    ? "bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700"
    : "bg-gray-200 text-gray-600 dark:text-gray-600 dark:bg-gray-800";
  return (
    <div className=" min-h-screen dark:text-white pb-1 bg-cover bg-no-repeat bg-[url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700812861.jpg')] mb-2">
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="inset-0 flex justify-center mt-10 mb-24 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <div className="relative w-full h-full max-w-sm md:h-auto">
          <div className="relative bg-white  rounded-lg shadow dark:bg-gray-900">
            <div className="px-6 py-4 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-blue-600">
                Console Nostalgia Heaven
              </h3>

              <ul class="flex flex-row gap-0.5 cursor-pointer text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                <li class="w-full">
                  <div
                    class={`${TextAndBgLogin} inline-block w-full p-4 text-gray-900 dark:hover:bg-gray-700 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </div>
                </li>

                <li class="w-full">
                  <div
                    onClick={() => setIsLogin(false)}
                    class={`${TextAndBgSignUp} inline-block w-full p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:hover:bg-gray-700`}
                  >
                    SignUp
                  </div>
                </li>
              </ul>
              <div>{isLogin ? <LoginPage /> : <SigninPage />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <div className="dark:bg-gray-900">
        <Header />
        <LoginComponent />
      </div>
      <Footer />
    </>
  );
}
