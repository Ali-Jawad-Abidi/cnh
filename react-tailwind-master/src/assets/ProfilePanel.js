import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import axios from "axios";
import { Spinner } from "./Loading";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import icon from "./img/defaulticon.webp";

export function ProfileDisplay(props) {
  var user = props.user;
  var [TwoFA, set2FA] = useState(user.twoFactorEnabled);
  var [image, setImage] = useState(
    user.image ? (user.image.length > 0 ? user.image : icon) : icon
  );
  return (
    <div className="flex flex-col pt-4 h-[100vh] bg-white dark:bg-gray-900 rounded-lg">
      <div className="w-full flex flex-row justify-between">
        <div>
          <button
            type="button"
            className="-m-2 ml-2 p-2 text-gray-400 hover:text-gray-500 dark:text-white"
            onClick={() => props.close()}
          >
            <span className="sr-only dark:text-white">Close panel</span>
            <CloseIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div>
          <Link
            to={"/logout"}
            className="px-3 mr-2 text-sm text-white text-center rounded-lg py-2 bg-red-600 hover:red-700"
            onClick={() => {
              localStorage.setItem(
                "redirectTo",
                JSON.stringify(window.location.pathname)
              );
            }}
          >
            Logout
          </Link>
        </div>
      </div>

      <div className="relative mt-8 flex flex-col items-center rounded-[20px] w-[400px] mx-auto bg-clip-border shadow-3xl bg-gray-200 shadow-shadow-500 dark:bg-gray-900 dark:text-white dark:!shadow-none mt-4 py-2">
        <img
          src={
            "https://c4.wallpaperflare.com/wallpaper/854/284/906/pacman-maze-harassment-wallpaper-preview.jpg"
          }
          className="w-full h-24 object-cover"
        />
        <div className="flex flex-row gap-2 justify-center items-center">
          {/* <div className="relative"> */}
          <img className="h-16 w-auto rounded-full" src={image} alt="" />
          {/* <label className="absolute -bottom-2 px-0.5 text-xs right-2 bg-blue-500 text-white rounded-md"> */}
          {/* <input
                accept="image/*"
                type="file"
                className="hidden"
                onChange={(e) => {
                  new Compressor(e.target.files[0], {
                    quality: 0.8,
                    maxHeight: 360,
                    maxWidth: 640,
                    mimeType: ["image/webp"], // 0.6 can also be used, but its not recommended to go below.
                    success: (compressedResult) => {
                      var reader = new FileReader();
                      reader.readAsDataURL(compressedResult);
                      reader.onloadend = function () {
                        var base64String = reader.result;
                        setImage(base64String);

                        var config = {
                          method: "post",
                          url:
                            process.env.REACT_APP_API_BASE_URL +
                            "/changedisplay",
                          data: {
                            id: JSON.parse(localStorage.getItem("userid")),
                            image: base64String,
                          },
                        };

                        axios(config).then((response) => {
                          if (response.status === 200) {
                            localStorage.setItem(
                              "profileImage",
                              JSON.stringify(base64String)
                            );
                            alert("Profile Photo Updated");
                          } else {
                            alert("Profile Photo Update Failed!");
                          }
                        });
                      };
                    },
                  });
                }}
              />
              Change
            </label>
          </div> */}

          <div className="flex flex-col items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {user.username.toUpperCase()}
            </h4>
            {user.isAdmin ? (
              <Link to="/xGpAQhWobyTxIPx51LAKKOGnrWZNUtcOImuVUIPdqc=">
                <button className="bg-blue-600 px-3 py-1 text-white rounded-lg">
                  Admindashboard
                </button>
              </Link>
            ) : (
              <Link
                to={`/profilepage/${props.id}`}
                className="bg-blue-600 text-white px-1 py-2 rounded-lg"
              >
                See Full Profile
              </Link>
            )}
          </div>
        </div>
        <div className="mt-4 dark:bg-gray-800 p-2 rounded-lg flex gap-14 md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {user.bits}
            </p>
            <p className="text-sm font-normal text-gray-600">Bits</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {user.country}
            </p>
            <p className="text-sm font-normal text-gray-600">Country</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {user.verified ? "IS" : "NOT"}
            </p>
            <p className="text-sm font-normal text-gray-600">Verified</p>
          </div>
        </div>
        {/* <div class="flex items-center mb-4 mt-2">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            class="w-4 cursor-pointer h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => {
              var config = {
                method: "get",
                url: process.env.REACT_APP_API_BASE_URL + "/twofa",
                params: {
                  id: JSON.parse(localStorage.getItem("userid")),
                  value: !TwoFA,
                },
              };
              axios(config);
              set2FA(!TwoFA);
            }}
          />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Disable 2FA
          </label>
        </div> */}
      </div>
    </div>
  );
}

export default function ProfilePanel(props) {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(null);
  var id = (id = JSON.parse(localStorage.getItem("userid")));

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/mycollection",
      params: {
        id: id,
      },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setUser(response.data);
      }
    });
  }, []);
  return !user ? (
    <Spinner />
  ) : (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-x">
          <div className="absolute inset-0 overflow-scroll">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md scroll">
                  <ProfileDisplay
                    user={user}
                    id={id}
                    close={() => {
                      setOpen(false);
                    }}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
