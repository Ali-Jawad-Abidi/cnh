import { Grid } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axiosConfig from "./axiosConfig";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import icon from "./img/defaulticon.webp";
import Compressor from "compressorjs";
import BitScheme from "./BitScheme";
import EarnBits from "./EarnBits";

export default function ProfilePage(props) {
  var [table, setTable] = useState("collection");
  var [user, setUser] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");
  const [image, setImage] = useState(icon);
  const [editEmail, setEditEmail] = useState(false);
  const [uploadModal, setShowUploadModal] = useState(false);
  const [images, setImages] = useState([]);
  const [updatedEmail, setUpdatedEmail] = useState();
  const [description, setDescription] = useState("");

  var currentUser = JSON.parse(localStorage.getItem("userid"));
  var id = useParams().id;

  var [ownProfile, setOwnProfile] = useState(currentUser === id ? true : false);
  var [error, setError] = useState("");

  const fetchBitAwards = () => {
    axiosConfig
      .get(process.env.REACT_APP_API_BASE_URL + "/getBitsAward")
      .then((response) => {
        if (response.status === 200) {
          setBitAwards(response.data);
        }
      });
  };

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

    axiosConfig(config).then((response) => {
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

                                axiosConfig(config).then((response) => {
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
                        <textarea
                          type="search"
                          id="default-search"
                          rows="3"
                          class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="updated@email.com"
                          required
                          onChange={(e) => {
                            setUpdatedEmail(e.target.value);
                          }}
                        />
                        <div className="flex flex-row absolute right-2.5 bottom-1 gap-1">
                          <button
                            onClick={() => {
                              setEditEmail(false);
                            }}
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(updatedEmail);
                              console.log(
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)
                              );
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
                                axiosConfig(config).then((response) => {
                                  console.log(response);
                                  if (response.status === 200) {
                                    alert("Email Updated Successfully");
                                  } else {
                                    alert("Error: Couldn't update Email213.");
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
                className={
                  table === "collection"
                    ? "px-3 hover:bg-blue-700 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700 border-4 dark:border-gray-200 border-gray-900"
                    : "px-3 hover:bg-blue-700 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
                }
              >
                My Collection
              </button>
              <button
                onClick={() => {
                  setTable("orders");
                }}
                className={
                  table === "orders"
                    ? "px-3 hover:bg-blue-700 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700 border-4 dark:border-gray-200 border-gray-900"
                    : "px-3 hover:bg-blue-700 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
                }
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  setTable("bitsWinning");
                }}
                className={
                  table === "bitsWinning"
                    ? "px-3 hover:bg-blue-700 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700 border-4 dark:border-gray-200 border-gray-900"
                    : "px-3 hover:bg-blue-700 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
                }
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
                  <EarnBits />
                  <a
                    href={href}
                    className="px-2 text-sm uppercase rounded-lg py-2 bg-white hover:bg-gray-200 text-red-600"
                  >
                    Patreon
                  </a>
                </>
              )}

              <BitScheme />
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
