import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Hottopics from "./Hottopics";
import Footer from "./Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Header from "./Header";
import Breadcrumb from "./BreadCrumb";

export default function Nostalgiabase(props) {
  var [consolebrands, setConsoleBrands] = useState(null);
  var [mobilebrands, setMobileBrands] = useState(null);
  var [pcbrands, setPCBrands] = useState(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allbrands",
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setConsoleBrands(response.data.Console);
        setMobileBrands(response.data.Mobile);
        setPCBrands(response.data.PC);
      }
    });
  }, []);

  {
    if (consolebrands === null || pcbrands === null || mobilebrands === null)
      return <Loading />;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white ">
      <Header />
      <div>
        <Breadcrumb />
        {consolebrands !== null &&
          pcbrands !== null &&
          mobilebrands !== null && (
            <Grid container>
              <Grid item xs={1} md={1} sm={1}></Grid>
              <Grid item xs={10} md={10} sm={1}>
                <Hottopics
                  title="Brands"
                  brands={consolebrands}
                  mobiles={mobilebrands}
                  pcs={pcbrands}
                />
              </Grid>
            </Grid>
          )}
      </div>

      <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
        <Link
          to={"/latest"}
          className="bg-blue-600 hover:bg-blue-600 w-1/3 py-2 rounded-lg mb-2 hover:scale-110"
        >
          View Latest Additions
        </Link>
        <Link
          to={"/productgrid"}
          className="bg-blue-600 hover:bg-blue-600 w-1/3 py-2 rounded-lg mb-2 hover:scale-110"
        >
          View Entire Database
        </Link>
      </div>
      <Footer />
    </div>
  );
}
