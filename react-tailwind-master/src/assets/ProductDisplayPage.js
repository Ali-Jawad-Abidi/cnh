import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentBox from "./CommentBox";
import Loading from "./Loading";
import Rating from "@mui/material/Rating";
import Header from "./Header";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import Breadcrumb from "./BreadCrumb";
import { useLocation } from "react-router-dom";

function Slider(props) {
  var images = props.con.images;
  var [previewImage, setPreviewImage] = useState(images[0]);
  var [index, setIndex] = useState(0);

  function preview(i) {
    setPreviewImage(images[i % images.length]);
    setIndex(i % (images.length - 1));
  }
  function nextPreview() {
    var step = (index + 1) % images.length;
    setPreviewImage(images[step]);
    setIndex(step);
  }
  function prevPreview() {
    var step = index - 1 < 0 ? images.length - 1 : index - 1;
    setPreviewImage(images[step]);
    setIndex(step);
  }

  return (
    <div className="bg-gray-200 w-full dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <p className="font-bold text-xl dark:text-white text-left uppercase	">
          {props.con.name}
        </p>
        <div className="text-right">
          <button className="bg-blue-600 text-white text-sm rounded-lg px-3 py-2 mr-2">
            Badge
          </button>
          <Tooltip
            title={props.red ? "Added to Collection" : "Add to Collection"}
            placement="bottom"
          >
            <FavoriteIcon
              fontSize="large"
              style={{ cursor: "pointer", color: props.red ? "red" : "black" }}
              onClick={() => {
                if (localStorage.getItem("userid")) {
                  props.setIsRed(!props.red);
                  var config = {
                    method: "get",
                    url:
                      process.env.REACT_APP_API_BASE_URL + "/addtocollection",
                    params: {
                      con: props.con._id,
                      user: JSON.parse(localStorage.getItem("userid")),
                    },
                  };

                  axios(config).then((response) => {
                    console.log(response.data);
                  });
                } else {
                  alert("Please Login to add consoles to collection");
                }
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className="relative">
        <img
          src={previewImage}
          alt="console images"
          className="lg:h-96 h-72 lg:w-[50vw] w-[100vw] mx-auto my-2 object-cover rounded-lg mb-2"
        />
        <div className="directions absolute inset-x-0 top-1/2 flex items-end justify-between">
          <button
            onClick={prevPreview}
            className="back-arrow w-14 h-14 bg-white rounded-full"
          >
            <i className="flex text-black items-center justify-center text-2xl hover:text-black">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </i>
          </button>
          <button
            onClick={nextPreview}
            className="next-arrow w-14 h-14 bg-white rounded-full"
          >
            <i className="flex items-center text-black justify-center m-auto text-2xl hover:text-black">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </i>
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center justify-center">
        {images.map((item, i) => (
          <img
            src={item}
            id={i}
            onClick={(e) => {
              preview(e.target.id);
            }}
            alt="console images"
            className="lg:h-24 h-12 w-1/5 object-cover rounded-lg cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

function WhereToBuy(props) {
  return (
    <div className="rounded-lg shadow-lg dark:bg-gray-800 dark:text-white py-2 mb-2">
      <p className="text-xl font-bold dark:text-white text-center">
        Where to Buy
      </p>
      <ul>
        {props.links &&
          props.links[0].split(".").map((i, index) => (
            <li>
              <a target="_blank" href={i} style={{ textDecoration: "none" }}>
                <p className="text-left">Link{" " + index}</p>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

function Guides(props) {
  var [documents, setDocuments] = useState([]);
  var [showModal, setShowModal] = useState(false);
  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getdocuments",
      params: {
        ids: props.con.documents,
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
  return (
    <div className="p-6 rounded-lg shadow-xl dark:text-white dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold dark:text-white text-center">Guides</p>
        <ul className="list-disc">
          {documents.slice(0, 5).map((doc, index) => (
            <li className="hover:underline">
              <a key={index} download={doc.name} href={doc.content}>
                <p className="text-left text-sm">Document {index + 1}</p>
              </a>
            </li>
          ))}
        </ul>
        {documents.length > 5 && (
          <div
            onClick={() => setShowModal(true)}
            className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Show More
          </div>
        )}
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
                    Guides
                  </h3>
                  <ul className="list-disc p-4">
                    {documents.map((doc, index) => (
                      <li className="hover:underline">
                        <a key={index} download={doc.name} href={doc.content}>
                          <Typography
                            align="left"
                            noWrap
                            variant="inherit"
                            style={{ overflow: "none" }}
                          >
                            {doc.name}
                          </Typography>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommonFaults(props) {
  var [commonFaults, setCommonFaults] = useState(
    props.con.commonfaults ? props.con.commonfaults : []
  );
  var [showModal, setShowModal] = useState(false);
  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getfaults",
      params: {
        ids: props.con.commonfaults,
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
  return (
    <div className="p-6 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg">
      <div className="flex flex-col">
        <p className="text-xl font-bold dark:text-white text-center">
          Common Faults
        </p>
        <ul className="list-disc p-2">
          {commonFaults.slice(0, 5).map((doc, index) => (
            <li className="hover:underline">
              <a key={index} download={doc.name} href={doc.content}>
                <p className="text-sm dark:text-white text-left">{doc.name}</p>
              </a>
            </li>
          ))}
        </ul>

        {commonFaults.length > 5 && (
          <div
            onClick={() => setShowModal(true)}
            className="mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Show More
          </div>
        )}
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
                    Common Faults
                  </h3>
                  <ul className="list-disc p-4">
                    {commonFaults.map((doc, index) => (
                      <li className="hover:underline">
                        <a key={index} download={doc.name} href={doc.content}>
                          <Typography
                            align="left"
                            noWrap
                            variant="inherit"
                            style={{ overflow: "none" }}
                          >
                            {doc.name}
                          </Typography>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WhereAmI(props) {
  return (
    <div className="p-5 rounded-lg shadow-xl dark:text-white dark:bg-gray-800">
      <p className="text-xl font-bold dark:text-white text-center">
        Where Am I?
      </p>

      <p className="text-sm dark:text-white text-left">
        At:{" "}
        <a class="underline text-blue-600" href={props.con.whereami.location}>
          Location
        </a>
      </p>

      <p className="text-sm  dark:text-white text-left">
        From: {" " + props.con.whereami.from}
      </p>

      <p className="text-sm  dark:text-white text-left">
        To: {" " + props.con.whereami.to}
      </p>

      <a
        href={props.con.whereami.link}
        className="text-blue-600 hover:underline"
      >
        <p className="text-sm dark:text-white text-left">
          Visit:{" Link to console "}
        </p>
      </a>
    </div>
  );
}

function ExternalLinks(props) {
  var [links, setLinks] = useState(props.links);

  return (
    <div className="p-5 rounded-lg shadow-xl dark:text-white dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold dark:text-white text-center">
          External Links
        </p>
        <ul className="list-disc">
          {links.slice(0, 5).map((link, index) => (
            <li>
              <a href={link} style={{ textDecoration: "none" }}>
                <p className="text-sm text-left dark:text-white hover:underline">
                  {"Link " + (index + 1)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {links.length > 5 && (
        <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          Show More
        </button>
      )}
    </div>
  );
}

export default function ProductDisplayPage(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Id = searchParams.get(useParams().con);
  var [con, setCon] = useState(null);
  var [subcat, setSubCat] = useState(null);
  var [brand, setBrand] = useState(null);
  var [isred, setIsRed] = useState(false);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/getconsole",
      params: { id: Id },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setCon(response.data);

        if ("userid" in localStorage) {
          config = {
            method: "get",
            url: process.env.REACT_APP_API_BASE_URL + "/getifliked",
            params: {
              con: Id,
              user: JSON.parse(localStorage.getItem("userid")),
            },
          };

          axios(config).then(function (response) {
            if (response.status === 200) {
              console.log(response.data);
              setIsRed(response.data);
            }
          });
        }
      }
      //   console.log(response.data);
      //   console.log(con);
      //   var config = {
      //     method: "get",
      //     url: process.env.REACT_APP_API_BASE_URL + "/subcat",
      //     params: {
      //       id: response.data.subcat,
      //     },
      //   };
      //   axios(config).then(function (response) {
      //     if (response.status === 200) {
      //       setSubCat(response.data);
      //       var config = {
      //         method: "get",
      //         url: process.env.REACT_APP_API_BASE_URL + "/brand",
      //         params: {
      //           id: response.data.brand,
      //         },
      //       };
      //       axios(config).then((response) => {
      //         if (response.status === 200) {
      //           setBrand(response.data[0]);
      //         }
      //       });
      //     }
      //   });
      // }
    });
  }, [Id]);
  if (con === null) {
    return <Loading />;
  } else
    return (
      <div>
        <Header />
        <Breadcrumb />
        <div className="flex lg:flex-row flex-col gap-2 my-4 lg:mx-12 mx-4">
          <div className="flex flex-col gap-2 lg:w-2/3">
            <Slider con={con} red={isred} setIsRed={setIsRed} />
            <div>
              <div className="dark:bg-gray-800 rounded-lg p-4 text-left">
                <p className="font-bold whitespace-pre-wrap text-xl dark:text-white ">
                  Description
                </p>
                <p className="text-sm dark:text-white whitespace-pre-wrap">
                  {con.description}
                </p>
              </div>
              <div className="hidden mt-2 lg:block">
                <CommentBox
                  type="console"
                  post={con._id}
                  comments={con.comments}
                />
              </div>
            </div>
          </div>

          <div className="dark:bg-gray-800 sm:w-full flex flex-col dark:text-white rounded-lg p-5 lg:w-1/3">
            <div className="flex flex-col gap-2">
              <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Rating
                  </dt>
                  <dd class="text-lg font-semibold">
                    <Rating value={con.rating} readOnly />
                  </dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Release Type
                  </dt>
                  <dd class="text-lg font-semibold">{con.releasetype}</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Regional Code
                  </dt>
                  <dd class="text-lg font-semibold">{con.regionalcode}</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Color
                  </dt>
                  <dd class="text-lg font-semibold">{con.color}</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Desire
                  </dt>
                  <dd class="text-lg font-semibold">{con.desire}</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Country
                  </dt>
                  <dd class="text-lg font-semibold">{con.country}</dd>
                </div>
              </dl>
            </div>
            <hr className="mb-4" />
            <div className="flex flex-col gap-2">
              {!con.links.includes("") && <ExternalLinks links={con.links} />}
              {con.whereami.isavailable && <WhereAmI con={con} />}
              {con.commonfaults.length > 0 && <CommonFaults con={con} />}
              {con.documents.length > 0 && <Guides con={con} />}
              <WhereToBuy />
              <div className="lg:hidden block">
                <CommentBox
                  type="console"
                  post={con._id}
                  comments={con.comments}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}
