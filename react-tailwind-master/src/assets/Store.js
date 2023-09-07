import React from "react";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Footer from "./Footer";
import Header from "./Header";
import Breadcrumb from "./BreadCrumb";
import { Box } from "@mui/material";

// function Filter() {
//   var [cats, setCats] = useState([]);
//   var [selectedCats, setSelectedCats] = useState([]);
//   useEffect(() => {
//     var config = {
//       url: process.env.REACT_APP_API_BASE_URL + "/getmerchcats",
//       method: "get",
//     };
//     axios(config).then((response) => {
//       if (response.status === 200) {
//         setCats(response.data);
//       }
//     });
//   }, []);
//   return (
//     <div className="text-left text-xl">
//       <p class="text-white"> Categories</p>
//       <div className="flex flex-row gap-2 p-4 dark:bg-gray-800 bg-gray-200 rounded-lg w-full">
//         {cats.map((cat, index) => (
//           <div key={index} class="flex items-center">
//             <input
//               id={index}
//               type="checkbox"
//               value={cat.name}
//               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               onChange={(e) => {
//                 console.log(selectedCats);
//                 e.target.checked
//                   ? setSelectedCats((oldArray) => [...oldArray, e.target.value])
//                   : setSelectedCats(
//                       selectedCats.filter((rel) => rel !== e.target.value)
//                     );
//               }}
//             />
//             <label
//               htmlfor={cat.name}
//               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//             >
//               {cat.name}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export function EcomCard(props) {
  const addCart = props.addCart;
  return (
    <>
      <div className="group border-gray-700 dark:border-white max-h-[65vh] shadow flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-md dark:bg-gray-700">
        <Link
          className="relative flex h-44 overflow-hidden rounded-xl"
          to={{
            pathname: `/store/${props.item.title}`,
            search: `?${props.item.title}=${props.item._id}`,
          }}
        >
          <img
            class="peer absolute top-0 right-0 h-full w-full object-cover hover:z-20 hover:scale-110"
            src={props.item.thumbnail}
            alt="product image"
          />
          {/* <img
            class="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
            src={
              props.item.images[1] ? props.item.images[1] : props.item.images[0]
            }
            alt="product image"
          /> */}

          {/* <svg
            className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
            />
          </svg> */}
        </Link>
        <div className="mt-2 px-5 pb-5">
          <Link
            to={{
              pathname: `/store/${props.item.title}`,
              search: `?${props.item.title}=${props.item._id}`,
            }}
          >
            <h5 className="text-xl tracking-tight line-clamp-1 text-gray-700 h-auto dark:text-white">
              {props.item.title}
            </h5>
          </Link>
          <div className=" flex flex-col items-center justify-between">
            <p>
              {props.item.discount > 0 ? (
                <>
                  <span className="grow mt-2 text-3xl font-bold text-gray-700 dark:text-white">
                    £
                    {props.item.price -
                      (props.item.price * props.item.discount) / 100}
                  </span>
                  <sup className="text-sm pt-2 text-gray-700 line-through dark:text-white">
                    £{props.item.price}
                  </sup>
                </>
              ) : (
                <span className="grow mt-2 text-3xl font-bold text-gray-700 dark:text-white">
                  £
                  {props.item.price -
                    (props.item.price * props.item.discount) / 100}
                </span>
              )}
              <br />
              {props.item.bits && (
                <span className="grow text-sm pt-2 text-gray-700 dark:text-white">
                  {props.item.bitsLimit} Bits
                </span>
              )}
              {!props.item.bits && (
                <span className="grow text-sm pt-2 text-gray-700 dark:text-white">
                  Can't buy with Bits
                </span>
              )}
            </p>
          </div>
          <Link
            to={{
              pathname: `/store/${props.item.title}`,
              search: `?${props.item.title}=${props.item._id}`,
            }}
          >
            <div
              // onClick={() => {
              //   var newItem = {
              //     img: props.item.images[0],
              //     title: props.item.title,
              //     id: props.item._id,
              //     price: props.item.price,
              //     discount: props.item.discount,
              //     quantity: 1,
              //   };
              //   addCart(newItem);
              // }}
              className="hover:border-white/40 focus:bg-green-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Proceed to buy
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export function ProductsGrid(props) {
  var merch = props.merch;
  const addCart = (newItem) => {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var found = cart.findIndex((item) => item.id === newItem.id);
    if (found === -1) {
      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    } else {
      if (newItem.quantity !== cart[found]) {
        cart[found].quantity = newItem.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };
  if (merch === []) return <Loading />;
  return (
    <>
      <Grid container spacing={1}>
        {merch.map((item, index) => (
          <Grid item xs={6} sm={6} md={3}>
            <EcomCard
              item={item}
              addCart={addCart}
              conversionRate={props.conversionRate}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function Store() {
  var [merch, setMerch] = useState(null);
  var [showMore, setShowMore] = useState(false);
  var [cats, setCats] = useState([]);
  var [selectedCats, setSelectedCats] = useState([]);
  const [conversionRate, setConversionRate] = useState();
  function fetchMerch() {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/getmerch",
      data: { start: merch === null ? 0 : merch.length },
    };
    axios(config).then(function (response) {
      if (response.status === 200) {
        console.log(response.data.items);
        var prevMerch = merch === null ? [] : merch;
        var newMerch = prevMerch.concat(response.data.items);
        setShowMore(!response.data.isEnd);
        setMerch(newMerch);
      } else {
        setShowMore(false);
        setMerch([]);
      }
    });
  }

  function fetchConversionRate() {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/conversionRate")
      .then((response) => {
        if (response.status === 200) {
          setConversionRate(response.data);
        }
      });
  }

  useEffect(() => {
    fetchMerch();
    fetchConversionRate();
    var config = {
      url: process.env.REACT_APP_API_BASE_URL + "/getmerchcats",
      method: "get",
    };
    axios(config).then((response) => {
      if (response.status === 200) {
        setCats(response.data);
      }
    });
  }, []);

  var filteredList =
    merch !== null && merch.length > 0
      ? merch.filter((m) => {
          return selectedCats.length === 0 || selectedCats.includes(m.category);
        })
      : [];
  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
      <Header />
      <Breadcrumb />
      <h2 className="company uppercase mt-4 text-blue-700 font-bold text-xl sm:text-md tracking-wider">
        consolenostalgia store
      </h2>

      <div className="flex flex-row gap-4 min-h-full min-w-screen pl-4 mt-4">
        <Box sx={{ display: { xs: "none", md: "none", lg: "flex" } }}>
          <div className="flex flex-col p-4 dark:bg-gray-800 bg-gray-200 rounded-lg w-1/4">
            <p className="text-2xl font-semibold text-left dark:text-white">
              Filter
            </p>
            <p className="text-lg font-semibold text-left dark:text-white">
              Categories
            </p>
            <div className="top-2 text-left text-xl z-10">
              <div className="flex flex-col gap-2 dark:bg-gray-800 bg-gray-200 rounded-lg mt-2">
                {cats.map((cat, index) => (
                  <div key={index} class="flex items-center">
                    <input
                      id={index}
                      type="checkbox"
                      value={cat.name}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        console.log(selectedCats);
                        e.target.checked
                          ? setSelectedCats((oldArray) => [
                              ...oldArray,
                              e.target.value,
                            ])
                          : setSelectedCats(
                              selectedCats.filter(
                                (rel) => rel !== e.target.value
                              )
                            );
                      }}
                    />
                    <label
                      htmlfor={cat.name}
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>

        <div className="w-full">
          {filteredList.length > 0 && (
            <ProductsGrid
              merch={filteredList}
              conversionRate={conversionRate}
            />
          )}
        </div>
      </div>

      <div className="p-4 flex flex-row gap-2 min-h-screen">
        {showMore && (
          <div className="flex pt-3 pb-3 justify-center w-full">
            <div
              onClick={() => {
                fetchMerch();
              }}
              className="button  w-2/5 ml-10 px-10 py-3 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 shadow-2xl text-white flex justify-center cursor-pointer hover:opacity-60"
            >
              Show More
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
