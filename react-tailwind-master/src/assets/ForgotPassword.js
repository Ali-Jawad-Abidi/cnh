import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

export default function ForgotPassword() {
  var [email, setEmail] = useState(null);
  var [username, setUsername] = useState(null);
  var [disabled, setDisabled] = useState(false);
  var [response, setResponse] = useState(null);

  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <div className="dark:bg-gray-900 shadow-xl mx-auto lg:w-[40%] w-[80%] p-4 rounded-lg my-[5%]">
          <p className="text-xl text-center font-bold dark:text-white">
            Forgot Your Password?
          </p>
          <p className="text-sm text-center text-bold dark:text-white">
            Please enter the username and email address that is linked to your
            account. <br /> You will receive the link to reset password on that
            email.{" "}
          </p>
          <form>
            <div>
              <label
                for="username"
                class="block mb-2 mt-2 text-xs text-left font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
                disabled={disabled}
              />
            </div>

            <div>
              <label
                for="first_name"
                class="block mb-2 mt-2 text-xs text-left font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();

                if (!/\S+@\S+\.\S+/.test(email) && email !== "") {
                  setResponse("Email is not correct");
                } else {
                  setDisabled(true);

                  var config = {
                    url:
                      process.env.REACT_APP_API_BASE_URL +
                      "/resetPasswordRequest",
                    method: "get",
                    params: { username: username, email: email },
                  };

                  axios(config).then((response) => {
                    if (response.status === 200) {
                      setResponse(response.data.msg);
                      console.log(response.data.msg);
                      setDisabled(true);
                    } else {
                      console.log(response.data);
                      setResponse(response.data);
                      setDisabled(false);
                    }
                  });
                }
              }}
              className="mx-auto px-2 py-1 mt-2 text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit
            </button>
          </form>
        </div>
        <p className="text-red-600 text-xl font-bold text-center">{response}</p>
      </div>
      <Footer />
    </div>
  );
}
