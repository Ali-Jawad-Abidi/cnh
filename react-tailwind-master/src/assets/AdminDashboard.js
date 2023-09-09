import { Stack } from "@mui/material";
import { createRef, useEffect, useState } from "react";
import Header from "./Header";
import logo from "./img/logo.webp";
import Footer from "./Footer";
import { Spinner } from "./Loading";
import axiosConfig from "./axiosConfig";
import { lazy } from "react";
import ReactFileReader from "react-file-reader";
import moment from "moment";
import Compressor from "compressorjs";
import React from "react";
import BitScheme from "./BitScheme";
import RichTextEditor from "./TextArea";

const OrdersList = lazy(() => import("./OrdersList.js"));
const ProductList = lazy(() => import("./MerchList.js"));
const UserList = lazy(() => import("./UsersList.js"));
const ConsoleList = lazy(() => import("./ConsoleList.js"));
const SubcatsList = lazy(() => import("./SubcatsList.js"));
const BrandsList = lazy(() => import("./BrandsList.js"));
const MuseumsList = lazy(() => import("./MuseumsList.js"));
const MerchCatList = lazy(() => import("./MerchCatList.js"));
const UploadList = lazy(() => import("./UploadsList.js"));
const SingleImageUpload = lazy(() => import("./SingleImageUpload"));

export function AddBlog(props) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableComments, setDisableComments] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    var blog = {
      author: JSON.parse(localStorage.getItem("username")),
      text: text,
      image: image,
      title: title,
      date: moment().format("DD-MM-YYYY"),
      addedby: JSON.parse(localStorage.getItem("userid")),
      info: info,
      thumbnail: image,
      disableComments: disableComments,
    };

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addblog",
      data: blog,
    };

    axiosConfig(config).then(function (response) {
      if (response.status === 200 && response.data.status) {
        console.log("Blog Added");
        props.onAdd(response.data.msg);
      } else {
        console.log(response.data.msg);
      }
    });
  }

  if (loading) return <Spinner />;
  return (
    <>
      {/* // <!-- Modal toggle --> */}
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        class="block mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Blog
      </button>

      {/* // <!-- Main modal --> */}
      {showModal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          class="flex fixed z-40 backdrop-blur-sm items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
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
                <span class="sr-only">Close modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                  Add Blog
                </h3>
                <form class="space-y-6" action="#">
                  <div className="mx-auto">
                    <SingleImageUpload image={image} onImageChange={setImage} />
                  </div>
                  <div class="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={disableComments}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        setDisableComments(e.target.checked);
                      }}
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Disable Comments
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Title"
                      required
                      onChange={(e, v) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      id="message"
                      rows="1"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Small info that tells what the blogs is about, a headliner"
                      onChange={(e, v) => setInfo(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    {/* <textarea
                      id="message"
                      rows="4"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      onChange={(e, v) => setText(e.target.value)}
                    ></textarea> */}
                    <RichTextEditor text={text} setText={setText} />
                  </div>

                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => {
                      onSubmit(e);
                      setShowModal(false);
                    }}
                  >
                    Submit
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

function BlogList(props) {
  var [blogs, setBlogs] = useState([]);
  var [search, setSearch] = useState("");
  var [showMore, setShowMore] = useState(false);

  function onUpdate(data) {
    var shallowCopy = blogs.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setBlogs(shallowCopy);
  }

  function fetchBlogs() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/blogs",
      params: { start: blogs.length },
    };

    axiosConfig(config).then(function (response) {
      if (response.status === 200) {
        var tempArr = blogs;
        tempArr = tempArr.concat(response.data.blogs || []);
        setBlogs(tempArr);
        setShowMore(!response.data.isEnd);
      } else setBlogs([]);
    });
  }
  useEffect(() => {
    fetchBlogs();
  }, []);

  function onAdd(item) {
    setBlogs((oldArray) => [...oldArray, item]);
  }

  var filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
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
        <AddBlog onAdd={onAdd} />
      </div>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Title
            </th>
            <th scope="col" class="px-6 py-3">
              Author
            </th>
            <th scope="col" class="px-6 py-3">
              Make Primary
            </th>
            <th scope="col" class="px-6 py-3">
              Make Secondary
            </th>
            <th scope="col" class="px-6 py-3">
              Edit Blog
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={blog.thumbnail}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">
                    {blog.title.substring(0, 50)}
                  </div>
                  <div class="font-normal text-gray-500">{blog._id}</div>
                </div>
              </th>
              <td class="px-6 py-4">{blog.author}</td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <button
                    class="font-medium bg-blue-600 rounded-xl px-3 py-2 text-white
                  hover:bg-blue-700"
                    onClick={() => {
                      var config = {
                        method: "get",
                        url: process.env.REACT_APP_API_BASE_URL + "/addtoMain",
                        params: {
                          userid: JSON.parse(localStorage.getItem("userid")),
                          id: blog._id,
                        },
                      };

                      axiosConfig(config).then(function (response) {
                        alert(response.data);
                      });
                    }}
                  >
                    Add to Primary
                  </button>
                </div>
              </td>

              <td class="px-6 py-4">
                <button
                  class="font-medium bg-blue-600 rounded-xl px-3 py-2 text-white
                  hover:bg-blue-700 focus:bg-green-700"
                  onClick={() => {
                    var config = {
                      method: "get",
                      url: process.env.REACT_APP_API_BASE_URL + "/setSecondary",
                      params: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: blog._id,
                      },
                    };

                    axiosConfig(config).then(function (response) {
                      alert(response.data);
                    });
                  }}
                >
                  {blog.isSecondary ? "Is Secondary" : "Make Secondary"}
                </button>
              </td>
              <td class="px-6 py-4">
                <EditBlog blog={blog} onUpdate={onUpdate} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    setBlogs(
                      blogs.filter((u) => {
                        return u._id !== blog._id;
                      })
                    );
                    var config = {
                      method: "post",
                      url: process.env.REACT_APP_API_BASE_URL + "/removeblog",
                      data: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: blog._id,
                      },
                    };

                    axiosConfig(config).then(function (response) {
                      if (response.status === 200) {
                        alert(response.data.msg);
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete Blog
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showMore && (
        <button
          onClick={() => fetchBlogs()}
          className="px-3 py-2 mt-2 bg-blue-600 text-white rounded-lg mx-auto"
        >
          Show More
        </button>
      )}
    </div>
  );
}

function EditBlog(props) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(props.blog.title);
  const [image, setImage] = useState(props.blog.image);
  const [text, setText] = useState(props.blog.text);
  const [info, setInfo] = useState(props.blog.info);
  const [loading, setLoading] = useState(false);
  const [disableComments, setDisableComments] = useState(
    props.blog.disableComments
  );

  function onSubmit(e) {
    e.preventDefault();
    var blog = {
      id: props.blog._id,
      author: props.blog.author,
      text: text,
      image: image,
      title: title,
      date: props.blog.date,
      addedby: props.blog.addedby,
      info: info,
      thumbnail: image,
      disableComments: disableComments,
    };

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editblog",
      data: blog,
    };

    axiosConfig(config).then(function (response) {
      if (response.status === 200 && response.data.status) {
        console.log("Blog Updated");
        props.onUpdate(blog);
      } else {
        console.log(response.data.msg);
      }
    });
  }

  if (loading) return <Spinner />;
  return (
    <>
      {/* // <!-- Modal toggle --> */}
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        class="block mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit Blog
      </button>

      {/* // <!-- Main modal --> */}
      {showModal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          class="flex fixed z-40 backdrop-blur-sm items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
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
                <span class="sr-only">Close modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                  Edit Blog
                </h3>
                <form class="space-y-6" action="#">
                  <div className="mx-auto">
                    <SingleImageUpload image={image} onImageChange={setImage} />
                  </div>
                  <div class="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={disableComments}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        setDisableComments(e.target.checked);
                      }}
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Disable Comments
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={title}
                      onChange={(e, v) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      id="message"
                      rows="1"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Small info that tells what the blogs is about, a headliner"
                      onChange={(e, v) => setInfo(e.target.value)}
                      value={info}
                    ></textarea>
                  </div>
                  <div>
                    <RichTextEditor text={text} setText={setText} />
                  </div>

                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => {
                      onSubmit(e);
                      setShowModal(false);
                    }}
                  >
                    Submit
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

function Dashboard(props) {
  var [stats, setStats] = useState(null);

  function getStats() {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/getstats",
    };

    axiosConfig(config).then(function (response) {
      if (response.status === 200) {
        setStats(response.data);
      }
    });
  }

  useEffect(() => {
    getStats();
  }, []);

  return stats === null ? (
    <Spinner />
  ) : (
    <div class="m-6">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:hover:bg-gray-700 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.users - 1}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Users</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:hover:bg-gray-700 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-orange-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.orders}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Orders</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:hover:bg-gray-700 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.products}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Products</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-2">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:dark:hover:bg-gray-700 hover:bg-gray-200 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.comments}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Comments</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-2">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:hover:bg-gray-700 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.brands}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Brands</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-2">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:hover:bg-gray-700 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.consoles}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Consoles</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-2">
          <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 dark:bg-gray-800  dark:hover:bg-gray-700 hover:bg-gray-200">
            <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl text-left font-semibold text-gray-700 dark:text-white">
                {stats.blogs}
              </h4>
              <div class="text-gray-500 dark:text-white">Total Blogs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightPanel(props) {
  if (props.page === "Users") {
    return <UserList />;
  } else if (props.page === "Orders") {
    return <OrdersList />;
  } else if (props.page === "Dashboard") {
    return <Dashboard />;
  } else if (props.page === "Blogs") {
    return <BlogList />;
  } else if (props.page === "Products") {
    return <ProductList />;
  } else if (props.page === "Consoles") {
    return <ConsoleList />;
  } else if (props.page === "Subcats") {
    return <SubcatsList />;
  } else if (props.page === "Brands") {
    return <BrandsList />;
  } else if (props.page === "Museums") {
    return <MuseumsList />;
  } else if (props.page === "UnapprovedConsoles") {
    return <ConsoleList unapproved />;
  } else if (props.page === "UnapprovedBrands") {
    return <BrandsList unapproved />;
  } else if (props.page === "MerchCatList") {
    return <MerchCatList />;
  } else if (props.page === "Uploads") {
    return <UploadList />;
  } else if (props.page === "BitScheme") {
    return <BitScheme fullscreen />;
  }
}

export default function AdminDashboard() {
  var [isAdmin, setIsAdmin] = useState(0);

  var [currentPage, setCurrentPage] = useState("Dashboard");
  var id = JSON.parse(localStorage.getItem("userid")) || null;
  var token = JSON.parse(localStorage.getItem("token")).token || null;
  useEffect(() => {
    if (id !== null && token !== null) {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/isadmin",
        data: { id: id, token: token },
      };

      axiosConfig(config).then((response) => {
        if (response.status === 200) {
          setIsAdmin(response.data ? 1 : 2);
        }
      });
    } else {
      setIsAdmin(2);
    }
  }, []);

  if (isAdmin === 2) {
    localStorage.clear();
    window.location = "/";
    // return (
    //   <div className="dark:bg-gray-900">
    //     <div className="min-h-screen">
    //       <Header />
    //       <p className="dark:text-white mt-5 mx-auto text-center text-8xl font-bold">
    //         404
    //       </p>

    //       <p className="dark:text-white mx-auto text-center text-xl font-bold">
    //         The page you are looking for does not exist
    //       </p>
    //     </div>
    //     <Footer />
    //   </div>
    // );
  }

  const menupanel = createRef(null);
  const displayMenu = () => {
    menupanel.current.classList.toggle("!translate-x-0");
  };

  return (
    <Stack spacing={1} className="bg-white dark:bg-gray-900">
      <Header />
      <div className="flex flex-col gap-1">
        <button
          onClick={() => displayMenu()}
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="float-left p-2 mb-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="logo-sidebar"
          className="absolute  cursor-pointer mt-auto mb-auto left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
          ref={menupanel}
        >
          <div className="h-full rounded-lg px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 border-2 dark:border-white">
            <div className="flex items-center pl-2.5 mb-5">
              <img src={logo} className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                CNH
              </span>
            </div>
            <ul className="space-y-2">
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Dashboard");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </div>
              </li>
              <p className="text-lg font-bold text-left dark:text-white">
                NostalgiaBase
              </p>
              <hr />
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Users");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Users
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Consoles");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Consoles
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("UnapprovedConsoles");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Consoles to Approve
                  </span>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Subcats");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Console Categories
                  </span>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Brands");
                    displayMenu();
                  }}
                  style={{
                    backgroundColor:
                      currentPage === "Brands"
                        ? "gray-800 dark:bg-gray-500"
                        : "gray-500 dark:bg-gray-800",
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Brands
                  </span>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    setCurrentPage("UnapprovedBrands");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Brands to Approve
                  </span>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Museums");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Museums & Kiosks
                  </span>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Blogs");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Blogs
                  </span>
                </div>
              </li>
              <p className="text-lg font-bold text-left dark:text-white">
                Store
              </p>
              <hr />
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Products");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Products
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Orders");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Orders
                  </span>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    setCurrentPage("MerchCatList");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Product Categories
                  </span>
                </div>
              </li>
              <p className="text-lg font-bold text-left dark:text-white">
                User Uploads
              </p>
              <hr />
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("Uploads");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    User Uploads
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    setCurrentPage("BitScheme");
                    displayMenu();
                  }}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Bit Scheme
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64 bg-white dark:bg-gray-900 min-h-screen">
          <RightPanel page={currentPage} />
        </div>
      </div>
      <Footer />
    </Stack>
  );
}
