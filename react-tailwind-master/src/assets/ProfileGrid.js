import React from "react";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileCard(props) {
  return (
    <>
      <div className="group border-gray-700 dark:border-white  shadow flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-md dark:bg-gray-700">
        <Link
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          to={`/merchitem/${props.profile._id}`}
        >
          <img
            class="peer absolute top-0 right-0 h-full w-full object-cover"
            src={props.profile.image}
            alt="product image"
          />
        </Link>
        <div className="mt-2 px-5 pb-2">
          <h5 className="text-xl tracking-tight uppercase text-gray-700 h-auto dark:text-white">
            {props.profile.username}
          </h5>
          <div className=" flex flex-col items-center justify-between">
            <p>
              <span className="pt-1 text-3xl font-bold text-gray-700 dark:text-white">
                {props.profile.wallet.bits}
                <p className="text-emerald-400">Bits</p>
              </span>
            </p>
          </div>
          <EditProfile profile={props.profile} />
        </div>
      </div>
    </>
  );
}

function EditProfile(props) {
  var [showModal, setShowModal] = useState(false);
  var [bits, setBits] = useState(props.profile.wallet.bits);

  function onSubmit(e) {
    e.preventDefault();

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editbits",
      data: { id: props.profile._id, bits: bits },
    };

    axios(config).then(function (response) {
      alert(response.data);
    });
  }
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Edit
      </div>
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

export default function ProfileGrid() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/allusers",
      params: { id: JSON.parse(localStorage.getItem("userid")) },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setUsers(response.data);
      }
    });
  }, []);

  if (users === null) return <Loading />;
  return (
    <>
      <Grid container columnSpacing={1}>
        {users.map((user) => (
          <Grid item xs={6} sm={6} md={3}>
            <ProfileCard profile={user} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
