import React from "react";
import { useState } from "react";
import axios from "axios";
import { countries } from "./Countries";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [verifySecret, setVerifySecret] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({});
  const [qrCode, setQRCode] = useState();
  const [secret, setSecret] = useState();

  function Submit(e) {
    e.preventDefault();
    let shouldPass = true;

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        password
      )
    ) {
      setError(
        "Password must have an Upper Case letter, a number, a special character and must be 8 character long."
      );

      shouldPass = false;
    }

    if (/[^0-9a-zA-Z]/.test(username) && username !== "") {
      setError("Username Contains forbidden characters");
      shouldPass = false;
    }

    if (!/\S+@\S+\.\S+/.test(email) && email !== "") {
      setError("Email is not correct");
      shouldPass = false;
    }

    if (country === "") {
      setError("Country Field Left Empty");
      shouldPass = false;
    }

    if (shouldPass) {
      var data = {
        username: username,
        password: password,
        country: country,
        email: email,
        thumbnail: thumbnail,
      };

      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/register",
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (
            response.status === 200 &&
            response.data.status &&
            response.data.accessToken &&
            response.data.refreshToken
          ) {
            console.log(response);
            setError("");
            setLoginCredentials(response.data);
            setQRCode(response.data.qrlCode);
            setVerifySecret(true);
          }
        })
        .catch((error) => {
          setError(error.response.data.errorMessage);
        });
    }
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
    <div className="mt-4">
      {verifySecret ? (
        <div>
          <img className="mx-auto" src={qrCode} alt="qrcode" />
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
        <div>
          <form className="space-y-2" action="#">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                for="username"
                class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <i
                  className="absolute cursor-pointer right-1.5 top-0.5 text-black"
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
            <div>
              <label
                for="small"
                class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Country
              </label>
              <select
                id="small"
                class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setCountry(
                    e.target.value !== "Choose a country" ? e.target.value : ""
                  );
                }}
              >
                <option selected>Choose a country</option>
                {countries.map((count) => (
                  <option key={count.label} value={count.label}>
                    {count.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full mt-2"
                onClick={(e) => {
                  Submit(e);
                }}
                size="small"
                type="submit"
                variant="contained"
              >
                SignUp
              </button>
            </div>
          </form>
          <div>
            <p className="text-lg text-red-600 text-center mt-2">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
