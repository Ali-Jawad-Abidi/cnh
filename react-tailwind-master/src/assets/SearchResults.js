import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { BrandItem, SubCatItem, ConsoleItem } from "./Hottopics";
import { BlogItem } from "./Blog";

export default function SearchResults(props) {
  var [brands, setBrands] = useState([]);
  var [blogs, setBlogs] = useState([]);
  var [consoles, setConsoles] = useState([]);
  var [consolecats, setConsoleCats] = useState([]);
  var searchString = useParams().search;

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/searchbrands",
      params: { search: searchString },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setBrands(response.data.data);
        console.log(response.data.data);
      }
    });

    config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/searchblogs",
      params: { search: searchString },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setBlogs(response.data.data);
      }
    });

    config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/searchsubcats",
      params: { search: searchString },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setConsoleCats(response.data.data);
        console.log(response.data);
      }
    });

    config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/searchconsoles",
      params: { search: searchString },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setConsoles(response.data.data);
      }
    });
  }, [searchString]);

  return (
    <div>
      <Header />
      <div className="min-h-screen mx-4">
        <div className="dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2">
          <p className="text-2xl font-bold dark:text-white text-left">Brands</p>
          <Grid container columnSpacing={1} rowSpacing={1}>
            {Array.from(brands).map((brand, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <BrandItem brand={brand} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2">
          <p className="text-2xl font-bold dark:text-white text-left">Blogs</p>
          <Grid container columnSpacing={1} rowSpacing={1}>
            {blogs.map((blog) => (
              <Grid item xs={6} sm={6} md={3}>
                <BlogItem item={blog} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2">
          <p className="text-2xl font-bold dark:text-white text-left">
            Console Categories
          </p>
          <Grid container columnSpacing={1} rowSpacing={1}>
            {Array.from(consolecats).map((brand, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <SubCatItem subcat={brand} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2">
          <p className="text-2xl font-bold dark:text-white text-left">
            Consoles
          </p>
          <Grid container columnSpacing={1}>
            {consoles.map((con, index) => (
              <Grid item xs={6} sm={6} md={3}>
                <ConsoleItem con={con} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
