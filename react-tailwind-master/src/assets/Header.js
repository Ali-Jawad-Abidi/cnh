import React, { useRef, useContext, useState, useEffect } from "react";
import logo from "./img/logo.webp";
import menu from "./img/icon-menu.svg";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import icon from "./img/defaulticon.webp";
import ProfilePanel from "./ProfilePanel";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DropDown(props) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div className="flex flex-row">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md text-gray-900 dark:bg-gray-800 dark:text-white">
          Connect
          <i className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true">
            <ion-icon name="chevron-down"></ion-icon>
          </i>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-900 dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  target="_blank"
                  href="https://discord.gg/tYQ7yzN6Jf"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-400",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Discord
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  target="_blank"
                  href="https://www.twitter.com"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-400",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Twitter
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  target="_blank"
                  href="https://www.youtube.com/channel/UCJvQnHMqb-bij536VIK_YwA"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-400",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Youtube
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="/about"
                  className={classNames(
                    active
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-400",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  About
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const Header = (props) => {
  let navMenu = useRef(null);
  let darkScreen = useRef(null);
  let close = useRef(null);
  let hamburger = useRef(null);
  var [showCart, setShowCart] = useState(false);
  var [showProfilePanel, setShowProfilePanel] = useState(false);
  var len =
    "cart" in localStorage
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0;
  var [total, setTotal] = useState(len);
  var profImage =
    "profileImage" in localStorage
      ? JSON.parse(localStorage.getItem("profileImage"))
      : icon;

  useEffect(() => {
    window.addEventListener("storage", () => {
      setTotal(JSON.parse(localStorage.getItem("cart")).length || 0);
    });
  }, []);
  const displayMenu = () => {
    navMenu.current.classList.toggle("!translate-x-0");
    darkScreen.current.classList.toggle("!opacity-60");
    darkScreen.current.classList.toggle("!z-20");
    close.current.classList.toggle("!block");
    hamburger.current.classList.toggle("!hidden");
  };

  var [search, setSearch] = useState("");

  return (
    <header>
      <div className="wrapper relative bg-white rounded-lg flex h-16 px-5 py-4 items-center justify-between lg:h-28 lg:mx-40 lg:pb-2 lg:px-1 lg:py-0 lg:border-b border-grayish-blue dark:bg-gray-800 mb-4">
        <div className="left flex items-center px-4 lg:h-inherit">
          <div
            onClick={displayMenu}
            className="menu lg:hidden z-40 cursor-pointer"
          >
            <img
              ref={hamburger}
              src={menu}
              alt="menu-icon"
              className="w-auto h-6"
            />
            <div
              ref={close}
              className="close hidden text-4xl dark:text-white leading-none fixed"
            >
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div className="logo mx-4 -mt-1 lg:m-auto object-fit">
            <img
              src={logo}
              alt="logo"
              className="object-scale-down lg:h-20 h-10"
            />
          </div>
          <nav
            ref={navMenu}
            className="menu fixed inset-0 right-1/3 bg-white dark:bg-gray-800 pt-20 z-30 px-7 -translate-x-full transition-all ease-in-out duration-500 lg:translate-x-0 lg:relative lg:w-max lg:p-0 lg:h-inherit lg:flex lg:items-center"
          >
            <ul className="font-bold lg:font-normal lg:flex lg:items-center text-lg lg:text-base pt-2 lg:p-0 lg:mx-4 lg:text-dark-grayish-blue lg:h-inherit">
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <li className="mb-5 dark:text-white lg:mb-0 lg:mx-4 lg:h-inherit lg:flex lg:items-center cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  Home
                </li>
              </Link>
              <Link to="/blogs" style={{ textDecoration: "none" }}>
                <li className="mb-5 lg:mb-0 lg:mx-4 dark:text-white lg:h-inherit lg:flex lg:items-center cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  News
                </li>
              </Link>
              <Link to="/nostalgiabase" style={{ textDecoration: "none" }}>
                <li className="mb-5 lg:mb-0 lg:mx-4 lg:h-inherit dark:text-white lg:flex lg:items-center cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  NostalgiaBase
                </li>
              </Link>
              <Link to="/thewall" style={{ textDecoration: "none" }}>
                <li className="mb-5 lg:mb-0 lg:mx-4 lg:h-inherit lg:flex dark:text-white lg:items-center cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  Museum
                </li>
              </Link>
              <Link to="/store" style={{ textDecoration: "none" }}>
                <li className="mb-5 lg:mb-0 lg:mx-4 lg:h-inherit lg:flex lg:items-center dark:text-white cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  Store
                </li>
              </Link>
              <li className="hidden lg:block">
                <DropDown />
              </li>

              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCJvQnHMqb-bij536VIK_YwA"
              >
                <li className=" lg:hidden block mb-5 lg:mb-0 lg:mx-4 lg:h-inherit lg:flex lg:items-center dark:text-white cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  Youtube
                </li>
              </a>
              <a target="_blank" href="https://discord.gg/tYQ7yzN6Jf">
                <li className=" lg:hidden block mb-5 lg:mb-0 lg:mx-4 lg:h-inherit lg:flex lg:items-center dark:text-white cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  Discord
                </li>
              </a>
              <a target="_blank" href="https://www.twitter.com">
                <li className=" lg:hidden block mb-5 lg:mb-0 lg:mx-4 lg:h-inherit lg:flex lg:items-center dark:text-white cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  Twitter
                </li>
              </a>
              <a href="/about">
                <li className=" lg:hidden block mb-5 lg:mb-0 lg:mx-4 lg:h-inherit lg:flex lg:items-center dark:text-white cursor-pointer lg:relative lg:before:content-[attr(before)] before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-orange before:w-0 hover:before:w-full before:transition-all lg:hover:text-very-dark-blue">
                  About
                </li>
              </a>
            </ul>
          </nav>
          <div
            ref={darkScreen}
            className="screen -z-10 fixed inset-0 opacity-0 bg-black h-screen lg:hidden transition-all"
          ></div>
        </div>

        <div className="right mr-4">
          <div className="user-bar flex items-center">
            <div class="relative">
              <form>
                <input
                  type="search"
                  id="default-search"
                  class="block text-sm text-black py-3 border-2 py-2 border-black rounded-lg w-32 h-6 ml-1 focus:outline-none"
                  placeholder="Search"
                  autoComplete="nope"
                  onChange={(e) => {
                    if (/^[a-zA-Z0-9]+$/.test(e.target.value))
                      setSearch(e.target.value);
                  }}
                />
                <Link
                  to={search.length > 0 ? `/search/${search.trim()}` : "#"}
                  class="text-white px-1 absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <button type="submit">Go</button>
                </Link>
              </form>
            </div>

            {!props.hideCart && (
              <div className="cart-container">
                <div className="cart-wrapper mx-2 lg:mt-2 relative">
                  {total > 0 && (
                    <div className="quantity-wrapper absolute px-2 rounded-full bg-red-500 z-10 -right-1/3 lg:-right-1/2 -top-2">
                      <div className="amount text-white text-xs">{total}</div>
                    </div>
                  )}
                  <i
                    onClick={() => setShowCart(!showCart)}
                    className={
                      "cursor-pointer text-3xl !leading-none transition-colors " +
                      (showCart
                        ? "text-very-dark-blue dark:text-white"
                        : "text-grayish-blue dark:text-white")
                    }
                  >
                    <ion-icon name="cart-outline"></ion-icon>
                  </i>
                  {showCart && <Cart />}
                </div>
              </div>
            )}
            {localStorage.getItem("userid") ? (
              <div className="user cursor-pointer h-6 w-6 sm:h-8 sm:w-8 md:w-10 md:h-10 lg:w-8 lg:h-8 ">
                <img
                  onClick={() => {
                    setShowProfilePanel(!showProfilePanel);
                  }}
                  src={profImage}
                  alt="avatar"
                  className="rounded-full"
                />
                {showProfilePanel && <ProfilePanel />}
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-white text-sm uppercase bg-blue-600 px-3 py-1 rounded-lg"
                onClick={() => {
                  localStorage.setItem(
                    "redirectTo",
                    JSON.stringify(window.location.pathname)
                  );
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
