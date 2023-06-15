import { MuseumItem } from "./Hottopics";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Footer from "./Footer";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import React from "react";

export default function Museums(props) {
  var [museums, setMuseums] = useState(null);
  var [kiosks, setKiosks] = useState(null);
  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/museums",
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setMuseums(response.data);
      }
    });
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/kiosks",
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setKiosks(response.data);
      }
    });
  }, []);

  if (museums === null || kiosks === null) {
    return <Loading />;
  }
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <div className="mx-4 flex flex-col gap-2 mt-4 min-h-screen mb-4">
        <div className="shadow-lg p-4 rounded-lg dark:bg-gray-800 dark:text-white mx-4">
          <p className="text-2xl font-bold dark:text-white text-left">
            Museums
          </p>
          <Grid container spacing={1}>
            {museums.map((mus, index) => (
              <Grid item xs={12} md={4} sm={12} key={index}>
                <MuseumItem item={mus} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="shadow-lg p-4 rounded-lg dark:bg-gray-800 dark:text-white mx-4">
          <p className="text-2xl font-bold dark:text-white text-left">Kiosks</p>

          <Grid container spacing={1}>
            {kiosks.map((mus, index) => (
              <Grid item xs={12} md={4} sm={12} key={index}>
                <MuseumItem item={mus} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}
