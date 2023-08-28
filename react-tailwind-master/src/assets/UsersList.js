import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import icon from "./img/defaulticon.webp";

export default function UserList(props) {
  var [search, setSearch] = useState("");
  var [users, setUsers] = useState([]);
  var filteredUsers;
  var [showMore, setShowMore] = useState();

  function fetchData() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allusers",
      params: {
        id: JSON.parse(localStorage.getItem("userid")),
        start: users.length,
      },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var usrs = users;
        usrs = usrs.concat(response.data.users);
        setUsers(usrs);
        setShowMore(!response.data.isEnd);
      } else {
        setUsers([]);
        setShowMore(false);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onUpdate(data) {
    var shallowCopy = users.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setUsers(shallowCopy);
  }

  var filteredUsers =
    users !== null
      ? users.filter((user) => {
          return user.username.includes(search);
        })
      : [];

  if (!users) return <Loading />;
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
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              User
            </th>
            <th scope="col" class="px-6 py-3">
              Position
            </th>
            <th scope="col" class="px-6 py-3">
              Bits
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
          {filteredUsers.map((user) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link
                  to={`/profilepage/${user._id}`}
                  className="flex flex-row gap-2"
                >
                  <img
                    class="w-10 h-10 rounded-full"
                    src={user.thumbnail ? user.thumbnail : icon}
                    alt="Jese image"
                  />
                  <div>
                    <div class="text-base font-semibold">{user.username}</div>
                    <div class="font-normal text-gray-500">{user.email}</div>
                  </div>
                </Link>
              </th>
              <td class="px-6 py-4">
                {user.isPremium ? "Premium User" : "Standard User"}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  {user.wallet.bits}
                </div>
              </td>

              <td class="px-6 py-4">
                <EditProfile onUpdate={onUpdate} profile={user} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    setUsers(
                      users.filter((u) => {
                        return user._id !== u._id;
                      })
                    );
                    var config = {
                      method: "post",
                      url: process.env.REACT_APP_API_BASE_URL + "/removeuser",
                      data: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: user._id,
                      },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        console.log(response.data);
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete User
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
function EditProfile(props) {
  var [showModal, setShowModal] = useState(false);
  var [bits, setBits] = useState(props.profile.wallet.bits);

  function onSubmit(e) {
    e.preventDefault();

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/updatebits",
      data: { id: props.profile._id, bits: bits },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var prof = props.profile;
        prof.wallet.bits = bits;
        props.onUpdate(prof);
        console.log(response.data);
      }
    });
    setShowModal(false);
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="font-medium bg-blue-600 rounded-xl px-3 py-2 text-white hover:bg-blue-700"
      >
        Edit User
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
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
                  Edit Profile
                </h3>
                <form className="space-y-2" action="#">
                  <div>
                    <label
                      for="email"
                      class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bits
                    </label>
                    <input
                      type="Number"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Bits"
                      required
                      value={bits}
                      onChange={(e) => {
                        setBits(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-evenly">
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
