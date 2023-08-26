import { Grid } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import icon from "./img/defaulticon.webp";
import Compressor from "compressorjs";

export default function ProfilePage(props) {
  var [table, setTable] = useState("collection");
  var [user, setUser] = useState(null);
  var [showModal, setShowModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  var [image, setImage] = useState(icon);
  var [editEmail, setEditEmail] = useState(false);
  var [uploadModal, setShowUploadModal] = useState(false);
  var [images, setImages] = useState([]);
  var [updatedEmail, setUpdatedEmail] = useState();
  var [description, setDescription] = useState("");

  var currentUser = JSON.parse(localStorage.getItem("userid"));
  var id = useParams().id;

  var [ownProfile, setOwnProfile] = useState(currentUser === id ? true : false);
  var [error, setError] = useState("");

  const options = [
    "Correcting a mistake",
    "Referring a friend to patreon",
    "Wearing cnh merch",
    "Shared something brand new",
    "Brand new information from another source",
    "New article gets picked up by another website",
  ];

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/mycollection",
      params: { id: id },
    };

    axios(config).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        if (response.data === false) {
          // alert("User Not Found");
          setError("User Not Found");
        } else {
          setUser(response.data);
          setImage(response.data.image);
        }
      } else {
        // alert("User Not Found");
        setError("User Not Found");
      }
    });
  }, []);

  var href =
    "https://www.patreon.com/oauth2/authorize?response_type=code&client_id=AnpYLOzCTVhtpp8WzRe-8Y5Gk0l-FlSd2BPtUzMc_9oJMb2YP9Hz-WQYQOg14EXB&redirect_uri=http://localhost:3000/patreon";

  console.log(user);
  console.log(error);
  if (user === null && error === "") {
    return <Loading />;
  } else if (user === null && error !== "") {
    return (
      <div>
        <Header />
        <div class="min-h-screen bg-white dark:bg-gray-900">
          <p className="text-center text-xl font-bold text-red-600">{error}</p>
        </div>
        <Footer />
      </div>
    );
  } else if (user !== null && error === "")
    return (
      <div className="bg-white dark:bg-gray-900">
        <Header />
        <Grid container spacing={2} className="px-2 min-h-screen ">
          <Grid item xs={12} sm={12} md={3}>
            <div className="flex flex-col gap-4 dark:bg-gray-800 rounded-xl bg-gray-200">
              <div className="dark:bg-gray-800 rounded-lg p-2">
                {/* <img src={user.image} className=" object-cover" /> */}
                <div className="relative">
                  <img
                    className="mx-auto object-fill"
                    src={image === undefined ? icon : image}
                    alt=""
                  />
                  {ownProfile && (
                    <label className="absolute -bottom-2 px-0.5 py-1 text-sm cursor-pointer right-2 bg-blue-600 text-white rounded-md">
                      <input
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
                                    id: JSON.parse(
                                      localStorage.getItem("userid")
                                    ),
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
                      Change Profile Photo
                    </label>
                  )}
                </div>
                <p class="mt-2 dark:text-white text-xl font-bold text-center">
                  {user.username.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="dark:bg-gray-800 p-2 mx-4 rounded-lg flex justify-between p-4 border-solid border-4 dark:border-white border-gray-800">
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
                    <p className="text-sm font-normal text-gray-600">
                      Verified
                    </p>
                  </div>
                </div>
                <div className="dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-bold dark:text-white text-left">
                    Email Address
                  </p>
                  {!editEmail && (
                    <p className="text-sm dark:text-white text-left">
                      {user.email}
                    </p>
                  )}

                  {ownProfile && editEmail && (
                    <form>
                      <label
                        for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Updated Email
                      </label>
                      <div class="relative">
                        <input
                          type="search"
                          id="default-search"
                          class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="updated@email.com"
                          required
                        />
                        <div className="flex flex-row absolute right-2.5 bottom-1 gap-1">
                          <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                ownProfile &&
                                updatedEmail !== "" &&
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)
                              ) {
                                var config = {
                                  url:
                                    process.env.REACT_APP_API_BASE_URL +
                                    "/changeEmail",
                                  method: "get",
                                  params: {
                                    id: currentUser,
                                    updatedEmail: updatedEmail,
                                  },
                                };
                                axios(config).then((response) => {
                                  if (response.status === 200) {
                                    alert("Email Updated Successfully");
                                  } else {
                                    alert("Error: Couldn't update Email.");
                                  }
                                });
                              } else {
                                alert("Error: Couldn't update Email.");
                              }
                            }}
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  {ownProfile && !editEmail && (
                    <p
                      onClick={() => {
                        setEditEmail(true);
                      }}
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-1 py-1 rounded-lg"
                    >
                      Edit Email
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <div className="flex flex-row gap-4 mt-4 mx-auto my-2">
              <button
                onClick={() => {
                  setTable("collection");
                }}
                className="px-3 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
              >
                My Collection
              </button>
              <button
                onClick={() => {
                  setTable("orders");
                }}
                className="px-3 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  setTable("bitsWinning");
                }}
                className="px-3 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
              >
                Bits Winning
              </button>

              {/* <select
                id="countries"
                defaultValue={"collection"}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setTable(e.target.value)}
              >
                <option value={"collection"}>Show My Collection</option>
                <option value={"orders"}>Show My Orders</option>
                <option value={"bitsWinning"}>
                  Show My Bits Winning / Spending
                </option>
              </select> */}
              {ownProfile && (
                <>
                  <button
                    onClick={() => {
                      setShowUploadModal(true);
                    }}
                    className="px-3 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
                  >
                    Earn Bits
                  </button>
                  {uploadModal && (
                    <div
                      id="authentication-modal"
                      tabIndex="-1"
                      className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden md:inset-0 h-[calc(80%-1rem)] md:h-full max-h-[100%]"
                    >
                      <div className="relative w-full h-full max-w-lg h-auto max-h-[90%]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="px-6 py-6 lg:px-8">
                            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Earn Bits
                              </h3>
                              <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                                onClick={() => {
                                  setShowUploadModal(false);
                                }}
                              >
                                <svg
                                  aria-hidden="true"
                                  class="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                              </button>
                            </div>
                            <div>
                              <h3 className="dark:text-white text-left ">
                                Select an option:
                              </h3>
                              <select
                                className="w-full h-10 px-3 dark:bg-gray-700 dark:text-white py-2 border rounded-lg"
                                value={selectedOption}
                                onChange={(event) => {
                                  setSelectedOption(event.target.value);
                                }}
                              >
                                <option value="">Select an option</option>
                                {options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div class="p-2">
                              <div>
                                <label
                                  for="message"
                                  class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Your message
                                </label>
                                <textarea
                                  id="message"
                                  rows="4"
                                  required
                                  class="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write your thoughts here..."
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />
                              </div>
                              <div>
                                <div>
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
                                                  reader.readAsDataURL(
                                                    compressedResult
                                                  );
                                                  reader.onloadend =
                                                    function () {
                                                      var base64String =
                                                        reader.result;
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
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    var config = {
                                      method: "post",
                                      url:
                                        process.env.REACT_APP_API_BASE_URL +
                                        "/addrequest",
                                      data: {
                                        images: images,
                                        description: description,
                                        user: JSON.parse(
                                          localStorage.getItem("userid")
                                        ),
                                        type: selectedOption,
                                        username: JSON.parse(
                                          localStorage.getItem("username")
                                        ),
                                      },
                                    };
                                    console.log(config);
                                    axios(config).then((res) => {
                                      if (res.status === 200) {
                                        alert("Request added succesfully");
                                        setShowUploadModal(false);
                                      } else {
                                        alert(
                                          "Error: Request could not be added."
                                        );
                                      }
                                    });
                                  }}
                                  className="text-white text-md bg-blue-600 rounded-lg w-full py-2"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <a
                    href={href}
                    className="px-3 text-sm uppercase rounded-lg py-2 bg-white hover:bg-gray-200 text-red-600"
                  >
                    Patreon
                  </a>
                </>
              )}

              <button
                className="px-3 py-1 bg-blue-600 rounded-lg text-sm text-white"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Bits Scheme
              </button>
              {showModal && (
                <div
                  id="authentication-modal"
                  tabIndex="-1"
                  className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden md:inset-0 h-[calc(80%-1rem)] md:h-full max-h-[100%]"
                >
                  <div className="relative w-full h-full max-w-lg h-auto max-h-[90%]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="px-6 py-6 lg:px-8">
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Bits Scheme
                          </h3>
                          <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                            onClick={() => {
                              setShowModal(false);
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              class="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                          </button>
                        </div>
                        <div class="p-6 space-y-6">
                          <p class="text-sm leading-relaxed text-left text-gray-500 dark:text-gray-400">
                            10 "bits" is equal to £1 on our store, but bits can
                            not be traded with other users or for real-world
                            currency.
                            <br />
                            Bits can be earned through actions such as:
                            <br /> -Becoming a patreon member (one-off) - 50
                            bits
                            <br />
                            -Remaining a patreon member for 6 months - 100 bits
                            <br />
                            -Logging into the website for 7 consecutive days - 5
                            bits
                            <br /> -Correcting a mistake - 1 bit
                            <br /> -Referring a friend to patreon - 50 bits to
                            you and your friend
                            <br /> -Adding a new console to the base - 5 bits
                            <br />
                            -Wearing our merch and promoting us at a gaming
                            event - 50 bits
                            <br /> -Earn the most points in a month win an
                            additional - 50 bits
                            <br /> -Share anything brand-new, never-before-seen
                            unreleased game-related - 500 bits
                            <br /> -Share any brand new information from another
                            source - 25 bits
                            <br /> -Create a new article or forum post that gets
                            picked up by another website or game source - 25
                            bits
                            <br />
                            Standard users can earn up to 25 points p/day
                            Premium users can earn up to 75 points p/day
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {table === "collection" && (
              <div className="overflow-y-scroll">
                <table class="w-full text-sm text-left overflow-y-scroll text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Console
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Color
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.myconsoles.map((con) => (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <Link to={`/productpage/${con._id}`}>
                          <th
                            scope="row"
                            class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <img
                              class="w-10 h-10 rounded-full"
                              src={con.img}
                              alt="Jese image"
                            />
                            <div class="pl-3">
                              <div class="text-base font-semibold">
                                {con.name}
                              </div>
                              <div class="font-normal text-gray-500">
                                {con.country}
                              </div>
                            </div>
                          </th>
                        </Link>
                        <td class="px-6 py-4">{con.color}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {table === "orders" && (
              <table class="w-full text-sm text-left overflow-y-scroll text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Order
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.myOrders.map((con) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          class="w-10 h-10 rounded-full"
                          src={con.img}
                          alt="Jese image"
                        />
                        <div class="pl-3">
                          <div class="text-base font-semibold">
                            {con.payer_name}
                          </div>
                          <div class="font-normal text-gray-500">{con._id}</div>
                        </div>
                      </th>
                      <td class="px-6 py-4">{con.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {table === "bitsWinning" && (
              <table class="w-full text-sm text-left overflow-y-scroll text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Info
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Bits
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.bitshistory.map((con) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="flex justify-between px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div>
                          <div class="text-sm">{con.BitsString}</div>
                        </div>
                      </th>
                      <td class="px-6 py-4">{con.BitsDate}</td>
                      <td class="px-6 py-4">{con.Bits}</td>
                      <td class="px-6 py-4">{con.BitsStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
}
