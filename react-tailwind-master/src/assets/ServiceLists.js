import { useEffect, useState } from "react";
import axiosConfig from "./axiosConfig";

export function AddService(props) {
  const [showModal, setShowModal] = useState(false);
  const [con, setCon] = useState(props.con);
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addservice",
      data: {
        id: props.con,
        type: props.type,
        service: service,
        price: price,
      },
    };

    axiosConfig(config).then(function (response) {
      if (response.status === 200 && response.data.status) {
        console.log("Service Added");
        props.onAdd(response.data.msg);
      } else {
        console.log(response.data.msg);
      }
    });
  }

  if (loading) return <Spinner />;
  return (
    <>
      {/* // <!-- Modal toggle --> */}
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        class="block mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        + Add Service
      </button>

      {/* // <!-- Main modal --> */}
      {showModal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          class="flex fixed z-40 backdrop-blur-sm items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
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
                <span class="sr-only">Close modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                  Add Service
                </h3>
                <form class="space-y-6 mt-4" action="#">
                  {/* <div className="mx-auto">
                    <SingleImageUpload image={image} onImageChange={setImage} />
                  </div> */}
                  {/* <div class="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={disableComments}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        setDisableComments(e.target.checked);
                      }}
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Disable Comments
                    </label>
                  </div> */}

                  {/* <div>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Console"
                      required
                      onChange={(e, v) => {
                        setConsole(e.target.value);
                      }}
                    />
                  </div> */}
                  <div>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Service"
                      required
                      onChange={(e, v) => {
                        setService(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="email"
                      id="email"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Price"
                      required
                      onChange={(e, v) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>

                  {/* <div>
                    <textarea
                      id="message"
                      rows="1"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Small info that tells what the blogs is about, a headliner"
                      onChange={(e, v) => setInfo(e.target.value)}
                    ></textarea>
                  </div> */}
                  {/* <div> */}
                  {/* <textarea
                      id="message"
                      rows="4"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      onChange={(e, v) => setText(e.target.value)}
                    ></textarea> */}
                  {/* <RichTextEditor text={text} setText={setText} /> */}
                  {/* </div> */}

                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => {
                      onSubmit(e);
                      setShowModal(false);
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [consoles, setConsoles] = useState([]);
  const [selectedConsole, setSelectedConsole] = useState({});
  const [selectedConsoleId, setSelectedConsoleId] = useState({});

  const [consoleToAdd, setConsoleToAdd] = useState("");
  const [currentConsoleServices, setCurrentConsoleServices] = useState([]);
  const [serviceType, setServiceType] = useState("upgradeOptions");
  const [currentTable, setCurrentTable] = useState([]);
  useEffect(() => {
    if ("userid" in localStorage) {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/services",
        data: {
          id: JSON.parse(localStorage.getItem("userid")),
          token: JSON.parse(localStorage.getItem("token")).token,
        },
      };

      axiosConfig(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setServices(response.data);
            if (response.data.length > 0) {
              setSelectedConsole(response.data[0]);
              setSelectedConsoleId(response.data[0]._id);
              console.log(response.data[0]._id);
              setCurrentConsoleServices(response.data[0].repairOptions);
            }
            var cons = [];
            response.data.map((con) => {
              cons.push(con.name);
            });
            setConsoles(cons);
          }
        })
        .catch((error) => {
          {
            console.log(error);
          }
        });
    }
  }, []);

  const onAdd = () => {};

  //   console.log(services);

  //   var filteredServices =
  //     currentConsoleServices.length > 0
  //       ? currentConsoleServices.filter((service) => {
  //           return service.name.toLowerCase().includes(search.toLowerCase());
  //         })
  //       : [];

  const addnewconsole = (consoleToAdd) => {
    setConsoles([...consoles, consoleToAdd]);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col gap-2">
        <AddConsole addnewconsole={addnewconsole} />
        <div>
          <label
            for="countries"
            class="block mb-2 text-left whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Console
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setSelectedConsole(services[e.target.value]);
              setSelectedConsoleId(services[e.target.value]._id);
            }}
          >
            {services.map((con, index) => (
              <option
                selected={con.console === selectedConsole.console}
                value={index}
              >
                {con.console}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            for="countries"
            class="block mb-2 text-left whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
          >
            Select service type
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setCurrentConsoleServices(selectedConsole[e.target.value]);
              setServiceType(e.target.value);
            }}
          >
            <option value={"upgradeOptions"}>Upgrade Service</option>
            <option selected value={"repairOptions"}>
              Repair Services
            </option>
            <option value={"sparePartsOptions"}>Spare Part Options</option>
            <option value={"replacementOptions"}>Replacement Options</option>
          </select>
        </div>
        <div>
          <div class="relative overflow-x-auto my-4 rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Service
                  </th>
                  {/* <th scope="col" class="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th> */}
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentConsoleServices.length > 0 &&
                  currentConsoleServices.map((serv) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {serv.name}
                      </th>
                      {/* <td class="px-6 py-4">Silver</td>
                    <td class="px-6 py-4">Laptop</td> */}
                      <td class="px-6 py-4">{serv.price}</td>
                    </tr>
                  ))}
                {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">White</td>
                    <td class="px-6 py-4">Laptop PC</td>
                    <td class="px-6 py-4">$1999</td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">Black</td>
                    <td class="px-6 py-4">Accessories</td>
                    <td class="px-6 py-4">$99</td>
                  </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        <AddService onAdd={onAdd} con={selectedConsoleId} type={serviceType} />
      </div>
    </div>
  );
}

function AddConsole() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        class="block mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        + Add Console
      </button>

      {showModal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          class="flex fixed z-40 backdrop-blur-sm items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
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
                <span class="sr-only">Close modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                  Add Service
                </h3>
                <div className="my-4">
                  <p className="text-xl text-left dark:text-white">
                    Add New Console
                  </p>
                  <form className="flex flex-row gap-2 my-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Console"
                      required
                      onChange={(e, v) => {
                        setConsoleToAdd(e.target.value);
                      }}
                    />
                    <button
                      className="bg-blue-600 rounded-lg px-2 py-2 text-white whitespace-nowrap"
                      onClick={(e) => {
                        e.preventDefault();
                        var config = {
                          method: "post",
                          url:
                            process.env.REACT_APP_API_BASE_URL +
                            "/addConsoleService",
                          data: { console: consoleToAdd },
                        };
                        axiosConfig(config)
                          .then((response) => {
                            if (response.status === 200) {
                              props.addnewconsole(response.data);
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                            alert("Error Addding new console");
                          });
                      }}
                    >
                      Add Console
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
