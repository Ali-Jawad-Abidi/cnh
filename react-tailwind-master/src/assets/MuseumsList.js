import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ReactFileReader from "react-file-reader";
import React from "react";

export default function MuseumsList(props) {
  var [search, setSearch] = useState("");
  var [museums, setMuseums] = useState([]);

  function fetchData() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allmuseum",
      params: { start: museums.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = museums;
        arr = arr.concat(response.data.museums);
        setMuseums(arr);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onAdd(item) {
    setMuseums((oldArray) => [...oldArray, item]);
  }

  var filteredMuseum =
    museums !== null
      ? museums.filter((museum) => {
          return museum.name.includes(search);
        })
      : [];

  if (!museums) return <Loading />;
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
        <AddMuseum onAdd={onAdd} />
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Museum / Kiosk
            </th>
            <th scope="col" class="px-6 py-3">
              Info
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMuseum.map((museum) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={museum.image}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{museum.name}</div>
                  <div class="font-normal text-gray-500">{museum._id}</div>
                </div>
              </th>

              <td class="px-6 py-4">
                <div class="dark:text-white text-sm">
                  {museum.ismuseum ? "Museum" : "Kiosk"}
                </div>
              </td>

              <td class="px-6 py-4">
                <p class="dark:text-white text-sm	text-clip overflow-hidden">
                  {/* {museum.info.substring(0, 50) + "..."} */}
                </p>
              </td>

              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    var config = {
                      method: "get",
                      url: process.env.REACT_APP_API_BASE_URL + "/removemuseum",
                      params: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: museum._id,
                      },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        console.log(response.data);
                        setMuseums(
                          museums.filter((u) => {
                            return museum._id !== u._id;
                          })
                        );
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-1 text-white hover:bg-red-700"
                >
                  Delete Museum
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddMuseum(props) {
  var [name, setName] = useState("");
  var [image, setImage] = useState("");
  var [link, setLink] = useState("");
  var [showModal, setShowModal] = useState(false);
  var [ismuseum, setIsMuseum] = useState(false);
  var [info, setInfo] = useState("");

  function Submit(e) {
    e.preventDefault();
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addmuseum",
      data: {
        name: name,
        image: image,
        link: link,
        ismuseum: ismuseum,
        info: info,
      },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        props.onAdd(response.data);
      }
    });
  }

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className="absolute mr-4 top-0 right-0 mr-4 cursor-pointer hover:bg-blue-700 bg-blue-600 px-3 py-1 rounded-lg text-white "
      >
        Add Museum / Kiosk
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
                  Add Museum
                </h3>
              </div>

              <form className="pb-4">
                <div className="flex flex-col mx-4 gap-1">
                  <div>
                    <label
                      for="email"
                      class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Museum Name
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Name"
                      required
                      maxlength="40"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Link to Museum Page
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Link"
                      required
                      maxlength="40"
                      value={link}
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Museum Description
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      required
                      maxlength="200"
                      value={info}
                      onChange={(e) => {
                        setInfo(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-row items-start">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 mt-2 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                      onChange={(e) => {
                        setIsMuseum(e.target.checked);
                      }}
                    />

                    <label
                      for="remember"
                      className="ml-2 mt-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Is Museum / Is Kiosk
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    {image && (
                      <>
                        <label
                          for="countries"
                          class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Museum Image
                        </label>
                        <img
                          src={image}
                          alt="brand image"
                          className="h-12 w-12 rounded-lg"
                        />
                      </>
                    )}
                    <ReactFileReader
                      fileTypes={[".png", ".jpg", "jpeg"]}
                      base64={true}
                      multipleFiles={false}
                      handleFiles={(files) => {
                        setImage(files.base64);
                      }}
                      required
                    >
                      <button
                        type="button"
                        className="w-auto float-left mt-1 whitespace-nowrap mr-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Upload Image
                      </button>
                    </ReactFileReader>
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
