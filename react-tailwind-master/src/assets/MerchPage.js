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
      <div className="preview xl:min-w-md max-w-3xl rounded-2xl overflow-hidden cursor-pointer">
        <img onClick={props.open} src={previewImg} alt="product-preview" />
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
    var toSend = [];
    newItem.map((it) => {
      toSend.push({ id: it.id, bitsSpent: it.bitsSpent });
    });
    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addCart",
      data: {
        user: JSON.parse(localStorage.getItem("userid")),
        cart: toSend,
        cartId: cartId,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.cartId) {
            setCartId(response.data);
            sessionStorage.setItem("cartID", response.data.cartId);
          }
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const [discountedPrice, setDiscountedPrice] = useState(
    props.item.discount > 0
      ? props.item.price - props.item.price * (props.item.discount / 100)
      : props.item.price
  );
  const [userBits, setUserBits] = useState(0);
  const [useBits, setUseBits] = useState(false);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchConversionRate();
    fetchUserBits();
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
            className="price text-3xl"
          >
            £{discountedPrice}
          </div>

          {props.item.discount > 0 && (
            <div className="discount text-blue-700 bg-blue-200 w-max px-2 rounded mx-5 h-6">
              {props.item.discount + "% off"}
            </div>
          )}
        </div>
        {props.item.discount > 0 && (
          <div className="original-price text-grayish-blue line-through lg:mt-2">
            £{props.item.price.toFixed(2)}
          </div>
        )}
      </div>
      <div className="sm:flex lg:mt-8 flex-col w-full">
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
              if (e.target.value > totalQuantity) {
                setQuantity(totalQuantity);
              } else if (e.target.value < 0) {
                setQuantity(0);
              } else setQuantity(e.target.value);
            }}
          />
        </div>
        {props.item.bits && userBits > bitsLimit && (
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
                Use Bits to get{" "}
                {((bitsLimit / conversionRate / discountedPrice) * 100).toFixed(
                  2
                )}
                % discount on max {Math.min(userBits % bitsLimit, quantity)}{" "}
                items.
              </label>
            </div>
          </div>
        )}{" "}
        {userBits < bitsLimit && props.item.bits && (
          <label
            for="default-checkbox"
            class="text-left mb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Need {bitsLimit - userBits} more bits to get{" "}
            {(bitsLimit / conversionRate / discountedPrice) * 100}% discount
          </label>
        )}
        {"userid" in localStorage && (
          <div className="flex flex-row gap-2">
            <button
              onClick={(e) => {
                var cart = [];
                var maxDiscountedItems = userBits % bitsLimit;
                console.log(discountedPrice - bitsLimit / conversionRate);
                Array.from(Array(parseInt(quantity))).map((it, index) => {
                  var newItem = {
                    id: props.item._id,
                    title: props.item.title,
                    img: images[0],
                    price:
                      index < maxDiscountedItems && useBits
                        ? discountedPrice - bitsLimit / conversionRate
                        : discountedPrice,
                    discount: props.item.discount,
                    bitsSpent: index + 1 < maxDiscountedItems ? useBits : false,
                  };
                  cart.push(newItem);
                });
                setTotalQuantity(totalQuantity - quantity);
                setQuantity(totalQuantity - quantity > 0 ? 1 : 0);

                addCart(cart);
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
      setProduct(response.data.items);
      console.log(response.data);
      console.log(productId);
    });
  }, []);

  if (product === null) return <Loading />;

  return (
    <>
      <Stack>
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
            <section className="product-details container mx-auto px-6 pt-5 sm:pt-10 lg:pt-5 pb-20 lg:pb-5 lg:pr-0 lg:pl-7 xl:ml-1">
              <ProductDetails item={product} />
            </section>
          </main>
        </div>
        <Footer />
      </Stack>
    </>
  );
}
