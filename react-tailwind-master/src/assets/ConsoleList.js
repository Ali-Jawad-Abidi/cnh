import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ReactFileReader from "react-file-reader";
import { Link } from "react-router-dom";
import React from "react";

export default function ConsoleList(props) {
  var [search, setSearch] = useState("");
  var [consoles, setConsoles] = useState([]);
  var [unapprovedconsoles, setUnapprovedConsoles] = useState([]);
  var [showMore, setShowMore] = useState(false);

  function fetchDataApproved() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allconsoles",
      params: { start: consoles.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = consoles;
        arr = arr.concat(response.data.consoles);
        setConsoles(arr);
        setShowMore(!response.data.isEnd);
      } else {
        setConsoles([]);
        setShowMore(false);
      }
    });
  }

  function fetchDataUnapproved() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getallunapprovedconsoles",
      params: { start: unapprovedconsoles.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = unapprovedconsoles;
        arr = arr.concat(response.data.consoles);
        setUnapprovedConsoles(arr);
        setShowMore(!response.data.isEnd);
      } else {
        setUnapprovedConsoles([]);
        setShowMore(false);
      }
    });
  }

  function fetchData() {
    props.unapproved ? fetchDataUnapproved() : fetchDataApproved();
  }

  useEffect(() => {
    fetchData();
  }, [props.unapproved]);

  var filteredConsoles = props.unapproved
    ? unapprovedconsoles.filter((console) => {
        return console.name.includes(search);
      })
    : consoles.filter((console) => {
        return console.name.includes(search);
      });

  if (props.unapproved ? !unapprovedconsoles : !consoles) return <Loading />;
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

        <div>
          <Link
            to="/addconsole"
            className="px-3 py-2 mx-auto mr-2 bg-blue-600 hover:bg-blue-700 text-center rounded-lg text-white"
          >
            Add Console
          </Link>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Type
            </th>

            <th scope="col" class="px-4 py-3">
              Action
            </th>
            <th scope="col" class="px-4 py-3">
              Action
            </th>
            <th scope="col" class="px-4 py-3">
              Action
            </th>
            <th scope="col" class="px-4 py-3">
              Action
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredConsoles.map((con) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={con.images[0]}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{con.name}</div>
                  <div class="font-normal text-gray-500">{con._id}</div>
                </div>
              </th>
              <td class="px-6 py-4">{con.type}</td>

              <td class="px-6 py-4">
                <EditConsole item={con} />
              </td>
              <td class="px-6 py-4">
                <EditWhereAmI item={con} />
              </td>
              <td class="px-6 py-4">
                <EditDocuments item={con} />
              </td>
              <td class="px-6 py-4">
                <EditCommonFaults item={con} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    var config = {
                      method: "post",
                      url:
                        process.env.REACT_APP_API_BASE_URL + "/removeconsole",
                      data: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: con._id,
                      },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        alert(response.data);
                        props.unapproved
                          ? setUnapprovedConsoles(
                              unapprovedconsoles.filter((u) => {
                                return u._id !== con._id;
                              })
                            )
                          : setConsoles(
                              consoles.filter((u) => {
                                return con._id !== u._id;
                              })
                            );
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-lg px-1 py-2 text-xs text-white hover:bg-red-700"
                >
                  Delete Console
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

function EditConsole(props) {
  var [showModal, setShowModal] = useState(false);
  var [desire, setDesire] = useState(props.item.desire || 0);
  var [approved, setApproved] = useState(props.item.approved);
  var [rating, setRating] = useState(props.item.rating);
  var [images, setImages] = useState(props.item.images);
  var [links, setLinks] = useState(props.item.links);
  var [hasImagesChanged, setHasImagesChanged] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    var newConsole = Object();
    if (desire !== props.item.desire) {
      newConsole.desire = desire;
    }
    if (approved !== props.item.approved) {
      newConsole.approved = approved;
    }
    if (rating !== props.item.rating) {
      newConsole.rating = rating;
    }

    if (hasImagesChanged) {
      newConsole.images = images;
    }

    newConsole.links = links;

    console.log(newConsole);

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editconsole",
      data: { id: props.item._id, con: newConsole },
    };

    axios(config).then(function (response) {
      if (response.status === 200) alert(response.data.result);
    });
  }
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Edit Console
      </div>
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
                  Edit Console
                </h3>

                <form className="space-y-2 mr-2  " action="#">
                  <div className="flex flex-col">
                    <div className="flex flex-row mb-2 mx-auto items-center ">
                      {images.map((img, index) => (
                        <div className="relative">
                          <img
                            src={img}
                            alt="product images"
                            className="mx-1 object-fit w-16 h-12 rounded-lg"
                          />
                          <span
                            onClick={() => {
                              setImages(images.filter((im, i) => i !== index));
                            }}
                            className="absolute cursor-pointer px-1 top-0 right-0 bg-white rounded-full"
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <ReactFileReader
                        fileTypes={[".png", ".jpg", "jpeg", "webp"]}
                        base64={true}
                        multipleFiles={true}
                        handleFiles={(files) => {
                          var i = images;
                          i = i.concat(files.base64);
                          setImages(i.slice(0, 5));
                          setHasImagesChanged(true);
                        }}
                        required
                      >
                        <button
                          type="button"
                          className="bg-blue-600 text-white px-2 py-1 text-sm rounded-lg"
                        >
                          Upload Images
                        </button>
                      </ReactFileReader>
                    </div>

                    <div>
                      <label
                        for="helper-text"
                        class="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Desire
                      </label>
                      <input
                        type="Number"
                        name="desire"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Desire"
                        required
                        value={desire}
                        onChange={(e) => {
                          setDesire(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mr-1">
                      <label
                        for="helper-text"
                        class="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Rating
                      </label>
                      <input
                        type="Number"
                        name="discount"
                        id="email"
                        min="0"
                        max="5"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Rating"
                        required
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      {links.map((l, index) => (
                        <>
                          <label
                            for="helper-text"
                            class="block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {"Link " + index}
                          </label>
                          <input
                            type="text"
                            name="links"
                            id={index}
                            rows="2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                            placeholder={links[index]}
                            onChange={(e) => {
                              var prevLinks = links;
                              prevLinks[e.target.id] = e.target.value;
                              setLinks(prevLinks);
                            }}
                          />
                        </>
                      ))}
                    </div>
                    <div>
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 mt-2 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                        checked={approved}
                        onChange={(e) => {
                          setApproved(e.target.checked);
                        }}
                      />

                      <label
                        for="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Approve / Unapprove
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-evenly">
                    <button
                      type="button"
                      onClick={() => {
                        var config = {
                          method: "post",
                          url:
                            process.env.REACT_APP_API_BASE_URL + "/deletemerch",
                          data: { id: props.item._id },
                        };

                        axios(config).then(function (response) {
                          alert(response.data);
                          props.onDelete(props.item);
                        });
                      }}
                      className="w-full whitespace-nowrap mr-1 text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-blue-800"
                    >
                      Delete
                    </button>

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

function EditWhereAmI(props) {
  var [showModal, setShowModal] = useState(false);
  var [isavailable, setIsAvailable] = useState(props.item.whereami.isavailable);
  var [location, setLocation] = useState(props.item.whereami.location);
  var [to, setTo] = useState(props.item.whereami.to);
  var [from, setFrom] = useState(props.item.whereami.from);
  var [link, setLink] = useState(props.item.whereami.link);

  function onSubmit(e) {
    e.preventDefault();

    var data = {
      location: location,
      to: to,
      from: from,
      link: link,
      isavailable: isavailable,
    };

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editwhereami",
      data: { id: props.item._id, whereami: data },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setShowModal(false);
      }
    });
  }
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Edit Where am I
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
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit Where Am I
                </h3>

                <form className="space-y-2  " action="#">
                  <div className="flex flex-col mx-2">
                    <div>
                      <label
                        for="helper-text"
                        class="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="discount"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Location"
                        required
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        for="helper-text"
                        class="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        To
                      </label>
                      <input
                        type="text"
                        name="discount"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="To"
                        required
                        value={to}
                        onChange={(e) => {
                          setTo(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        for="helper-text"
                        class="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        From
                      </label>
                      <input
                        type="text"
                        name="discount"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="From"
                        required
                        value={from}
                        onChange={(e) => {
                          setFrom(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        for="helper-text"
                        class="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Link
                      </label>
                      <input
                        type="text"
                        name="discount"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Link"
                        required
                        value={link}
                        onChange={(e) => {
                          setLink(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                        checked={isavailable}
                        onChange={(e) => {
                          setIsAvailable(e.target.checked);
                        }}
                      />

                      <label
                        for="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Available / Unavailable
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        onSubmit(e);
                      }}
                      className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

function EditCommonFaults(props) {
  var [showModal, setShowModal] = useState(false);
  var [commonfaults, setCommonFaults] = useState([]);
  var [uploads, setUploads] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getfaults",
      params: {
        ids: props.item.commonfaults,
      },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        setCommonFaults(response.data);
      } else {
        setCommonFaults([]);
      }
    });
  }, []);

  function onSubmit() {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addfaults",
      data: {
        id: props.item._id,
        faults: uploads,
      },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        console.log(response.data);
        var a = commonfaults;
        a = a.concat(uploads);
        setCommonFaults(a);
      }
      setShowModal(false);
    });
  }
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Edit Common Faults
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
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit Common Faults
                </h3>

                <form className="space-y-2  " action="#">
                  <div>
                    <div className="flex flex-col gap-2">
                      {commonfaults.map((doc) => (
                        <div className="flex flex-row gap-2">
                          <a download={doc.name} href={doc.content}>
                            {doc.name}
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              var config = {
                                method: "post",
                                url:
                                  process.env.REACT_APP_API_BASE_URL +
                                  "/removecommonfault",
                                data: {
                                  id: props.item._id,
                                  cf: doc._id,
                                },
                              };
                              axios(config).then(function (response) {
                                if (response.status === 200) {
                                  setCommonFaults(
                                    commonfaults.filter((cf) => {
                                      return cf._id !== doc._id;
                                    })
                                  );
                                }
                              });
                            }}
                            className="bg-red-600 rounded-lg text-white px-2 py-1"
                          >
                            Delete
                          </button>
                        </div>
                      ))}

                      {uploads.map((doc) => (
                        <div className="flex flex-row gap-2">
                          <a download={doc.name} href={doc.content}>
                            {doc.name}
                          </a>
                          <button
                            onClick={() => {
                              setUploads(
                                uploads.filter((cf) => {
                                  return cf._id !== doc._id;
                                })
                              );
                            }}
                            className="bg-red-600 rounded-lg text-white px-2 py-1"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                    <ReactFileReader
                      fileTypes={[".docs", ".pdf", ".docx"]}
                      base64={true}
                      size="small"
                      multipleFiles={true}
                      handleFiles={(files) => {
                        var cf = [];
                        var arr = Array.from(files.fileList);
                        arr.map((a, index) => {
                          cf.push({
                            name: a.name,
                            content: files.base64[index],
                            isdocument: false,
                          });
                        });
                        setUploads(cf);
                      }}
                    >
                      <button
                        type="button"
                        className="bg-blue-600 mt-1 px-2 py-2 text-white text-sm rounded-lg"
                      >
                        Upload Common Faults
                      </button>
                    </ReactFileReader>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      onSubmit(e);
                    }}
                    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EditDocuments(props) {
  var [showModal, setShowModal] = useState(false);
  var [documents, setDocuments] = useState([]);
  var [uploads, setUploads] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getdocuments",
      params: {
        ids: props.item.documents,
      },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        setDocuments(response.data);
      } else {
        setDocuments([]);
      }
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/adddocument",
      data: {
        id: props.item._id,
        documents: uploads,
      },
    };
    axios(config).then(function (r) {
      if (r.status === 200) {
        var arr = documents;
        arr = arr.concat(uploads);
        setDocuments(arr);
        setUploads([]);
      }
      setShowModal(false);
    });
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Edit Documents
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
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit Documents
                </h3>

                <form className="space-y-2  " action="#">
                  <div>
                    <div className="flex flex-col gap-2">
                      {documents.map((doc) => (
                        <div className="flex flex-row gap-2">
                          <a download={doc.name} href={doc}>
                            {doc.name}
                          </a>
                          <button
                            onClick={() => {
                              var config = {
                                method: "get",
                                url:
                                  process.env.REACT_APP_API_BASE_URL +
                                  "/removedocument",
                                params: {
                                  id: props.item._id,
                                  doc: doc._id,
                                },
                              };
                              axios(config).then(function (r) {
                                if (r.status === 200) {
                                  setDocuments(
                                    documents.filter((d) => {
                                      return d._id !== doc._id;
                                    })
                                  );
                                }
                              });
                            }}
                            className="bg-red-600 rounded-lg text-white px-2 py-1"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      {uploads.map((doc) => (
                        <div className="flex flex-row gap-2">
                          <a download={doc.name} href={doc}>
                            {doc.name}
                          </a>
                          <button
                            onClick={() => {
                              setUploads(
                                uploads.filter((d) => {
                                  return d.name !== doc.name;
                                })
                              );
                            }}
                            className="bg-red-600 rounded-lg text-white px-2 py-1"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                    <ReactFileReader
                      fileTypes={[".docs", ".pdf", ".docx"]}
                      base64={true}
                      size="small"
                      multipleFiles={true}
                      handleFiles={(files) => {
                        var cf = [];
                        var arr = Array.from(files.fileList);
                        arr.map((a, index) => {
                          cf.push({
                            name: a.name,
                            content: files.base64[index],
                            isdocument: true,
                          });
                        });
                        setUploads(cf);
                      }}
                    >
                      <button
                        type="button"
                        className="bg-blue-600 mt-1 px-2 py-2 text-white text-sm rounded-lg"
                      >
                        Upload Documents
                      </button>
                    </ReactFileReader>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      onSubmit(e);
                    }}
                    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
