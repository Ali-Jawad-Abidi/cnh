import axios from "axios";
import { useEffect, useState } from "react";
import ReactFileReader from "react-file-reader";
import Loading from "./Loading";
import Compressor from "compressorjs";
import React from "react";
import SingleImageUpload from "./SingleImageUpload";

export default function BrandsList(props) {
  var [search, setSearch] = useState("");
  var [brands, setBrands] = useState([]);
  var [unapprovedBrands, setUnapprovedBrands] = useState([]);
  var [showMore, setShowMore] = useState(false);

  function fetchData() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getallbrands",
      params: { start: brands.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = brands;
        arr = arr.concat(response.data.brands);
        setBrands(arr);
        setShowMore(!response.data.isEnd);
      } else {
        setBrands(null);
        setShowMore(false);
      }
    });
  }

  function fetchUnapprovedData() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getunapprovedbrands",
      params: { start: unapprovedBrands.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = unapprovedBrands;
        arr = arr.concat(response.data.brands);
        setUnapprovedBrands(arr);
        setShowMore(!response.data.isEnd);
      } else {
        setUnapprovedBrands(null);
        setShowMore(false);
      }
    });
  }

  useEffect(() => {
    props.unapproved ? fetchUnapprovedData() : fetchData();
  }, [props.unapproved]);

  function onAdd(item) {
    props.unapproved
      ? setUnapprovedBrands((oldArray) => [...oldArray, item])
      : setBrands((oldArray) => [...oldArray, item]);
  }

  function onRemove(itemToRemove) {
    props.unapproved
      ? setUnapprovedBrands(
          unapprovedBrands.filter((item) => item._id !== itemToRemove._id)
        )
      : setBrands(brands.filter((item) => item._id !== itemToRemove._id));
  }

  function onUpdate(data) {
    var shallowCopy = brands.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setBrands(shallowCopy);
  }
  var filteredBrands = props.unapproved
    ? unapprovedBrands !== null
      ? unapprovedBrands.filter((brand) => {
          return brand.name.includes(search);
        })
      : []
    : brands !== null
    ? brands.filter((brand) => {
        return brand.name.includes(search);
      })
    : [];

  if (props.unapproved ? !unapprovedBrands : !brands) return <Loading />;
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
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <AddBrand onAdd={onAdd} />
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Brand Type
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>

            {props.unapproved && (
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            )}
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBrands.map((brand) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={brand.image}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{brand.name}</div>
                  <div class="font-normal text-gray-500">{brand._id}</div>
                </div>
              </th>
              <td class="px-6 py-4">{brand.type}</td>

              <td class="px-6 py-4">
                <EditBrand brand={brand} onUpdate={onUpdate} />
              </td>

              {props.unapproved && (
                <td class="px-6 py-4">
                  <button
                    onClick={() => {
                      var config = {
                        method: "post",
                        url:
                          process.env.REACT_APP_API_BASE_URL + "/approveBrand",
                        data: {
                          userid: JSON.parse(localStorage.getItem("userid")),
                          id: brand._id,
                          token:
                            JSON.parse(localStorage.getItem("token")) || "",
                        },
                      };

                      axios(config).then(function (response) {
                        if (response.status === 200) {
                          console.log(response.data);
                          setUnapprovedBrands(
                            unapprovedBrands.filter((u) => {
                              return brand._id !== u._id;
                            })
                          );
                        }
                      });
                    }}
                    class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                  >
                    Approve Brand
                  </button>
                </td>
              )}
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    const conf = confirm(
                      "Are you sure you want to delete this brand"
                    );
                    if (conf) {
                      var config = {
                        method: "get",
                        url:
                          process.env.REACT_APP_API_BASE_URL + "/removebrand",
                        params: {
                          userid: JSON.parse(localStorage.getItem("userid")),
                          id: brand._id,
                        },
                      };

                      axios(config).then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                          props.unapproved
                            ? setUnapprovedBrands(
                                unapprovedBrands.filter((u) => {
                                  return brand._id !== u._id;
                                })
                              )
                            : setBrands(
                                brands.filter((u) => {
                                  return brand._id !== u._id;
                                })
                              );
                        }
                      });
                    }
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete Brand
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
function EditBrand(props) {
  var [showModal, setShowModal] = useState(false);
  var [name, setName] = useState(props.brand.name);
  var [image, setImage] = useState(props.brand.image);

  function onSubmit(e) {
    e.preventDefault();

    var brand = { name: name, image: image };

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editBrand",
      data: { id: props.brand._id, brand: brand },
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
        Edit Brand
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
                  Edit Brand
                </h3>
                <form className="space-y-2" action="#">
                  <SingleImageUpload image={image} onImageChange={setImage} />
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

export function AddBrand(props) {
  var [brandImage, setBrandImage] = useState("");
  var [brandName, setBrandName] = useState("");
  var [brandType, setBrandType] = useState("");
  var [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setBrandImage("");
    setBrandName("");
    setBrandType("");
  }, [showModal]);

  function Submit(e) {
    e.preventDefault();
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addbrand",
      data: {
        userid: JSON.parse(localStorage.getItem("userid")),
        brand: {
          type: brandType,
          name: brandName,
          image: brandImage,
        },
      },
    };
    axios(config).then(function (response) {
      if (response.status === 200 && response.data.status) {
        props.onAdd(response.data.msg);
      }
    });
  }

  if (localStorage.getItem("userid") === null) {
    localStorage.setItem(
      "redirectTo",
      JSON.stringify(window.location.pathname)
    );
  }

  return (
    <div>
      <div
        onClick={() => {
          localStorage.getItem("userid") !== null
            ? setShowModal(true)
            : (window.location.href = "/login");
        }}
        className="cursor-pointer hover:bg-blue-700 bg-blue-600 px-3 py-1 rounded-lg text-white "
      >
        Add Brand
      </div>

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div className="relative w-full h-full max-w-2xl max-h-md md:h-auto">
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
              <div className="px-6 pt-4 lg:px-8">
                <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                  Add Brand
                </h3>
              </div>

              <form className="pb-4">
                <div className="flex flex-col mx-4 gap-1">
                  <div>
                    <label
                      for="email"
                      class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      BrandName
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Brand Name"
                      required
                      value={brandName}
                      onChange={(e) => {
                        setBrandName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Brand Type
                    </label>
                    <select
                      onChange={(e) => setBrandType(e.target.value)}
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="Console">Select Brand Type</option>
                      <option value="Console">Console</option>
                      <option value="Mobile">Mobile</option>
                      <option value="PC">PC</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <SingleImageUpload
                      image={brandImage}
                      onImageChange={setBrandImage}
                    />
                  </div>

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
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
