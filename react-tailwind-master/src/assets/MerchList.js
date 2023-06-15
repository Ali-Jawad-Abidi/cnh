import axios from "axios";
import { useEffect, useState } from "react";
import ReactFileReader from "react-file-reader";
import Compressor from "compressorjs";
import React from "react";

export default function ProductList(props) {
  var [products, setProducts] = useState([]);
  var [search, setSearch] = useState("");
  var [showMore, setShowMore] = useState(false);

  function fetchData() {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/getmerch",
      data: { start: products.length },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = products;
        arr = arr.concat(response.data.items);
        setProducts(arr);
        setShowMore(!response.data.isEnd);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onAdd(item) {
    setProducts((oldArray) => [...oldArray, item]);
  }

  function onUpdate(data) {
    var shallowCopy = products.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setProducts(shallowCopy);
  }

  var filteredProducts =
    products !== null
      ? products.filter((product) => {
          return product.title.toLowerCase().includes(search);
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
            placeholder="Search for users"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <AddMerch onAdd={onAdd} />
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Total Quantity
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
          {filteredProducts.map((product) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={product.thumbnail}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{product.title}</div>
                  <div class="font-normal text-gray-500">{product._id}</div>
                </div>
              </th>
              <td class="px-6 py-4">${product.price}</td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  {product.quantity} Left in Stock
                </div>
              </td>

              <td class="px-6 py-4">
                <EditMerch item={product} onUpdate={onUpdate} />
              </td>
              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    var config = {
                      method: "post",
                      url: process.env.REACT_APP_API_BASE_URL + "/deletemerch",
                      data: { id: product._id },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        setProducts(
                          products.filter((u) => {
                            return product._id !== u._id;
                          })
                        );
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete Product
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMore && (
        <button
          onClick={() => {
            fetchData();
          }}
          className="mx-auto mt-2 rounded-lg px-3 py-2 bg-blue-600 text-white"
        >
          Show More
        </button>
      )}
    </div>
  );
}

function EditMerch(props) {
  var [showModal, setShowModal] = useState(false);
  var [title, setTitle] = useState(props.item.title);
  var [price, setPrice] = useState(props.item.price);
  var [discount, setDiscount] = useState(props.item.discount);
  var [description, setDescription] = useState(props.item.description);
  var [quantity, setQuantity] = useState(props.item.quantity);
  var [images, setImages] = useState(props.item.images);
  var [bits, setBits] = useState(props.item.bits);

  function onSubmit(e) {
    e.preventDefault();

    var newMerch = Object();
    if (title !== props.item.title) {
      newMerch.title = title;
    }
    if (price !== props.item.price) {
      newMerch.price = price;
    }
    if (discount !== props.item.discount) {
      newMerch.discount = discount;
    }
    if (description !== props.item.description) {
      newMerch.description = description;
    }
    if (quantity !== props.item.quantity) {
      newMerch.quantity = quantity;
    }

    if (bits !== props.item.bits) {
      newMerch.bits = bits;
    }

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/editmerch",
      data: { id: props.item._id, merch: newMerch },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        console.log(response.data.result);
        props.onUpdate(response.data.result);
      }
      setShowModal(false);
    });
  }
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 rounded-lg text-white px-3 py-2"
      >
        Edit
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
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
                  Edit Product
                </h3>
                <div className=" relative flex flex-row mb-2 mx-auto items-center ">
                  {images.map((img) => (
                    <div>
                      <img
                        src={img}
                        alt="product images"
                        className="mx-1 object-fit w-10 h-10 rounded-lg"
                      />
                      {/* <span className="absolute top-0 bg-gray-200 px-1 py-1 text-black">
                        X
                      </span> */}
                    </div>
                  ))}
                </div>
                <form className="space-y-2" action="#">
                  <div>
                    <label
                      for="helper-text"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Title"
                      required
                      value={title}
                      maxlength="30"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      for="helper-text"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="Number"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Price"
                      required
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label
                      for="helper-text"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="discount"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      required
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-row">
                    <div className="mr-1">
                      <label
                        for="helper-text"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        type="Number"
                        name="discount"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Quantity"
                        required
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>

                    <div className="ml-1">
                      <label
                        for="helper-text"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Discount
                      </label>
                      <input
                        type="Number"
                        name="discount"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Discount"
                        required
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-4">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          required
                          checked={bits}
                          onChange={(e) => {
                            setBits(e.target.checked);
                          }}
                        />
                      </div>
                      <label
                        for="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Can be bought with bits
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        onSubmit(e);
                      }}
                      className="w-full ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AddMerch(props) {
  var [showModal, setShowModal] = useState(false);
  var [title, setTitle] = useState("");
  var [price, setPrice] = useState("");
  var [discount, setDiscount] = useState("");
  var [description, setDescription] = useState("");
  var [quantity, setQuantity] = useState("");
  var [images, setImages] = useState([]);
  var [thumbnail, setThumbnail] = useState("");
  var [bits, setBits] = useState(false);
  var [link, setLink] = useState(null);
  var [cat, setCat] = useState(null);
  var [cats, setCats] = useState([]);

  useEffect(() => {
    var config = {
      url: process.env.REACT_APP_API_BASE_URL + "/getmerchcats",
      method: "get",
    };
    axios(config).then((response) => {
      if (response.status === 200) {
        setCats(response.data);
      } else {
        setCats([]);
      }
    });
  }, [showModal]);

  function onSubmit(e) {
    e.preventDefault();

    if (cat === null || cat.length < 1) {
      alert("Please assign appropriate category");
      return false;
    } else {
      var newMerch = {
        title: title,
        price: price,
        discount: discount,
        description: description,
        quantity: quantity,
        images: images,
        bits: bits,
        thumbnail: thumbnail,
        link: link,
        category: cat,
      };

      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/addmerch",
        data: newMerch,
      };

      axios(config).then(function (response) {
        newMerch._id = response.data.id;
        props.onAdd(newMerch);
      });
      return true;
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="bg-blue-600 hover:bg-700 text-white px-3 py-2 rounded-lg mr-4"
      >
        Add Product
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
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
                  Add new item
                </h3>

                <div className="flex flex-row gap-2 mb-2">
                  {images.length > 0 &&
                    images.map((img) => (
                      <img
                        src={img}
                        alt="product image"
                        className="rounded-lg w-10 h-10 object-fit"
                      />
                    ))}
                </div>
                <form className="space-y-2" action="#">
                  <div>
                    <input
                      type="text"
                      name="title"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Title"
                      required
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <select
                      id="cats"
                      required
                      onChange={(e) => {
                        setCat(e.target.value);
                      }}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select Product Category</option>
                      {cats.map((c, index) => (
                        <option index={index} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="Number"
                      name="price"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Price"
                      required
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input
                      type="Number"
                      name="discount"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Discount"
                      required
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="discount"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Link to console"
                      required
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="discount"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      required
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="Number"
                      name="discount"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Quantity"
                      required
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-4">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          required
                          onChange={(e) => {
                            setBits(e.target.checked);
                          }}
                        />
                      </div>
                      <label
                        for="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Can be bought with bits
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-space">
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

                          new Compressor(imgs[0], {
                            quality: 0.8,
                            maxHeight: 200,
                            maxWidth: 200,
                            mimeType: ["image/webp"], // 0.6 can also be used, but its not recommended to go below.
                            success: (compressedResult) => {
                              var reader = new FileReader();
                              reader.readAsDataURL(compressedResult);
                              reader.onloadend = function () {
                                var base64String = reader.result;
                                setThumbnail(base64String);
                              };
                            },
                          });
                        }}
                        required
                      />
                      Upload Images
                    </label>

                    <button
                      type="button"
                      onClick={(e) => {
                        if (onSubmit(e)) {
                          setShowModal(false);
                        }
                      }}
                      className="w-1/2 ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to Store
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
