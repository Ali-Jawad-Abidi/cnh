import axios from "axios";
import { useEffect, useState } from "react";
import Compressor from "compressorjs";
import React from "react";

export default function MerchCatList(props) {
  var [merchCats, setMerchCats] = useState([]);
  var [search, setSearch] = useState("");

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getmerchcats",
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        console.log(response.data);
        setMerchCats(response.data);
      }
    });
  }, []);

  function onAdd(item) {
    setMerchCats((oldArray) => [...oldArray, item]);
  }

  function onUpdate(data) {
    var shallowCopy = products.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setMerchCats(shallowCopy);
  }

  var filteredCat =
    merchCats !== null
      ? merchCats.filter((product) => {
          return product.name.toLowerCase().includes(search);
        })
      : [];

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
        <AddMerch onAdd={onAdd} />
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Category
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
          {filteredCat.map((product) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div class="pl-3">
                  <div class="text-base font-semibold">{product.name}</div>
                  {/* <div class="font-normal text-gray-500">{product._id}</div> */}
                </div>
              </th>
              <td class="px-6 py-4">
                <EditMerchCat item={product} onUpdate={onUpdate} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    var config = {
                      method: "get",
                      url:
                        process.env.REACT_APP_API_BASE_URL + "/removemerchcat",
                      data: { id: product._id },
                    };
                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        setMerchCats(
                          merchCats.filter((u) => {
                            return product._id !== u._id;
                          })
                        );
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete Category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditMerchCat(props) {
  var [showModal, setShowModal] = useState(false);
  var [title, setTitle] = useState(props.item.name);

  function onSubmit(e) {
    e.preventDefault();

    var newMerch = Object();
    if (title !== props.item.title) {
      newMerch.title = title;
    }

    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/updatemerchcat",
      params: { id: props.item._id, name: title },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        console.log(response.data.result);
        props.onUpdate(response.data.result);
      }
      setShowModal(false);
    });
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 rounded-lg text-white px-3 py-2"
      >
        Edit
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
                  Edit Category
                </h3>
                <form className="space-y-2" action="#">
                  <div>
                    <label
                      for="helper-text"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Title"
                      required
                      value={title}
                      maxlength="30"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        onSubmit(e);
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

function AddMerch(props) {
  var [showModal, setShowModal] = useState(false);
  var [title, setTitle] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    var newMerch = {
      name: title,
    };
    var config = {
      url: process.env.REACT_APP_API_BASE_URL + "/addmerchcat",
      method: "get",
      params: newMerch,
    };

    axios(config).then(function (response) {
      newMerch._id = response.data.id;
      props.onAdd(newMerch);
    });
  }

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="bg-blue-600 hover:bg-700 text-white px-3 py-2 rounded-lg mr-4"
      >
        Add Product Category
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
                  Add new item
                </h3>
                <form className="space-y-2" action="#">
                  <div>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Title"
                      required
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        onSubmit(e);
                        setShowModal(false);
                      }}
                      className="w-1/2 ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to Store
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
