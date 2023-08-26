import { useEffect, useState } from "react";
import axios from "axios";

const bitsAward = {
  "Correcting a mistake": 1,
  "Referring a friend to patreon": 50,
  "Wearing cnh merch": 50,
  "Shared something brand new": 500,
  "Brand new information from another source": 25,
  "New article gets picked up by another website": 25,
};

function FullScreenImage(props) {
  var images = props.item.images;
  var [previewImg, setPreviewImg] = useState(images[0]);
  var thumbnails = props.item.images;
  const previewDisplay = (e) => {
    setPreviewImg(thumbnails[e.target.id]);
  };
  var [currentIndex, setCurrentIndex] = useState(0);

  const prevPreview = () => {
    var prevImage = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevImage);
    setPreviewImg(images[prevImage]);
  };
  const nextPreview = () => {
    var nextImage = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextImage);
    setPreviewImg(images[nextImage]);
  };
  return (
    <section className="modal fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="screen fixed inset-0 opacity-70 bg-black"></div>
      <div className="modal-content container max-w-lg m-auto relative">
        <span
          onClick={() => {
            props.close();
          }}
          className="close z-50 absolute top-0 right-0 text-4xl leading-0 cursor-pointer text-white hover:text-orange transition-colors"
        >
          <ion-icon name="close-outline"></ion-icon>
        </span>
        <div className="preview xl:min-w-md max-w-3xl rounded-2xl overflow-hidden cursor-pointer relative flex items-center justify-center">
          <img
            src={previewImg}
            alt="product-preview"
            className="w-200 h-80 object-contain"
          />
          <div className="directions absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full px-4">
            <button
              onClick={prevPreview}
              className="back-arrow w-14 h-14 bg-white rounded-full"
            >
              <i className="flex text-black items-center justify-center m-auto text-2xl hover:text-black">
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
      </div>
    </section>
  );
}

function EditUpload(props) {
  var [showModal, setShowModal] = useState(false);
  var [name, setName] = useState();
  var [image, setImage] = useState();
  var [imageChanged, setImageChanged] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    var subcategory = {};
    if (imageChanged) {
      subcategory.image = image;
    }
    if (name !== props.subcat.name) {
      subcategory.name = name;
    }

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editcategory",
      data: { id: props.subcat._id, subcat: subcategory },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        props.onUpdate(response.data);
      }
    });
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="font-medium bg-blue-600 rounded-xl px-3 py-2 text-white hover:bg-blue-700"
      >
        Edit
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed inset-0 z-40 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
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
                  Edit
                </h3>
                <div className="dark:bg-gray-700 rounded-lg p-2">
                  <div className="flex flex-row gap-2 justify-center mb-4">
                    {props.upload.images.length > 0 &&
                      props.upload.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="console image"
                          className="w-20 h-20 rounded-lg object-fit cursor-pointer"
                          onClick={() => setIsFullScreen(true)}
                        />
                      ))}
                  </div>
                  {isFullScreen && (
                    <div className="top-0">
                      <FullScreenImage
                        item={props.upload}
                        close={() => {
                          console.log(isFullScreen);
                          setIsFullScreen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type: {props.upload.type}
                  </p>
                </div>
                <div>
                  <p class="block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bits Prize: {bitsAward[props.upload.type]}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      var config = {
                        method: "get",
                        url:
                          process.env.REACT_APP_API_BASE_URL + "/approveupload",
                        params: { id: props.upload._id },
                      };

                      axios(config).then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                          var result = confirm("Success!");
                          props.onUpdate(props.upload);
                          setShowModal(false);
                        } else {
                          var result = confirm("Error Approving!!!");
                          if (result) {
                            setShowModal(false);
                          }
                        }
                      });
                    }}
                    className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Approve
                  </button>

                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reason for rejection
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>

                  <button
                    onClick={() => {
                      var result = confirm(
                        "Are you sure you want to reject this entry?"
                      );
                      if (result) {
                        setShowModal(false);

                        var config = {
                          method: "get",
                          url:
                            process.env.REACT_APP_API_BASE_URL +
                            "/removerequest",
                          params: { id: props.upload._id },
                        };

                        axios(config).then((response) => {
                          if (response.status === 200) {
                            alert("Success");
                          } else {
                            alert("Error Deleting");
                          }
                        });
                      }
                    }}
                    className="bg-red-600 text-white px-2 py-2 rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function UploadList(props) {
  const [showMore, setShowMore] = useState(false);
  const [uploads, setUploads] = useState(null);
  var [search, setSearch] = useState("");

  function fetchUploads() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/uploads",
      params: {
        start: uploads !== null ? uploads.length : 0,
        token: JSON.parse(localStorage.getItem("token")),
      },
    };
    axios(config).then((res) => {
      if (res.status === 200) {
        setShowMore(!res.data.isEnd);
        if (uploads === null) {
          setUploads(res.data.uploads);
        } else {
          var arr = uploads;
          arr = arr.concat(response.data.uploads);
        }
      }
    });
  }

  useEffect(() => {
    fetchUploads();
  }, [showMore]);

  function onUpdate(data) {
    setUploads(
      uploads.filter((u) => {
        return data._id !== u._id;
      })
    );
  }

  var filteredUploads =
    uploads !== null
      ? uploads.filter((upload) => {
          return (
            upload.type.toLowerCase().includes(search.toLowerCase()) ||
            upload.username.toLowerCase().includes(search.toLowerCase())
          );
        })
      : [];

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Uploads"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Description
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUploads.map((subcat) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={subcat.images[0]}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{subcat.username}</div>
                  <div class="font-normal text-gray-500">
                    {subcat.BitsString}
                  </div>
                </div>
              </th>
              <td class="px-6 py-4">
                <p>{subcat.description}</p>
              </td>
              <td class="px-6 py-4">
                <p>{subcat.BitsStatus}</p>
              </td>

              <td class="px-6 py-4">
                <EditUpload upload={subcat} onUpdate={onUpdate} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    var config = {
                      method: "get",
                      url:
                        process.env.REACT_APP_API_BASE_URL + "/removerequest",
                      params: {
                        userid: JSON.parse(localStorage.getItem("userid")),
                        id: subcat._id,
                      },
                    };
                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        console.log(response.data);
                        setUploads(
                          uploads.filter((u) => {
                            return subcat._id !== u._id;
                          })
                        );
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMore && (
        <button
          onClick={() => {
            fetchUploads();
          }}
          className="mx-auto rounded-lg px-3 py-2 bg-blue-600 text-white"
        >
          Show More
        </button>
      )}
    </div>
  );
}
