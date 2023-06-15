import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

export default function OrdersList(props) {
  var [orders, setOrders] = useState([]);
  var [search, setSearch] = useState("");
  var [showMore, setShowMore] = useState(true);

  function fetchData() {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/getorders",
      data: { start: orders.length },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        var arr = orders;
        arr = arr.concat(response.data.orders);
        setOrders(arr);
        setShowMore(!response.data.isEnd);
      } else {
        setShowMore(false);
        setOrders([]);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onUpdate(data) {
    var shallowCopy = orders.map((u) => {
      if (u._id === data._id) {
        return data;
      } else return u;
    });
    setOrders(shallowCopy);
  }

  var filteredOrders =
    orders !== null
      ? orders.filter((order) => {
          return order.user.includes(search) || order.username.includes(search);
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
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              OrderID
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Total
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
          {filteredOrders.map((order) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src={order.cart[0].img}
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">{order._id}</div>
                  <div class="font-normal text-gray-500">{order.username}</div>
                </div>
              </th>
              <td class="px-6 py-4">
                <select
                  id="countries"
                  defaultValue={order.status}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onClick={(e) => {
                    var config = {
                      method: "post",
                      url:
                        process.env.REACT_APP_API_BASE_URL + "/editorderstatus",
                      data: { id: order._id, status: e.target.value },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        var ord = order;
                        ord.status = e.target.value;
                        onUpdate(ord);
                      }
                    });
                  }}
                >
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Received">Received</option>
                </select>
              </td>
              <td class="px-2 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  ${order.total}
                </div>
              </td>

              <td class="px-6 py-4">
                <ShowOrder order={order} />
              </td>

              <td class="px-6 py-4">
                <button
                  onClick={() => {
                    setOrders(
                      orders.filter((u) => {
                        return order._id !== u._id;
                      })
                    );
                    var config = {
                      method: "post",
                      url: process.env.REACT_APP_API_BASE_URL + "/deleteorder",
                      data: { id: order._id },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        alert(response.data);
                      }
                    });
                  }}
                  class="font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700"
                >
                  Delete Order
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
          className="mx-auto rounded-lg px-3 py-2 bg-blue-600 text-white"
        >
          Show More
        </button>
      )}
    </div>
  );
}

function ShowOrder(props) {
  var [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="px-3 py-1 bg-blue-600 rounded-lg text-sm text-white"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Order Summary
      </button>
      {showModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden md:inset-0 h-[calc(80%-1rem)] md:h-full max-h-[100%]"
        >
          <div className="relative w-full h-full max-w-lg h-auto max-h-[90%]">
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
                <p className="text-lg dark:text-white text-left">
                  Order Summary
                </p>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  OrderID: {props.order.orderid}
                </label>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Payer Name: {props.order.payer.name}
                </label>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Payer Email: {props.order.payer.email}
                </label>

                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Shipping Address:
                  {props.order.shipping.address_line_1 +
                    " " +
                    props.order.shipping.address_line_2}
                </label>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Admin Area:
                  {props.order.shipping.admin_area_1 +
                    " " +
                    props.order.shipping.admin_area_2}
                </label>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Postal Code:
                  {props.order.shipping.postal_code}
                </label>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country Code:
                  {props.order.shipping.country_code}
                </label>
                <label
                  for="email"
                  class="block text-left ml-auto  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order Status: {props.order.status}
                </label>
                <div className="mt-2 overflow-y-scroll max-h-[50vh] flex flex-col space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 dark:bg-gray-900">
                  {props.order.cart.length > 0 &&
                    props.order.cart.map((item) => (
                      <div className="flex flex-row rounded-lg bg-white sm:flex-row dark:bg-gray-900 dark:border-2 dark:border-gray-500">
                        <img
                          className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                          src={item.img}
                          alt=""
                        />
                        <div className="flex w-full flex-col px-4 py-4">
                          <span className="float-left font-semibold dark:text-white">
                            {item.title}
                          </span>
                          <span className="float-left text-gray-400 dark:text-white">
                            ${item.price.toFixed(2) - item.discount / 100}x
                            {item.quantity}
                          </span>
                          <p className="text-lg font-bold dark:text-white">
                            $
                            {(item.price.toFixed(2) - item.discount / 100) *
                              item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
