import React from "react";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { countries } from "./Countries";
import Typography from "@mui/material/Typography";
import Loading from "./Loading";
import Footer from "./Footer";
import { ConsoleItem } from "./Hottopics";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";

export default function ListingPage(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [consoleType, setConsoleType] = useState(
    searchParams.get("type") || "console"
  );
  const Id = searchParams.get(useParams().subcat);
  const brandId = searchParams.get(useParams().brand);

  var [consoles, setConsoles] = useState(null);
  var [showMore, setShowMore] = useState(false);

  function fetchData() {
    var config = {};

    if ((Id === undefined || Id === null) && props.show === "latest") {
      var config = {
        method: "get",
        url: process.env.REACT_APP_API_BASE_URL + "/showLatest",
        params: { start: consoles ? consoles.length : 0, type: consoleType },
      };

      axios(config).then((res) => {
        if (res.status === 200) {
          var arr = consoles === null ? [] : consoles;
          arr = arr.concat(res.data);
          setConsoles(arr);
          // setShowMore(!res.data.isEnd);
        }
      });
    }
    if (Id === undefined || Id === null) {
      config = {
        method: "get",
        url: process.env.REACT_APP_API_BASE_URL + "/getallconsoles",
        params: {
          start: consoles === null ? 0 : consoles.length,
          type: consoleType,
        },
      };
      axios(config).then(function (response) {
        if (response.status === 200) {
          var arr = consoles === null ? [] : consoles;
          arr = arr.concat(response.data.consoles);
          setConsoles(arr);
          setShowMore(!response.data.isEnd);
        }
      });
    } else {
      config = {
        method: "get",
        url: process.env.REACT_APP_API_BASE_URL + "/getconsoles",
        params: {
          id: Id,
          start: consoles === null ? 0 : consoles.length,
        },
      };
      axios(config).then(function (response) {
        if (response.status === 200) {
          var arr = consoles === null ? [] : consoles;
          arr = arr.concat(response.data.consoles);
          setConsoles(arr);
          setShowMore(!response.data.isEnd);
        }
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [consoleType]);

  var ReleaseType = [
    "Retail",
    "Prototype",
    "Developement Kit",
    "Test Tool",
    "Unofficial",
    "Prize",
  ];
  let RegionalCode = ["PAL", "NTSC-U/C", "NTSC-J", "NTSC-C", "Region Free"];
  var Colors = [
    "Red",
    "Black",
    "Orange",
    "Blue",
    "Green",
    "White",
    "Purple",
    "Pink",
    "Yellow",
    "Silver",
    "Gray",
    "Maroon",
    "Aqua",
    "Lime",
    "Navy Blue",
  ];

  const [releaseType, setReleaseType] = useState([]);
  const [regionalcode, setRegionalCode] = useState([]);
  const [color, setColor] = useState([]);
  const [country, setCountry] = useState([]);

  var filteredList =
    consoles !== null
      ? consoles.filter((con) => {
          return (
            (releaseType.length === 0 ||
              releaseType.includes(con.releasetype)) &&
            (regionalcode.length === 0 ||
              regionalcode.includes(con.regionalcode)) &&
            (color.length === 0 || color.includes(con.color)) &&
            (country.length === 0 || country.includes(con.country)) &&
            true
            // (Id === null || Id === undefined ? consoleType === con.type : true)
          );
          // Id === null)
          // ||
          // Id === undefined ||
        })
      : [];

  if (consoles === null) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-2 dark:bg-gray-900 dark:text-white ">
      <Header />
      <Breadcrumb />
      <div className="flex flex-row gap-2 min-h-screen ">
        <div className="w-80">
          <Grid item xs={3} sm={3} md={3}>
            <div style={{ alignItems: "left", textAlign: "left" }}>
              <div className="dark:bg-gray-800 dark:text-white p-4 shadow-xl">
                <p className="font-bold text-xl">Filters</p>
                {Id === undefined ||
                  (Id === null && (
                    <>
                      <Typography variant="h6"> Type </Typography>

                      <div class="flex items-center mb-4">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          checked={consoleType === "console" ? true : false}
                          name="default-radio"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            e.target.checked && setConsoleType("console");
                            setConsoles([]);
                          }}
                        />
                        <label
                          for="default-radio-1"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Consoles
                        </label>
                      </div>
                      <div class="flex items-center mb-4">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value=""
                          checked={consoleType === "mobile" ? true : false}
                          name="default-radio"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            e.target.checked && setConsoleType("mobile");
                            setConsoles([]);
                          }}
                        />
                        <label
                          for="default-radio-2"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mobiles
                        </label>
                      </div>
                      <div class="flex items-center mb-4">
                        <input
                          id="default-radio-3"
                          type="radio"
                          value=""
                          checked={consoleType === "pc" ? true : false}
                          name="default-radio"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            e.target.checked && setConsoleType("pc");
                            setConsoles([]);
                          }}
                        />
                        <label
                          for="default-radio-3"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          PCs
                        </label>
                      </div>
                    </>
                  ))}

                <p className="text-lg dark:text-white text-left mb-1">
                  Release Type
                </p>

                {ReleaseType.map((name, index) => (
                  // <>
                  <div key={index} class="flex items-center mb-4">
                    <input
                      id={index}
                      type="checkbox"
                      value={name}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        e.target.checked
                          ? setReleaseType((oldArray) => [
                              ...oldArray,
                              e.target.value,
                            ])
                          : setReleaseType(
                              releaseType.filter(
                                (rel) => rel !== e.target.value
                              )
                            );
                      }}
                    />
                    <label
                      htmlfor={name}
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {name}
                    </label>
                  </div>
                ))}

                <label
                  for="small"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <select
                  id="small"
                  class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    e.target.value !== "Choose a country"
                      ? setCountry([e.target.value])
                      : setCountry([]);
                  }}
                >
                  <option selected>Choose a country</option>
                  {countries.map((count) => (
                    <option value={count.label}>{count.label}</option>
                  ))}
                </select>
                <label
                  for="small"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Color
                </label>
                <select
                  id="small"
                  class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    e.target.value !== "Choose a color"
                      ? setColor([e.target.value])
                      : setColor([]);
                  }}
                >
                  <option selected>Choose a color</option>
                  {Colors.map((color) => (
                    <option value={color}>{color}</option>
                  ))}
                </select>
                <p className="text-lg dark:text-white text-left mb-1">
                  Regional Code
                </p>

                {RegionalCode.map((name, index) => (
                  <div key={index} class="flex items-center mb-4">
                    <input
                      id={name}
                      type="checkbox"
                      value={name}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        e.target.checked
                          ? setRegionalCode((oldArray) => [
                              ...oldArray,
                              e.target.value,
                            ])
                          : setRegionalCode(
                              regionalcode.filter(
                                (rel) => rel !== e.target.value
                              )
                            );
                      }}
                    />
                    <label
                      for={name}
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </div>

        {filteredList.length > 0 && (
          <div className="px-2 ml-2 w-full shadow-lg dark:bg-gray-800 min-h-screen dark:text-white rounded-lg ">
            <Grid container columnSpacing={1}>
              {filteredList.map((con, index) => (
                <Grid item xs={6} sm={6} md={3}>
                  <ConsoleItem con={con} subcat={Id} brand={brandId} />
                </Grid>
              ))}
            </Grid>

            {showMore && (
              <button
                onClick={() => {
                  fetchData();
                }}
                className="mx-auto bg-blue-600 text-white px-3 py-2 text-lg rounded-lg mb-2"
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
