import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PatreonLinking() {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const state = queryParameters.get("state");
  var [success, setSuccess] = useState(0);
  var [patreonResponse, setPatreonResponse] = useState({});

  useEffect(() => {
    var config = {
      url: process.env.REACT_APP_API_BASE_URL + "/patreonlogin",
      method: "post",
      data: {
        code: code,
        state: state,
        userid: JSON.parse(localStorage.getItem("userid")),
      },
    };

    axios(config).then((response) => {
      if (response.status === 200) {
        setSuccess(1);
        setPatreonResponse(response.data.data);
      } else {
        setSuccess(2);
      }
    });
  });
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {success === 0 ? (
          <p className="font-bold font-xl text-center dark:text-white">
            Please wait while we get your patreon account information...
          </p>
        ) : success === 1 ? (
          <p className="font-bold font-xl text-center dark:text-white">
            Your Patreon account has been successfully linked!
            <br />
            Your Account ID: {patreonResponse.id}
          </p>
        ) : (
          <p className="font-bold font-xl text-center dark:text-white">
            Error Linking your patreon account!!!
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
