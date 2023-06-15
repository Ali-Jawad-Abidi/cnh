import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Loading from "./Loading";
import Header from "./Header";
import Footer from "./Footer";

export default function Verify() {
  var id = useParams().id;
  var salt = useParams().salt;
  var [isVerified, setIsVerified] = useState({});
  var [shouldVerify, setShouldVerify] = useState(0);
  useEffect(() => {
    if (id === undefined || salt === undefined) {
      setShouldVerify(1);
    }
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/verify",
      params: { _id: id, salt: salt },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setIsVerified(response.data);
        setShouldVerify(1);
      }
    });
  }, []);

  if (shouldVerify === 0) {
    return (
      <div>
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  } else if (shouldVerify === 2) {
    return (
      <>
        {isVerified.status && (
          <>
            <Typography align="left" variant="h6">
              Your Email has been verified
            </Typography>
            <Typography align="left" variant="h6">
              You can close this tab now.
            </Typography>
          </>
        )}
        {!isVerified.status && (
          <>
            <Typography align="left" variant="h6">
              Your Email could not be verified
            </Typography>
            <Typography align="left" variant="h6">
              Error: {isVerified.msg}
            </Typography>
          </>
        )}
      </>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="min-h-screen">
          <div className="mt-10 m-4 p-4 dark:bg-gray-800 rounded-lg bg-gray-200 ">
            <p className="  text-center text-xl font-bold dark:text-white">
              Bad Request: Failed to verify email.
            </p>
            <p className="  text-center text-xl dark:text-white">
              Failed to verify your email. Please apply for verification again.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
