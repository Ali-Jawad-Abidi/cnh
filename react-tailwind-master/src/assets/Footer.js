import logo from "./img/logo.webp";
import React, { useState } from "react";

function Foot(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
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
                    <br /> -Earn the most points in a month win an additional -
                    50 bits
                    <br /> -Share anything brand-new, never-before-seen
                    unreleased game-related - 500 bits
                    <br /> -Share any brand new information from another source
                    - 25 bits
                    <br /> -Create a new article or forum post that gets picked
                    up by another website or game source - 25 bits
                    <br />
                    Standard users can earn up to 25 points p/day Premium users
                    can earn up to 75 points p/day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer class="bg-white rounded-lg shadow-xl dark:bg-gray-800 mt-4 mx-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0">
              <img src={logo} class="h-8 mr-1" alt="Flowbite Logo" />
              <span class="self-center lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
                Console Nostalgia Heaven
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="/about" class="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              {/* <li>
                <p
                  onClick={() => {
                    setShowModal(true);
                  }}
                  class="mr-4 hover:underline md:mr-6 cursor-pointer"
                >
                  Privacy Policy
                </p>
              </li>
              <li>
                <a href="/" class="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li> */}
              <li>
                <a
                  href="https://discord.gg/tYQ7yzN6Jf"
                  target="_blank"
                  class="hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" class="hover:underline">
              THECNH™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default function Footer(props) {
  return <Foot />;
}
