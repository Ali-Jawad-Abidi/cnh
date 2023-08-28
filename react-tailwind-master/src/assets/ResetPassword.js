import React from "react";
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");
  var [password1, setPassword1] = useState(null);
  var [password2, setPassword2] = useState(null);
  var [response, setResponse] = useState(null);

  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <div className="dark:bg-gray-900 shadow-xl mx-auto lg:w-[40%] w-[80%] p-4 rounded-lg my-[5%]">
          <p className="text-xl text-center font-bold dark:text-white">
            Reset Password
          </p>

          <form>
            <div>
              <label
                for="first_name"
                class="block mb-2 mt-2 text-xs text-left font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <div>
              <label
                for="first_name"
                class="block mb-2 mt-2 text-xs text-left font-medium text-gray-900 dark:text-white"
              >
                Repeat Password
              </label>
              <input
                type="password"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                var shouldPass = true;

                if (password1 !== password2) {
                  setResponse("Passwords Donot Match!!!");
                } else if (
                  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
                    password1
                  )
                ) {
                  setResponse(
                    "Password must have an Upper Case letter, a number, a special character and must be 8 character long."
                  );

                  shouldPass = false;
                } else {
                  var config = {
                    url: process.env.REACT_APP_API_BASE_URL + "/resetPassword",
                    method: "post",
                    data: { id: id, password: password1 },
                  };

                  axios(config).then((response) => {
                    if (response.status === 200) {
                      setResponse(response.msg);
                    } else {
                      setResponse(response.msg);
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
        <p className="text-red-600 text-sm font-bold text-left">{response}</p>
      </div>
      <Footer />
    </div>
  );
}
