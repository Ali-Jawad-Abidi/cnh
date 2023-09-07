import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BitScheme from "./BitScheme";
import { Link } from "react-router-dom";
import EarnBits from "./EarnBits";
import { Grid } from "@mui/material";

function InformationModal(props) {
  if (props.item !== null) {
    return (
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="fixed inset-0 z-40 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => {
                props.close();
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
                User Uploads
              </h3>
              <div className="rounded-lg p-2">
                <div className="flex flex-row w-full gap-2 dark:bg-gray-700 p-2 rounded-lg">
                  {props.item.images.map((img) => (
                    <img
                      className="w-24 h-auto rounded-lg"
                      src={img}
                      alt="item image list"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <Link to={`/profilepage/${props.item.user}`}>
                      <li className="text-sm dark:text-white font-semibold text-left">
                        User:{" "}
                        <span className="bg-blue-600 rounded-lg px-1 py-1">
                          {props.item.username}
                        </span>
                      </li>
                    </Link>
                    <li className="text-sm dark:text-white font-semibold text-left">
                      Upload Type: {props.item.type}
                    </li>
                    <li className="text-sm dark:text-white font-semibold text-left">
                      Description: {props.item.description}
                    </li>
                    <li className="text-sm dark:text-white font-semibold text-left">
                      Reason of Rejection: {props.item.reason}
                    </li>
                    <li className="text-sm dark:text-white font-semibold text-left">
                      Status: {props.item.BitsStatus}
                    </li>
                    <li className="text-sm dark:text-white font-semibold text-left">
                      Info: {props.item.BitsString}
                    </li>
                    <li className="text-sm dark:text-white font-semibold text-left">
                      Bits: {props.item.Bits}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function BitsLogs() {
  const options = [
    "Correcting a mistake",
    "Referring a friend to patreon",
    "Wearing cnh merch",
    "Shared something brand new",
    "Brand new information from another source",
    "New article gets picked up by another website",
  ];
  const [bitshistory, setBitHistory] = useState([]);

  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    var config = {
      url: process.env.REACT_APP_API_BASE_URL + "/bitlogs",
      method: "get",
    };

    axios(config).then((response) => {
      if (response.status === 200) {
        setBitHistory(response.data);
      }
    });
  }, []);
  return (
    <div class="dark:bg-gray-900">
      <Header />
      <Grid container>
        <Grid item xs={1} md={1} sm={1}></Grid>
        <Grid item xs={10} md={10} sm={10}>
          <div className="px-4 flex flex-row gap-2 my-2">
            <InformationModal
              item={modalItem}
              close={() => setModalItem(null)}
            />
            <BitScheme />
            <EarnBits />
          </div>
          <div className="min-h-screen min-w-screen px-4">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left overflow-y-scroll text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Info
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Rejection Reason
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
                  {bitshistory.map((con) => (
                    <tr
                      onClick={() => {
                        setModalItem(con);
                      }}
                      class="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-900"
                    >
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
                          <div class="text-xs font-semibold">
                            {con.BitsString}
                          </div>
                          <div class="font-normal text-gray-500">
                            {con.description}
                          </div>
                        </div>
                      </th>
                      <td class="px-6 py-4 overflow-x-auto max-w-xs">
                        <div class="truncate text-xs">{con.reason}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap overflow-x-auto max-w-xs">
                        <div class="truncate">
                          {con.BitsDate.substring(0, 10)}
                        </div>
                      </td>
                      <td class="px-6 py-4">{con.Bits}</td>
                      <td class="px-6 py-4">{con.BitsStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
