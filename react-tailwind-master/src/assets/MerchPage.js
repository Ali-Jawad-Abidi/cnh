import { Stack } from "@mui/system";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import Breadcrumb from "./BreadCrumb";
import { useLocation } from "react-router-dom";
import HtmlParser from "./HtmlParser";
import BitScheme from "./BitScheme";

export function DesktopLightBox(props) {
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
    <section className="modal pt-32 absolute z-40 inset-0 flex flex-col items-end justify-center mt-20 h-screen">
      <div className="screen fixed inset-0 bg-gray-800 transition-all">
        <div className="modal-content container max-w-lg m-auto z-40 relative pt-10">
          <span
            onClick={props.close}
            className="close absolute top-0 right-0 text-4xl leading-0 cursor-pointer text-white hover:text-orange transition-colors"
          >
            <ion-icon name="close-outline"></ion-icon>
          </span>
          <div className="preview max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden cursor-pointer">
            <img
              src={previewImg}
              alt="product-preview"
              className="w-full h-[90vh] rounded-lg object-scale-down"
            />
          </div>

          {/* <div className="thumbnails flex max-w-3xl justify-between pt-8">
            {thumbnails.map((img, index) => (
              <div
                key={index}
                className="cursor-pointer w-22 h-22 rounded-xl hover:opacity-80 relative overflow-hidden bg-white"
              >
                <img
                  id={index}
                  onClick={previewDisplay}
                  className="w-full"
                  src={img}
                  alt="thumbnail"
                />
              </div>
            ))}
          </div> */}
        </div>
        <div className="directions absolute inset-x-1/4 inset-y-1/2 flex items-end justify-between mx-20 z-40">
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
    </section>
  );
}

function MobileSlider(props) {
  var images = props.item.images;
  console.log(images);
  var [currentIndex, setCurrentIndex] = useState(0);
  var [previewImg, setPreviewImg] = useState(images[currentIndex]);
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setPreviewImg(images[currentIndex]);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setPreviewImg(images[currentIndex]);
  };

  return (
    <div className="slider overflow-hidden relative mt-1">
      <div className="images flex w-full h-96 items-center transition-all mx-auto">
        <img src={previewImg} alt="slider-img mx-auto" />
      </div>
      <div className="directions absolute inset-x-0 inset-y-1/2 flex items-center justify-between mx-4">
        <button
          onClick={prevSlide}
          className="back-arrow w-10 h-10 bg-white rounded-full"
        >
          <i className="flex text-black items-center justify-center m-auto text-2xl hover:text-black">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </i>
        </button>
        <button
          onClick={nextSlide}
          className="next-arrow w-10 h-10 bg-white rounded-full"
        >
          <i className="flex items-center text-black justify-center m-auto text-2xl hover:text-black">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </i>
        </button>
      </div>
    </div>
  );
}

function DesktopPreview(props) {
  var [previewImg, setPreviewImg] = useState(props.item.images[0]);
  var thumbnails = props.item.images;
  const previewDisplay = (e) => {
    setPreviewImg(thumbnails[e.target.id]);
  };

  return (
    <>
      <div className="preview xl:min-w-md w-full max-w-3xl rounded-2xl overflow-hidden cursor-pointer">
        <img
          onClick={props.open}
          src={previewImg}
          alt="product-preview"
          className="object-cover min-w-[35vw] h-[65vh]"
        />
      </div>
      <div className="thumbnails flex flex-row gap-1 mt-8 ">
        {thumbnails.map((img, index) => (
          <div
            key={index}
            className="cursor-pointer w-22 h-20 rounded-xl items-center justify-center hover:opacity-80 relative overflow-hidden bg-white dark:bg-gray-900"
          >
            <img
              id={index}
              onClick={previewDisplay}
              className="object-fill h-full w-full"
              src={img}
              alt="thumbnail"
            />
          </div>
        ))}
      </div>
    </>
  );
}

function ProductDetails(props) {
  var description = props.item.description;
  var images = props.item.images;
  var link = props.item.link;

  const [totalQuantity, setTotalQuantity] = useState(props.item.quantity);
  const [conversionRate, setConversionRate] = useState(1);
  const [bitsLimit, setBitsLimit] = useState(props.item.bitsLimit);
  const [cartId, setCartId] = useState(
    "cartID" in sessionStorage ? sessionStorage.getItem("cartID") : undefined
  );
  const addCart = (newItem) => {
    return new Promise((resolve, reject) => {
      var toSend = [];
      // newItem.map((it) => {
      //   toSend.push({ id: it.id, bitsSpent: it.bitsSpent });
      // });

      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/addCart",
        data: {
          user: JSON.parse(localStorage.getItem("userid")),
          cart: newItem,
          cartId: cartId,
        },
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.cartId) {
              setCartId(response.data);
              sessionStorage.setItem("cartID", response.data.cartId);
              sessionStorage.setItem("cartLength", toSend.length);
            }
            resolve(true); // Resolve the Promise with true for success
          } else {
            reject("Request failed with status " + response.status);
          }
        })
        .catch((error) => {
          reject(error); // Reject the Promise with the error message
        });
    });
  };
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(
    // props.item.discount > 0
    //   ? props.item.price - props.item.price * (props.item.discount / 100)
    //   :
    props.item.price
  );
  const [userBits, setUserBits] = useState(0);
  const [useBits, setUseBits] = useState(false);
  const [bitsUsed, setBitsUsed] = useState(0);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchConversionRate();
    if ("userid" in localStorage) {
      fetchUserBits();
    }
  }, []);

  function fetchUserBits() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/bits",
      params: {
        id:
          "userid" in localStorage
            ? JSON.parse(localStorage.getItem("userid"))
            : undefined,
      },
    };
    axios(config).then((response) => {
      console.log("fetched User Bits");
      if (response.status === 200) {
        setUserBits(response.data);
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
  return (
    <div>
      <h2 className="company uppercase text-blue-700 font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
        consolenostalgia store
      </h2>
      <h3 className="product capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl sm:leading-none pb-3">
        {props.item.title}
      </h3>
      <p className="text-dark-grayish-blue pb-6 lg:py-7 lg:leading-6 mx-auto">
        <HtmlParser htmlContent={description} />
      </p>

      {link && link.length > 0 && (
        <div className="flex flex-row">
          <a
            href={link}
            target="_blank"
            className="text-left text-white bg-blue-600 hover:bg-blue-700 cursor-pointer px-2 py-1 rounded-lg mb-2"
          >
            Link to Product
          </a>
        </div>
      )}

      <div className="amount font-bold flex items-center justify-between lg:flex-col lg:items-start mb-6">
        <div className="discount-price items-center flex">
          <div
            // ref={productPriceRef}
            className={
              bitsUsed > 0 ? "price text-3xl line-through" : "price text-3xl"
            }
          >
            £{discountedPrice}
          </div>

          {bitsUsed > 0 && (
            <div className="discount text-blue-700 bg-blue-200 w-max px-2 rounded mx-5 h-6">
              £
              {(
                discountedPrice -
                bitsUsed / (conversionRate * quantity)
              ).toFixed(2)}
            </div>
          )}

          {discount > 0 && (
            <div className="discount text-blue-700 bg-blue-200 w-max px-2 rounded mx-5 h-6">
              {discount + "% off"}
            </div>
          )}
        </div>
        {discount > 0 && (
          <div className="original-price text-grayish-blue line-through lg:mt-2">
            £{price.toFixed(2)}
          </div>
        )}
      </div>
      <div className="sm:flex lg:mt-8 flex-col w-full">
        {totalQuantity > 0 && (
          <div>
            <label
              for="small-input"
              class="block text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <div className="quantity-container w-full bg-light-grayish-blue rounded-lg h-14 mb-4 flex items-center justify-between font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
              <input
                min={1}
                max={totalQuantity}
                className="dark:bg-gray-800 block border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                type="number"
                name="quantity"
                value={quantity}
                aria-label="quantity number"
                onChange={(e) => {
                  if (e.target.value <= totalQuantity && e.target.value > 0) {
                    setQuantity(e.target.value);
                  }
                }}
              />
            </div>
          </div>
        )}
        {userBits > 0 && props.item.bits && (
          // && userBits > bitsLimit
          <div className="flex flex-row">
            <div className="flex items-center h-4 justify-center mb-4">
              <input
                id="remember"
                type="checkbox"
                value={useBits}
                className="w-4 h-4  border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
                onChange={(e) => {
                  setUseBits(e.target.checked);
                }}
              />
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Use Bits
                {/* to get upto{" "} */}
                {/* {((bitsLimit / conversionRate / discountedPrice) * 100).toFixed( */}
                {/* 2 */}
                {/* )} */}
                {/* % discount. */}
                {/* on max {Math.min(userBits % bitsLimit, quantity)}{" "} items. */}
              </label>
            </div>
          </div>
        )}

        {"userid" in localStorage && userBits < 1 && (
          <div className="text-left flex flex-row gap-2 items-center mb-2">
            <p class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Earn Bits to get discounts!!!
            </p>
            <BitScheme />
          </div>
        )}

        {useBits && (
          <div>
            <label
              for="small-input"
              class="block text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Set Bits to use max: ({Math.min(userBits, quantity * bitsLimit)})
            </label>
            <div className="quantity-container w-full bg-light-grayish-blue rounded-lg h-14 mb-4 flex items-center justify-between font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
              <input
                min={0}
                className="dark:bg-gray-800 block border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                type="number"
                name="quantity"
                value={bitsUsed}
                aria-label="quantity number"
                max={Math.min(userBits, quantity * bitsLimit)}
                onChange={(e) => {
                  if (
                    // e.target.value > 0 &&
                    e.target.value <= Math.min(userBits, quantity * bitsLimit)
                  ) {
                    setBitsUsed(e.target.value);
                  }
                }}
              />
            </div>
          </div>
        )}
        {/* {userBits < bitsLimit && props.item.bits && (
          <label
            for="default-checkbox"
            class="text-left mb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Need {bitsLimit - userBits} more bits to get{" "}
            {((bitsLimit / conversionRate / discountedPrice) * 100).toFixed(2)}%
            discount
          </label>
        )} */}
        {"userid" in localStorage && totalQuantity > 0 && (
          <div className="flex flex-row gap-2">
            <button
              // onClick={(e) => {
              //   var cart = [];
              //   var bitsLeft = bitsUsed;
              //   var bitsSpentHere = Math.min(bitsLeft, bitsLimit);
              //   Array.from(Array(parseInt(quantity))).map((it, index) => {
              //     if (useBits && bitsLeft > 0) {
              //       var newItem = {
              //         id: props.item._id,
              //         title: props.item.title,
              //         img: images[0],
              //         price: discountedPrice - bitsSpentHere / conversionRate,
              //         discount: discount,
              //         bitsSpent: Math.min(bitsLeft, bitsLimit),
              //       };

              //       bitsLeft = bitsLeft - bitsSpentHere;
              //     } else {
              //       var newItem = {
              //         id: props.item._id,
              //         title: props.item.title,
              //         img: images[0],
              //         price: discountedPrice,
              //         discount: discount,
              //         bitsSpent: 0,
              //       };
              //     }
              //     cart.push(newItem);
              //   });
              //   console.log(cart);

              //   const ret = addCart(cart);
              //   if (ret) {
              //     fetchUserBits();
              //     setBitsUsed(0);

              //     setTotalQuantity(totalQuantity - quantity);
              //     setQuantity(totalQuantity - quantity > 0 ? 1 : 0);

              //     props.setShowSucces(true);
              //     var oldLength =
              //       "cartLength" in sessionStorage
              //         ? JSON.parse(sessionStorage.getItem("cartLength"))
              //         : 0;
              //     let newLength = parseInt(oldLength) + parseInt(quantity);
              //     sessionStorage.setItem("cartLength", newLength);
              //     const storageChangeEvent = new Event("sessionStorageChange");
              //     window.dispatchEvent(storageChangeEvent);
              //     setTimeout(() => {
              //       props.setShowSucces(false);
              //     }, 3000); // 3000 milliseconds (3 seconds)
              //   } else {
              //     props.setShowFailure(true);
              //     setTimeout(() => {
              //       props.setShowFailure(false);
              //     }, 3000); // 3000 milliseconds (3 seconds)
              //   }

              //   // window.location.reload();
              // }}

              onClick={() => {
                let bitsPerItem = bitsUsed / quantity;

                var newItem = {
                  id: props.item._id,
                  // title: props.item.title,
                  // img: images[0],
                  // price: discountedPrice - bitsPerItem / conversionRate,
                  // discount: discount,
                  bitsSpent: bitsPerItem,
                  quantity: quantity,
                };

                addCart(newItem);
              }}
              className="cart w-full h-14 bg-blue-700 rounded-lg lg:rounded-xl mb-2 shadow-bg-blue-700 shadow-2xl text-white flex items-center justify-center hover:opacity-60"
            >
              <i className="cursor-pointer text-white text-xl leading-0 pr-3">
                <ion-icon name="cart-outline"></ion-icon>
              </i>
              Add to cart
            </button>
          </div>
        )}
        <div className="flex flex-row gap-2 justify-evenly">
          {localStorage.getItem("userid") === null && (
            <Link
              className="cart w-full py-4 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 text-white hover:opacity-60"
              to={"/login"}
            >
              Login or Sign Up to pay
            </Link>
          )}
          {localStorage.getItem("userid") !== null && (
            <>
              <Link
                className="cart w-full py-4 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 text-white hover:opacity-60"
                to={"/checkout"}
              >
                Go to Checkout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MerchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get(useParams().id);
  const [product, setProduct] = useState(null);
  const [showLightBox, setShowLightBox] = useState(false);

  const [showSucces, setShowSucces] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const close = () => {
    setShowLightBox(false);
  };
  const open = () => {
    setShowLightBox(true);
  };
  useEffect(() => {
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/getmerch",
      data: { id: productId },
    };

    axios(config).then(function (response) {
      setProduct(response.data.items[0]);
    });
  }, []);

  if (product === null) return <Loading />;
  else if (product === undefined) {
    return (
      <div className="dark:bg-gray-900">
        <Header />
        <div className="min-h-screen">
          <p className="text-center dark:text-white text-xl font-bold">
            Error:
          </p>
          <p className="text-center dark:text-white text-sm">
            404: Product Not Found
          </p>
        </div>
        <Footer />
      </div>
    );
  }
  console.log(product);

  return (
    <>
      <Stack>
        {showSucces && (
          <div
            id="toast-danger"
            class="fixed top-0 left-0 right-0 mx-auto w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
            style={{ zIndex: 9999 }} // Set a high z-index value
          >
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="sr-only">Check icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">Item added successfully.</div>
            {/* <button
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-success"
              aria-label="Close"
              onClick={() => {
                setShowSucces(false);
              }}
            >
              <span class="sr-only">Close</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button> */}
          </div>
        )}

        {showFailure && (
          <div
            id="toast-danger"
            class="fixed top-0 left-0 right-0 mx-auto w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
            style={{ zIndex: 9999 }} // Set a high z-index value
          >
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span class="sr-only">Error icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">Item has been deleted.</div>
            {/* <button
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
              onClick={() => {
                setShowFailure(false);
              }}
            >
              <span class="sr-only">Close</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button> */}
          </div>
        )}
        <div className="App font-kumbh-sans min-h-screen relative dark:bg-gray-900 dark:text-white">
          <Header />
          <Breadcrumb />
          <main className="product-container lg:flex lg:items-center lg:gap-x-12 xl:gap-x-24 lg:px-20 xl:px-40 lg:py-20 lg:m-auto lg:mt-2 lg:max-w-8xl">
            <h1 className="absolute w-1 h-1 overflow-hidden p-0 -m-1">
              Product page
            </h1>
            {showLightBox && <DesktopLightBox item={product} close={close} />}
            <div className="mobile-slider lg:hidden">
              <MobileSlider item={product} />
            </div>
            <div className="destop-preview hidden lg:block">
              <DesktopPreview open={open} item={product} />
            </div>
            <section className="product-details container mx-auto px-2 pt-5 sm:pt-10 lg:pt-5 pb-20 lg:pb-5 lg:pr-0 xl:ml-1">
              <ProductDetails
                item={product}
                setShowSucces={setShowSucces}
                setShowFailure={setShowFailure}
              />
            </section>
          </main>
        </div>
        <Footer />
      </Stack>
    </>
  );
}
