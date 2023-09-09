import { countries } from "./Countries";
import { useEffect, useState } from "react";
import axiosConfig from "./axiosConfig";
import Header from "./Header";
import Footer from "./Footer";
import { LoginComponent } from "./LoginPage";
import React from "react";
import WysiwygEditor from "./TextArea";
import ImageGrid from "./ImageGrid";

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
var ReleaseType = [
  "Retail",
  "Prototype",
  "Developement Kit",
  "Test Tool",
  "Unofficial",
  "Prize",
];
var RegionalCode = ["PAL", "NTSC-U/C", "NTSC-J", "NTSC-C", "Region Free"];

export default function AddConsole(props) {
  var [showbrands, setShowBrands] = useState();
  var [consolebrands, setConsoleBrands] = useState(null);
  var [mobilebrands, setMobileBrands] = useState(null);
  var [pcbrands, setPCBrands] = useState(null);
  var [subcats, setSubcats] = useState([]);
  var [success, setSuccess] = useState();

  function GetSubcats(brand) {
    console.log(brand);
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getsubcats",
      params: { id: brand },
    };

    axiosConfig(config).then(function (response) {
      console.log(response.data);
      if (response.status === 200) {
        setSubcats(response.data);
        setShowNext(2);
      }
    });
  }

  var [type, setType] = useState("");
  var [brand, setBrand] = useState();
  var [cat, setCat] = useState();
  var [country, setCountry] = useState();
  var [color, setColor] = useState();
  var [loading, setLoading] = useState(false);

  var [name, setName] = useState("");
  var [brand, setBrand] = useState(null);
  var [description, setDescription] = useState("");
  var [releaseType, setReleaseType] = useState("");
  var [regionalCode, setRegionalCode] = useState("");
  var [images, setImages] = useState([]);
  var [releaseDate, setReleaseDate] = useState("");
  var [totalUnitsReleased, setTotalUnitsReleased] = useState(0);
  const [showNext, setShowNext] = useState(0);

  function selectType(type) {
    if (type === "console") {
      setShowBrands(consolebrands);
      setShowNext(1);
    } else if (type === "mobile") {
      setShowBrands(mobilebrands);
      setShowNext(1);
    } else if (type === "pc") {
      setShowBrands(pcbrands);
      setShowNext(1);
    }
  }
  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allbrands",
    };

    axiosConfig(config).then(function (response) {
      if (response.status === 200) {
        setConsoleBrands(response.data.Console);
        setMobileBrands(response.data.Mobile);
        setPCBrands(response.data.PC);
      }
    });
  }, []);

  function onSubmit(e) {
    setSuccess(true);
    setLoading(true);
    e.preventDefault();
    var ConsoleItem = {
      name: name,
      type: type,
      country: country,
      color: color,
      brand: brand,
      description: description,
      images: images,
      releasetype: releaseType,
      totalunits: totalUnitsReleased,
      releasedate: releaseDate,
      regionalcode: regionalCode,
      addedby: JSON.parse(localStorage.getItem("userid")),
      userwhoadded: JSON.parse(localStorage.getItem("username")),
      token: JSON.parse(localStorage.getItem("token")).token,
      subcat: cat,
    };
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addconsole",
      data: ConsoleItem,
    };
    axiosConfig(config).then(function (r) {
      if (r.status === 200) {
        if (r.data.status) {
          setSuccess(true);
        }
      } else {
        setSuccess(false);
      }
      setLoading(false);
    });
  }

  console.log(success);

  if (localStorage.getItem("userid") === null) {
    localStorage.setItem("redirectTo", JSON.stringify(window.location.href));
    return (
      <div>
        <Header />
        <LoginComponent />
        <Footer />
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  } else if (success === true) {
    return (
      <div>
        <Header />
        <div className="min-h-screen">
          <div className="mx-4 pb-2 rounded-lg dark:bg-gray-800 bg-gray-200">
            <p className="mt-10 pt-2  dark:text-green-600 text-xl font-bold text-center">
              Console Added Successfully!
            </p>
            <p className="dark:text-white  text-xl font-bold text-center">
              Your Console will be reviwed by our team and will be approved in a
              bit and the you can see it in our database.
              <br />
              Click below to add another console to the database.
            </p>

            <button
              onClick={() => {
                setSuccess(undefined);
              }}
              className="bg-blue-600  hover:bg-blue-700 px-2 py-1 text-white rounded-lg"
            >
              Add Another
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else if (success === false) {
    return (
      <div>
        <Header />
        <div className="min-h-screen">
          <div className="dark:bg-gray-800 rounded-lg mx-4 pt-2 pb-2">
            <p className="text-red-600 text-xl font-bold text-center">
              Error encountered when adding your console.
            </p>
            <p className="dark:text-white text-xl font-bold text-center">
              We regret to inform you that the console you tried to add did not
              get added to the database.
              <br />
              Click below to try again.
            </p>

            <button
              onClick={() => {
                setSuccess(undefined);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-2 py-1 text-white rounded-lg"
            >
              Add Console
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else if (success === undefined) {
    return (
      <>
        <Header />

        <div className="mx-10 md:mx-20 p-4 min-h-screen dark:bg-gray-800 mt-4 rounded-lg shadow-lg">
          <div className="shadow-lg p-4 rounded-lg dark:bg-gray-900">
            <form className="flex flex-col gap-2">
              <div>
                <label
                  for="countries"
                  class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select console type
                </label>
                <select
                  id="countries"
                  onChange={(e) => {
                    setType(e.target.value);
                    selectType(e.target.value);
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Console Type</option>
                  <option value="console">Console</option>
                  <option value="mobile">Mobile</option>
                  <option value="pc">PC</option>
                </select>
              </div>
              {showNext >= 1 && showbrands.length < 1 && (
                <p className="text-center text-sm font-bold dark:text-white">
                  No Brands found. Please choose another Type.
                </p>
              )}{" "}
              {showNext >= 1 && showbrands.length > 0 && (
                <>
                  <div>
                    <label
                      for="countries"
                      class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Brand
                    </label>
                    <select
                      id="countries"
                      onChange={(e) => {
                        setBrand(e.target.value);
                        GetSubcats(e.target.value);
                      }}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select Brand</option>
                      {showbrands.map((b) => (
                        <option value={b._id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  {showNext === 2 && subcats.length < 1 && (
                    <p className="text-center text-sm font-bold dark:text-white">
                      No Sub Categories found for this brand. Please choose
                      another Brand or Type.
                    </p>
                  )}{" "}
                  {showNext === 2 && subcats.length > 0 && (
                    <>
                      <div>
                        <label
                          for="countries"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Select Category
                        </label>
                        <select
                          id="countries"
                          onChange={(e) => {
                            setCat(e.target.value);
                          }}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Select Category</option>
                          {subcats.map((b) => (
                            <option value={b._id}>{b.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Console Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Console Name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="small"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Country
                        </label>
                        <select
                          id="small"
                          class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            e.target.value !== "Choose a country"
                              ? setCountry(e.target.value)
                              : setCountry("");
                          }}
                        >
                          <option selected>Choose a country</option>
                          {countries.map((count) => (
                            <option value={count.label}>{count.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          for="small"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Color
                        </label>
                        <select
                          id="small"
                          class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            e.target.value !== "Choose a color"
                              ? setColor(e.target.value)
                              : setColor("");
                          }}
                        >
                          <option selected>Choose a color</option>
                          {Colors.map((color) => (
                            <option value={color}>{color}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          for="small"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Regional Code
                        </label>
                        <select
                          id="small"
                          class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            setRegionalCode(e.target.value);
                          }}
                        >
                          <option selected>Set Regional Code</option>
                          {RegionalCode.map((rc) => (
                            <option value={rc}>{rc}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          for="small"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Release Type
                        </label>
                        <select
                          id="small"
                          class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => {
                            setReleaseType(e.target.value);
                          }}
                        >
                          <option selected>Set Relase Type</option>
                          {ReleaseType.map((rt) => (
                            <option value={rt}>{rt}</option>
                          ))}
                        </select>
                      </div>

                      <div class="relative max-w-sm">
                        <label
                          for="visitors"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Release Date
                        </label>

                        <input
                          type="date"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date"
                          onChange={(e) => setReleaseDate(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="visitors"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Total Units Released
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Units"
                          required
                          onChange={(e) =>
                            setTotalUnitsReleased(e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          for="message"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        {/* <textarea
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Add features and attributes..."
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea> */}

                        <WysiwygEditor
                          text={description}
                          setText={setDescription}
                        />
                      </div>
                      {/* <div>
                        <label
                          for="message"
                          class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Upload Images
                        </label>
                        <div className="dark:bg-gray-700 rounded-lg p-2">
                          <div className="flex flex-row gap-2 justify-center mb-4">
                            {images.length > 0 &&
                              images.map((img) => (
                                <img
                                  src={img}
                                  alt="console image"
                                  className="w-20 h-20 rounded-lg object-fit"
                                />
                              ))}
                          </div>
                          <label className="px-5 w-1/2 text-sm cursor-pointer py-2 bg-blue-600 text-white rounded-lg">
                            <input
                              accept="image/*"
                              multiple
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                var imgs = Array.from(e.target.files);
                                imgs = imgs.slice(0, 5);
                                imgs.map(
                                  (file) =>
                                    new Compressor(file, {
                                      quality: 0.8,
                                      maxHeight: 720,
                                      maxWidth: 1280,
                                      mimeType: ["image/webp"], // 0.6 can also be used, but its not recommended to go below.
                                      success: (compressedResult) => {
                                        var reader = new FileReader();
                                        reader.readAsDataURL(compressedResult);
                                        reader.onloadend = function () {
                                          var base64String = reader.result;
                                          setImages((oldArray) => [
                                            ...oldArray,
                                            base64String,
                                          ]);
                                        };
                                      },
                                    })
                                );
                              }}
                              required
                            />
                            Upload Images
                          </label>
                        </div>
                      </div> */}
                      <div>
                        <ImageGrid images={images} setImages={setImages} />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          onSubmit(e);
                        }}
                        className="text-white text-md bg-blue-600 rounded-lg w-full py-2"
                      >
                        Submit
                      </button>
                    </>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
