import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";

export default function VerifyEmail(props) {
  var [verified, setVerified] = useState(false);
  function CheckVerified() {
    var userid = JSON.parse(localStorage.getItem("userid")) || null;
    if (userid !== null) {
      var config = {
        url: process.env.REACT_APP_API_BASE_URL + "/isVerified",
        method: "get",
        params: { _id: userid },
      };

      axios(config).then((res) => {
        if (res.status === 200 && res.data) {
          setVerified(res.data);
          localStorage.removeItem("EmailVerify");
          var redirectTo =
            "redirectTo" in localStorage
              ? JSON.parse(localStorage.getItem("redirectTo"))
              : "/";

          localStorage.removeItem("redirectTo");

          window.location.href = redirectTo;
        } else {
          setVerified(false);
          alert("Email Not Verified Yet!!!");
        }
      });
    }
  }
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <div className="flex flex-col min-h-screen pt-[5%] items-center">
        <p className="dark:text-white text-2xl text-bold text-center capitalize">
          Verifying Your Email Address...
        </p>
        <p className="dark:text-white mx-auto text-center">
          Your CNH Account cannot be used until your email address has been
          verified.
          <br /> To verify your email please check your email inbox and check to
          see if you have recieved email from computernostalgiaheaven@gmail.com.
          <br /> If not found in inbox please check spam and click on it to
          verify your email.
          <br />
          Once you have verified your email click on the button below to
          continue exploring.
        </p>

        <button
          type="button"
          class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-2 cursor-pointer disabled"
          onClick={CheckVerified}
        >
          Continue
        </button>
      </div>
      <Footer />
    </div>
  );
}
