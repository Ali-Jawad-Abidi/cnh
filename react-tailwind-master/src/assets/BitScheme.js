import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BitScheme(props) {
  const [showModal, setShowModal] = useState(false);
  const [bitAwards, setBitAwards] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [conversionRate, setConversionRate] = useState();
  const [newConversionRate, setNewConversionRate] = useState();
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    fetchBitAwards();
    fetchConversionRate();
  }, []);

  function fetchConversionRate() {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/conversionRate")
      .then((response) => {
        if (response.status === 200) {
          setConversionRate(response.data);
        }
      });
  }
  const fetchBitAwards = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/getBitsAward")
      .then((response) => {
        if (response.status === 200) {
          setBitAwards(response.data);
        }
      });
  };

  const handleEdit = (key) => {
    setEditedValues({ ...editedValues, [key]: bitAwards[key] });
  };

  const handleInputChange = (key, value) => {
    setEditedValues({ ...editedValues, [key]: value });
  };

  const handleSubmit = (key) => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/editAward", {
        params: { key: key, value: editedValues[key] },
      })
      .then((response) => {
        if (response.status === 200) {
          fetchBitAwards(); // Refresh the data from the server
          setEditedValues({ ...editedValues, [key]: undefined }); // Clear the edited value
        }
      });
  };

  const handleSubmitNewEntry = (e) => {
    e.preventDefault();

    // Create a copy of the backend object
    const updatedObject = { ...bitAwards };

    // Add the new key-value pair to the object
    updatedObject[newKey] = newValue;

    // Send a request to update the object on the backend

    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/addAward",
      params: {
        key: newKey,
        value: newValue,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          // If the backend update is successful, update the state with the new object
          setBitAwards(updatedObject);
          // Clear the input fields
          setNewKey("");
          setNewValue("");
          setShowAddModal(false);
        }
      })
      .catch((error) => {
        console.error("Error updating object:", error);
      });
  };

  if (props.fullscreen) {
    return (
      <>
        <div className="mb-2">
          <p className="text-bold text-sm text-center dark:text-white">
            1 Pound Sterling Equals{" "}
            <p className="font-bold text-xl text-center dark:text-white">
              {conversionRate + " bits"}
            </p>
          </p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <input
                type="number"
                id="last_name"
                class="bg-gray-50 max-w-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={conversionRate}
                min={0}
                onChange={(e) => {
                  setNewConversionRate(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  setShowSubmitButton(false);
                  axios
                    .post(
                      process.env.REACT_APP_API_BASE_URL + "/setConversionRate",
                      { conversionRate: newConversionRate }
                    )
                    .then((response) => {
                      if (response.status === 200) {
                        setConversionRate(newConversionRate);
                      }
                    });
                }}
                className="bg-blue-600 hover:bg-blue-700 px-2 py-1 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
            <button
              className="float-left my-2 px-4 py-2 bg-blue-600 rounded-lg text-sm text-white"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Add Entry
            </button>
          </div>
        </div>
        {showAddModal && (
          <div
            id="authentication-modal"
            tabIndex="-1"
            className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden md:inset-0 h-[calc(80%-1rem)] md:h-full max-h-[100%]"
          >
            <div className="relative w-full h-full max-w-lg h-auto max-h-[90%]">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
                <div className="py-2">
                  <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Bits Scheme
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="defaultModal"
                      onClick={() => {
                        setShowAddModal(false);
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
                  <div class="px-4 my-2 space-y-6">
                    <form onSubmit={handleSubmitNewEntry}>
                      <div>
                        <label
                          for="first_name"
                          class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Award Type
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Award Type"
                          required
                          onChange={(e) => {
                            setNewKey(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          for="last_name"
                          class="block text-left  my-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Bits
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Bits"
                          required
                          onChange={(e) => {
                            setNewValue(e.target.value);
                          }}
                        />

                        <button
                          type="submit"
                          className="bg-blue-600 text-white my-2 mt-4 hover:bg-blue-700 px-2 py-1 rounded-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Reward
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bitAwards).map(([key, value]) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {key}
                </th>
                <td className="px-6 py-4">
                  {editedValues[key] !== undefined ? (
                    <input
                      type="number"
                      placeholder={value}
                      className="block w-24 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={editedValues[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  ) : (
                    value
                  )}
                </td>
                <td className="px-6 py-4">
                  {editedValues[key] !== undefined ? (
                    <button
                      type="button"
                      className="bg-blue-500 text-white hover:bg-blue-700 px-1 py-1 rounded-lg transition-opacity duration-300 focus:outline-none focus:ring focus:ring-blue-500 group-focus:opacity-100"
                      onClick={() => handleSubmit(key)}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 text-white hover:bg-blue-700 px-1 py-1 rounded-lg transition-opacity duration-300 focus:outline-none focus:ring focus:ring-blue-500 group-focus:opacity-100"
                      onClick={() => handleEdit(key)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td class="px-6 py-4">
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this entry?")
                      ) {
                        var config = {
                          method: "get",
                          url:
                            process.env.REACT_APP_API_BASE_URL + "/removeAward",
                          params: { key: key },
                        };
                        axios(config).then((response) => {
                          if (response.status === 200) {
                            const updatedState = { ...bitAwards };
                            delete updatedState[key];

                            // Update the state with the new object
                            setBitAwards(updatedState);
                          }
                        });
                      }
                    }}
                    className="bg-red-600 rounded-lg text-white px-2 py-1 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <div>
        <button
          className="px-3 py-2 bg-blue-600 rounded-lg text-sm text-white"
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
                <div className="py-2">
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
                  <div class="space-y-6">
                    <p className="text-bold text-sm text-left ml-6 dark:text-white">
                      According to current conversion rate, number of bits in 1
                      £ are{" "}
                      <span className="font-bold text-xl dark:text-white">
                        {conversionRate}
                      </span>
                    </p>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Action
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Reward
                          </th>
                          {/* <th scope="col" class="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(bitAwards).map(([key, value]) => (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {key}
                            </th>
                            <td class="px-6 py-4">{value}</td>
                            {/* <td class="px-6 py-4">Laptop</td>
                          <td class="px-6 py-4">$2999</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
