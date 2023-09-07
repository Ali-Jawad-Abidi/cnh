import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Loading from "./Loading";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";

export default function Verify() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("_id");
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  var [isVerified, setIsVerified] = useState({});
  // var [shouldVerify, setShouldVerify] = useState(0);
  useEffect(() => {
    // if (id === undefined || accessToken === undefined) {
    //   setShouldVerify(1);
    // }

    if (id && accessToken) {
      var config = {
        method: "get",
        url: process.env.REACT_APP_API_BASE_URL + "/verify",
        params: { _id: id, token: accessToken },
      };

      axios(config).then(function (response) {
        if (response.status === 200 && response.data.status) {
          setIsVerified(response.data);
          // setShouldVerify(1);
        }
      });
    }
  }, []);

  // if (shouldVerify === 0) {
  //   return (
  //     <div>
  //       {/* <Header /> */}
  //       <Loading />
  //       {/* <Footer /> */}
  //     </div>
  //   );
  // } else if (shouldVerify === 2) {
  return (
    <div>
      <Header />

      {!isVerified.status ? (
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
      ) : (
        <div className="min-h-screen">
          <div className="mt-10 m-4 p-4 dark:bg-gray-800 rounded-lg bg-gray-200 ">
            <p className="  text-center text-xl font-bold dark:text-white">
              Email Verified Succesfully
            </p>
            <p className="  text-center text-xl dark:text-white mb-2">
              Your CNH account is now paired to your email.
            </p>
            <Link
              to={"/"}
              className="text-white rounded-lg bg-blue-600 hover:bg-blue-700 px-1 py-2 my-4"
            >
              Proceed to website
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
    // <>
    //   <Header />
    //   {isVerified.status && (
    //     <>
    //       <Typography align="left" variant="h6">
    //         Your Email has been verified
    //       </Typography>
    //       <Typography align="left" variant="h6">
    //         You can close this tab now.
    //       </Typography>
    //     </>
    //   )}
    //   {!isVerified.status && (
    //     <>
    //       <Typography align="left" variant="h6">
    //         Your Email could not be verified
    //       </Typography>
    //       <Typography align="left" variant="h6">
    //         Error: {isVerified.msg}
    //       </Typography>
    //     </>
    //   )}
    //   <Footer />
    // </>
  );
  // } else {
  //   return (
  //     <div>
  //       <Header />
  //       <div className="min-h-screen">
  //         <div className="mt-10 m-4 p-4 dark:bg-gray-800 rounded-lg bg-gray-200 ">
  //           <p className="  text-center text-xl font-bold dark:text-white">
  //             Bad Request: Failed to verify email.
  //           </p>
  //           <p className="  text-center text-xl dark:text-white">
  //             Failed to verify your email. Please apply for verification again.
  //           </p>
  //         </div>
  //       </div>

  //       <Footer />
  //     </div>
  //   );
  // }
}
