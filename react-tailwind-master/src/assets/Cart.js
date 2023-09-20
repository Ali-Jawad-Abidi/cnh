import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Cart(props) {
  const [open, setOpen] = useState(true);
  var [cartItems, setCartItems] = useState([]);
  var [total, setTotal] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (
      "cartID" in sessionStorage &&
      sessionStorage.getItem("cartID").length > 0
    ) {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/getCart",
        data: {
          id:
            "cartID" in sessionStorage
              ? sessionStorage.getItem("cartID")
              : undefined,
        },
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.cart);
            setCartItems(response.data.cart);
            setTotal(response.data.total);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          sessionStorage.removeItem("cartLength");
          sessionStorage.removeItem("cartID");
        });
    }
  }, []);

  const remove = (indexToRemove) => {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/removeCart",
      data: {
        cartId:
          "cartID" in sessionStorage
            ? sessionStorage.getItem("cartID")
            : undefined,
        indexToRemove: indexToRemove,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          // Create a copy of the current state array
          const updatedItems = [...cartItems];

          // Use splice to remove the item at the desired index
          // updatedItems.splice(indexToRemove, 1);

          // Or, use filter to remove the item at the desired index
          const filteredItems = updatedItems.filter(
            (_, index) => index !== indexToRemove
          );

          // Update the state with the new array
          setCartItems(filteredItems);
          var oldLength =
            "cartLength" in sessionStorage
              ? JSON.parse(sessionStorage.getItem("cartLength"))
              : 0;
          let newLength = parseInt(oldLength) - 1;
          newLength = newLength < 0 ? 0 : newLength;
          sessionStorage.setItem("cartLength", newLength);
          const storageChangeEvent = new Event("sessionStorageChange");
          window.dispatchEvent(storageChangeEvent);
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only dark:text-white">
                              Close panel
                            </span>
                            <CloseIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.length > 0 ? (
                              cartItems.map((product, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.img}
                                      alt={"product.imageAlt"}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                        <h3>
                                          <a href={"#"}>{product.title}</a>
                                        </h3>
                                        <p className="ml-4">£{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500 dark:text-white">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex flex-col gap-2">
                                        <p className="text-gray-500 dark:text-white">
                                          Qty {product.quantity}
                                        </p>
                                        {/* <p className="text-left text-gray-500 text-sm font-bold">
                                          {product.totalPrice}
                                        </p> */}
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            remove(index);
                                          }}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <p className="dark:text-white text-black">
                                Cart is Empty
                              </p>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-white">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        {localStorage.getItem("userid") !== null && (
                          <a
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-white"
                          >
                            Checkout
                          </a>
                        )}
                        {localStorage.getItem("userid") === null && (
                          <a
                            href="/login"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-white"
                          >
                            Login to go to checkout
                          </a>
                        )}
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
