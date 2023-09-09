import { useEffect, useState } from "react";
import ImageGrid from "./ImageGrid";
import axiosConfig from "./axiosConfig";

export default function EarnBits() {
  const [images, setImages] = useState([]);
  const [uploadModal, setShowUploadModal] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState({});
  const fetchBitAwards = () => {
    axiosConfig
      .get(process.env.REACT_APP_API_BASE_URL + "/getBitsAward")
      .then((response) => {
        if (response.status === 200) {
          setOptions(Object.keys(response.data));
        }
      });
  };

  useEffect(() => {
    fetchBitAwards();
  });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setShowUploadModal(true);
          }}
          className="px-3 text-sm text-white rounded-lg py-2 bg-blue-600 hover:blue-700"
        >
          Earn Bits
        </button>
      </div>
      {uploadModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden md:inset-0 h-[calc(80%-1rem)] md:h-full max-h-[100%]"
        >
          <div className="relative w-full h-full max-w-lg h-auto max-h-[90%]">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
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
                      <p className="font-bold text-sm dark:text-white text-left">
                        Add Images
                      </p>
                      <ImageGrid
                        images={images}
                        setImages={setImages}
                        limit={3}
                        // setImagesHaveChanged={setImagesHaveChanged}
                        // setThumbnail={setThumbnail}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          images.length > 0 &&
                          description.length > 0 &&
                          selectedOption !== " Select an option:"
                        ) {
                          var config = {
                            method: "post",
                            url:
                              process.env.REACT_APP_API_BASE_URL +
                              "/addrequest",
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
                          axiosConfig(config).then((res) => {
                            if (res.status === 200) {
                              alert("Request added succesfully");
                              setShowUploadModal(false);
                            } else {
                              alert("Error: Request could not be added.");
                            }
                          });
                        } else {
                          alert("Fill the fields correctly!");
                        }
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
    </div>
  );
}
