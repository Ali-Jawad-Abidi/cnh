import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ReactFileReader from "react-file-reader";
import Compressor from "compressorjs";

export default function SubcatsList(props) {
  var [search, setSearch] = useState("");
  var [subcats, setSubcats] = useState([]);
  var [showMore, setShowMore] = useState(false);

  function fetchData() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allsubcats",
      params: { start: subcats.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = subcats;
        arr = arr.concat(response.data.subcats);

        setSubcats(arr);
        setShowMore(!response.data.isEnd);
      } else {
        setSubcats([]);
        setShowMore(false);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onAdd(item) {
    setSubcats((oldArray) => [...oldArray, item]);
  }

  function onUpdate(data) {
    var shallowCopy = subcats.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setSubcats(shallowCopy);
  }

  var filteredSubcats =
    subcats !== null
      ? subcats.filter((subcat) => {
          return subcat.name.includes(search);
        })
      : [];

  if (!subcats) return <Loading />;
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <AddSubcat onAdd={onAdd} />
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSubcats.map((subcat) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={subcat.image}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{subcat.name}</div>
                  <div class="font-normal text-gray-500">{subcat._id}</div>
                </div>
              </th>

              <td class="px-6 py-4">
                <EditSubcat subcat={subcat} onUpdate={onUpdate} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    var config = {
                      method: "get",
                      url: process.env.REACT_APP_API_BASE_URL + "/removesubcat",
                      params: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: subcat._id,
                      },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        console.log(response.data);
                        setSubcats(
                          subcats.filter((u) => {
                            return subcat._id !== u._id;
                          })
                        );
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete Subcategory
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMore && (
        <button
          onClick={() => {
            fetchData();
          }}
          className="mx-auto rounded-lg px-3 py-2 bg-blue-600 text-white"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export function AddSubcat(props) {
  var [subcatImage, setSubCatImage] = useState(null);
  var [subcatName, setSubCatName] = useState("");
  var [brand, setBrand] = useState(
    props.brand !== undefined ? props.brand : null
  );
  var [disable, setDisable] = useState(props.brand !== undefined);

  var [showModal, setShowModal] = useState(false);
  var [consolebrands, setConsoleBrands] = useState(null);
  var [mobilebrands, setMobileBrands] = useState(null);
  var [pcbrands, setPCBrands] = useState(null);
  var [brands, setBrands] = useState(null);

  function showBrands(props) {
    if (props === "Console") {
      setBrands(consolebrands);
    } else if (props === "Mobile") {
      setBrands(mobilebrands);
    } else if (props === "PC") {
      setBrands(pcbrands);
    }
  }

  useEffect(() => {
    if (!disable) {
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
    }
  }, []);

  function Submit(e) {
    e.preventDefault();

    if (subcatImage === null) {
      alert("Error: Cannot add category without image");
    } else {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/addsubcat",
        data: {
          name: subcatName,
          image: subcatImage,
          consoles: [],
          brand: brand,
        },
      };
      axios(config).then(function (response) {
        if (response.status === 200 && response.data.status) {
          props.onAdd(response.data.data);
        }
      });
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="font-medium bg-blue-600 rounded-xl px-3 py-2 text-white hover:bg-blue-700 mr-4"
      >
        Add Category
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add Sub Category
                </h3>
              </div>
              <form className="space-y-2 p-4">
                <div className="flex flex-col gap-2">
                  {subcatImage && (
                    <>
                      <label
                        for="countries"
                        class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category Image
                      </label>
                      <img
                        src={subcatImage}
                        alt="brand image"
                        className="h-12 w-12 rounded-lg"
                      />
                    </>
                  )}
                  <label className="px-5 w-1/2 text-sm cursor-pointer py-2 bg-blue-600 text-white rounded-lg">
                    <input
                      accept="image/*"
                      multiple
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        new Compressor(e.target.files[0], {
                          quality: 0.8,
                          maxHeight: 720,
                          maxWidth: 1280,
                          mimeType: ["image/webp"], // 0.6 can also be used, but its not recommended to go below.
                          success: (compressedResult) => {
                            var reader = new FileReader();
                            reader.readAsDataURL(compressedResult);
                            reader.onloadend = function () {
                              var base64String = reader.result;
                              setSubCatImage(base64String);
                            };
                          },
                        });
                      }}
                    />
                    Upload Image
                  </label>
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Category Name"
                    required
                    onChange={(e) => {
                      setSubCatName(e.target.value);
                    }}
                  />
                </div>

                {!disable ? (
                  <>
                    <div>
                      <label
                        for="countries"
                        class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Category Type
                      </label>
                      <select
                        onChange={(e) => showBrands(e.target.value)}
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Console">Select Brand Type</option>
                        <option value="Console">Console</option>
                        <option value="Mobile">Mobile</option>
                        <option value="PC">PC</option>
                      </select>
                    </div>

                    <div>
                      <label
                        for="countries"
                        class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Parent Brand
                      </label>
                      <select
                        onChange={(e) => setBrand(e.target.value)}
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select Brand</option>
                        {brands !== null &&
                          brands.map((b) => (
                            <option value={b._id}>{b.name}</option>
                          ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <div>
                    <label class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white">
                      Parent Brand: {props.brand.name}
                    </label>

                    <label class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white">
                      Console Type: {props.brand.type}
                    </label>
                  </div>
                )}
                <div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full mt-2"
                    onClick={(e) => {
                      Submit(e);
                      setShowModal(false);
                    }}
                    size="small"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EditSubcat(props) {
  var [showModal, setShowModal] = useState(false);
  var [name, setName] = useState(props.subcat.name);
  var [image, setImage] = useState(props.subcat.image);
  var [imageChanged, setImageChanged] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    var subcategory = {};
    if (imageChanged) {
      subcategory.image = image;
    }
    if (name !== props.subcat.name) {
      subcategory.name = name;
    }

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editcategory",
      data: { id: props.subcat._id, subcat: subcategory },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        props.onUpdate(response.data);
      }
    });
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="font-medium bg-blue-600 rounded-xl px-3 py-2 text-white hover:bg-blue-700"
      >
        Edit Category
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed inset-0 z-40 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit Category
                </h3>
                <img
                  src={image}
                  alt="brand image"
                  className="h-20 w-25 object-fit rounded-lg"
                />
                <form className="space-y-2" action="#">
                  <ReactFileReader
                    fileTypes={[".png", ".jpg", "jpeg"]}
                    base64={true}
                    multipleFiles={false}
                    handleFiles={(files) => {
                      setImage(files.base64);
                      setImageChanged(true);
                    }}
                    required
                  >
                    <button
                      type="button"
                      className="w-auto mt-1 whitespace-nowrap mr-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change Image
                    </button>
                  </ReactFileReader>
                  <div>
                    <label
                      for="email"
                      class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-evenly">
                    <button
                      type="button"
                      onClick={(e) => {
                        onSubmit(e);
                        setShowModal(false);
                      }}
                      className="w-full ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
