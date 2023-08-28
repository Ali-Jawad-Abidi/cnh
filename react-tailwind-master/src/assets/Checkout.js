import { CLIENT_ID } from "../Config/Config";
import React, { useState, useEffect } from "react";
import { Stack } from "@mui/system";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";

function OrderComplete(props) {
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden md:inset-0 h-[calc(80%-1rem)] md:h-full max-h-[100%]"
      >
        <div className="relative w-full h-full max-w-lg h-auto max-h-[90%]">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <Link to={"/store"}>
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
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
            </Link>
            {props.onError === "" && (
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Order Completed!
                </h3>
                <div className="mt-8 overflow-y-scroll max-h-[50vh] flex flex-col space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 dark:bg-gray-900">
                  {props.cart.length > 0 &&
                    props.cart.map((item) => (
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
                <form className="space-y-2" action="#">
                  <div className="text-left ml-2">
                    <span className="text-md mt-2 font-bold dark:text-white">
                      Order Total: ${props.total}
                    </span>
                    <div className="text-md mt-2 font-bold dark:text-white">
                      Status: Paid!
                    </div>
                    <div className="text-md mt-2 font-bold dark:text-white">
                      OrderId: {props.orderID}
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <Link to={"/store"}>
                      <button
                        type="button"
                        // onClick={(e) => {
                        //   onSubmit(e);
                        // }}
                        className="w-full ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Done
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            )}

            {props.onError !== "" && (
              <>
                <div className="text-red-600 text-xl ">
                  Error: {props.onError}
                </div>
                <Link to={"/store"}>
                  <button
                    type="button"
                    // onClick={(e) => {
                    //   onSubmit(e);
                    // }}
                    className="w-full ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Done
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Checkout(props) {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(0);
  var [total, setTotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [totalBitsSpent, setTotalBitsSpent] = useState(0);
  var [cartItems, setCartItems] = useState(
    "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : []
  );
  function remove(itemToDelete) {
    const newArr = cartItems.filter((item) => {
      return item.id !== itemToDelete.id;
    });
    if (newArr.length === 0) {
      setCartItems([]);
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("storage"));
    } else {
      setCartItems(newArr);
      localStorage.setItem("cart", JSON.stringify(newArr));
      window.dispatchEvent(new Event("storage"));
    }
  }

  useEffect(() => {
    var AmmountToPay = 0;
    var BitsSpent = 0;
    window.addEventListener("storage", () => {
      cartItems.map((item) => {
        AmmountToPay =
          AmmountToPay +
          (item.price.toFixed(2) - (item.price * item.discount) / 100) *
            item.quantity;

        BitsSpent = BitsSpent + item.bitsSpent;
      });
      setTotal(AmmountToPay);
      setTotalBitsSpent(BitsSpent);
      setCartItems(
        "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : []
      );
    });

    setCartItems(
      "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : []
    );
    cartItems.map((item) => {
      AmmountToPay =
        AmmountToPay +
        (item.price.toFixed(2) - (item.price * item.discount) / 100) *
          item.quantity;

      BitsSpent = BitsSpent + item.bitsSpent;
    });

    setSubTotal(AmmountToPay);
    setTotalBitsSpent(BitsSpent);

    // if (AmmountToPay > 0 && payWithBits) {
    //   AmmountToPay = AmmountToPay - Math.floor(bitsUsed / 2);
    // }
    setTotal(AmmountToPay);
  });

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage(data);
    console.log("data" + data);
  };

  if (success) {
    return (
      <OrderComplete
        success={success}
        onError={ErrorMessage}
        cart={cartItems}
        total={total + deliveryCost}
        orderID={orderID}
      />
    );
  }

  if (cartItems.length < 1) {
    return (
      <Stack className="dark:bg-gray-900 ">
        <Header hideCart />

        <div className="grid h-screen sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 dark:bg-gray-900 pb-3 pt-3">
          <div className="px-2 pt-4 ">
            <div className="border-2 p-4">
              <p className="text-left text-xl font-medium dark:text-white">
                Order Summary
              </p>
              <p className="text-left text-gray-400">Your Cart Is Empty</p>
              <p className="text-left text-gray-400">
                Go back to Store Page and add items to your cart!
              </p>
            </div>
            <Link to={"/store"}>
              <button className="bg-blue-600 text-white px-3 py-2 text-sm rounded-lg mt-2 float-right">
                Go Back To Store
              </button>
            </Link>
          </div>
        </div>

        <Footer />
      </Stack>
    );
  }

  return (
    <Stack className="dark:bg-gray-900">
      <Header hideCart />

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 dark:bg-gray-900 pb-3 pt-3">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium dark:text-white">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 dark:bg-gray-900">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
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
                      $
                      {item.price.toFixed(2) -
                        (item.price * item.discount) / 100}
                      x {item.quantity}
                    </span>
                    <p className="text-lg font-bold dark:text-white">
                      $
                      {(item.price.toFixed(2) -
                        (item.price * item.discount) / 100) *
                        item.quantity}
                    </p>
                    <div
                      className="text-blue-700 "
                      onClick={() => {
                        remove(item);
                      }}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <p className="mt-8 text-lg font-medium dark:text-white">
            Shipping Methods
          </p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="https://cdn.mos.cms.futurecdn.net/SFJxCXKMZihnZsVnn3LoEk.jpg"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="https://cdn.mos.cms.futurecdn.net/SFJxCXKMZihnZsVnn3LoEk.jpg"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-white px-4 pt-8 lg:mt-0 dark:bg-gray-900 dark:border-gray-500 dark:border-2">
          <p className="text-xl font-medium dark:text-white">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>

          <div className="mt-4 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 dark:bg-gray-900">
            <div className="flex w-full flex-row justify-between">
              <span className="font-semibold dark:text-white">SubTotal:</span>
              <span className="float-right text-gray-400 dark:text-white">
                {total + "USD "}
              </span>
            </div>
            <div className="flex w-full flex-row justify-between">
              <span className="font-semibold dark:text-white">
                Delivery Costs:
              </span>
              <span className="float-right text-gray-400 dark:text-white">
                {deliveryCost}
              </span>
            </div>

            <div className="flex w-full flex-row justify-between">
              <span className="font-semibold dark:text-white">Total:</span>
              <span className="float-right text-gray-400 dark:text-white">
                {subtotal + deliveryCost + "USD "}
              </span>
            </div>
          </div>

          <div className="pt-8 z-10 relative ">
            <div className="text-center text-xl dark:text-white">
              Payment Methods
            </div>
            <div className="text-md dark:text-gray-400 mb-4">
              Select a payment method from following
            </div>
            <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "black",
                  label: "checkout",
                }}
                className="flex max-w"
                createOrder={(data, actions) => {
                  return actions.order
                    .create({
                      purchase_units: [
                        {
                          amount: { currency_code: "USD", value: subtotal },
                        },
                      ],
                    })
                    .then((orderID) => {
                      return orderID;
                    })
                    .catch((e) => console.log(e));
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    console.log(details);

                    var config = {
                      method: "post",
                      url: process.env.REACT_APP_API_BASE_URL + "/neworder",
                      data: {
                        orderid: details.id,
                        cart: cartItems,
                        user: JSON.parse(localStorage.getItem("userid")),
                        username: JSON.parse(localStorage.getItem("username")),
                        status: "Paid",
                        date: details.update_time,
                        payer: {
                          name: details.purchase_units[0].shipping.name
                            .full_name,
                          payerid: details.payer.payer_id,
                          email: details.payer.email_address,
                        },
                        shipping: details.purchase_units[0].shipping.address,
                        total: subtotal,
                        bitsSpent: totalBitsSpent,
                      },
                    };

                    axios(config).then(function (response) {
                      if (response.status === 200) {
                        setShowModal(true);
                        setSuccess(true);
                        localStorage.setItem("cart", JSON.stringify([]));
                      }
                    });
                  });
                }}
                onError={onError}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>

      <Footer />
    </Stack>
  );
}
