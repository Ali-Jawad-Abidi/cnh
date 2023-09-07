import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubCatsGrid } from "./Hottopics";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Breadcrumb from "./BreadCrumb";
import { useLocation } from "react-router-dom";

export default function SubCats(props) {
  var [subcats, setSubCats] = useState(null);
  var [brand, setBrand] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const brandId = searchParams.get(useParams().brand);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getsubcats",
      params: { id: brandId },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setSubCats(response.data);
      }
    });

    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/brand",
      params: { id: brandId },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        setBrand(response.data[0]);
      }
    });
  }, []);

  if (subcats === null || brand === null) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-2 dark:bg-gray-900 min-h-screen">
        <Header />
        <Breadcrumb />
        <Grid container>
          <Grid item xs={1} md={1} sm={1}></Grid>
          <Grid item xs={10} md={10} sm={10}>
            <SubCatsGrid subcats={subcats} type={type} brand={brand} />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
