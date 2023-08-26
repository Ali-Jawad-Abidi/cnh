import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Compressor from "compressorjs";

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
  const [images, setImages] = useState([]);
  const [uploadModal, setShowUploadModal] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  var [showModal, setShowModal] = useState(false);

  useEffect(() => {
    var config = {
      url: process.env.REACT_APP_API_BASE_URL + "/bitslog",
      method: "get",
      params: {
        id: localStorage.getItem("userid")
          ? JSON.parse(localStorage.getItem("userid"))
          : undefined,
      },
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
      <div className="px-4 flex flex-row gap-2">
        <button
          onClick={() => {
            setShowUploadModal(true);
          }}
          className="px-3 my-2 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
        >
          Earn Bits
        </button>
        <button
          className="px-3 my-2 bg-blue-600 rounded-lg text-sm text-white"
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
                      10 "bits" is equal to £1 on our store, but bits can not be
                      traded with other users or for real-world currency.
                      <br />
                      Bits can be earned through actions such as:
                      <br /> -Becoming a patreon member (one-off) - 50 bits
                      <br />
                      -Remaining a patreon member for 6 months - 100 bits
                      <br />
                      -Logging into the website for 7 consecutive days - 5 bits
                      <br /> -Correcting a mistake - 1 bit
                      <br /> -Referring a friend to patreon - 50 bits to you and
                      your friend
                      <br /> -Adding a new console to the base - 5 bits
                      <br />
                      -Wearing our merch and promoting us at a gaming event - 50
                      bits
                      <br /> -Earn the most points in a month win an additional
                      - 50 bits
                      <br /> -Share anything brand-new, never-before-seen
                      unreleased game-related - 500 bits
                      <br /> -Share any brand new information from another
                      source - 25 bits
                      <br /> -Create a new article or forum post that gets
                      picked up by another website or game source - 25 bits
                      <br />
                      Standard users can earn up to 25 points p/day Premium
                      users can earn up to 75 points p/day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
                                      reader.readAsDataURL(compressedResult);
                                      reader.onloadend = function () {
                                        var base64String = reader.result;
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
                            process.env.REACT_APP_API_BASE_URL + "/addrequest",
                          data: {
                            images: images,
                            description: description,
                            user: JSON.parse(localStorage.getItem("userid")),
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
                            alert("Error: Request could not be added.");
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
      <div className="min-h-screen px-4">
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
            {bitshistory.map((con) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-900">
                <th
                  scope="row"
                  class="flex justify-between px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <div class="text-sm">{con.BitsString}</div>
                  </div>
                </th>
                <td class="px-6 py-4 whitespace-nowrap overflow-x-auto max-w-xs">
                  <div class="truncate">{con.BitsDate}</div>
                </td>
                <td class="px-6 py-4">{con.Bits}</td>
                <td class="px-6 py-4">{con.BitsStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
