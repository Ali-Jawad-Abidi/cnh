// import Product from "./Product";
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
      <div className="screen fixed inset-0 opacity-70 bg-black transition-all"></div>
      <div className="modal-content container max-w-lg m-auto z-40 relative pt-10">
        <span
          onClick={props.close}
          className="close absolute top-0 right-0 text-4xl leading-0 cursor-pointer text-white hover:text-orange transition-colors"
        >
          <ion-icon name="close-outline"></ion-icon>
        </span>
        <div className="preview xl:min-w-md max-w-3xl rounded-2xl overflow-hidden cursor-pointer">
          <img src={previewImg} alt="product-preview" />
        </div>
        <div className="thumbnails flex max-w-3xl justify-between pt-8">
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
        </div>
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
    </section>
  );
}

function MobileSlider(props) {
  console.log(props);
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
      <div className="images flex w-full h-96 items-center transition-all">
        <img src={previewImg} alt="slider-img" />
      </div>
      <div className="directions absolute inset-x-0 inset-y-1/2 flex items-center justify-between mx-4">
        <button
          onClick={prevSlide}
          className="back-arrow w-10 h-10 bg-white rounded-full"
        >
          <i className="flex items-center justify-center m-auto text-lg">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </i>
        </button>
        <button
          onClick={nextSlide}
          className="next-arrow w-10 h-10 bg-white rounded-full"
        >
          <i className="flex items-center justify-center m-auto text-lg">
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
  var title = props.item.title;
  var discount = props.item.discount;
  const [bitsLimit, setBitsLimit] = useState(props.item.bitsLimit);
  var bits = props.item.bits;
  var description = props.item.description;
  var images = props.item.images;
  const addCart = props.addCart;
  var totalQuantity = props.item.quantity;
  const [conversionRate, setConversionRate] = useState(1);
  var [bitsSpent, setBitsSpent] = useState(0);
  var link = props.item.link;
  var [showComboBox, setShowComboBox] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(props.item.price);
  const [userBits, setUserBits] = useState(0);

  var [quantity, setQuantity] = useState(1);
  var price = originalPrice - bitsSpent / conversionRate;

  var bitsLimitToShow = bitsLimit;

  useEffect(() => {
    fetchConversionRate();
  });

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
    <>
      <h2 className="company uppercase text-blue-700 font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
        consolenostalgia store
      </h2>
      <h3
        // ref={productTitleRef}
        className="product capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl sm:leading-none pb-3"
      >
        {title}
        {/* <span className="block lg:mt-1">sneakers</span> */}
      </h3>
      <p className="text-dark-grayish-blue pb-6 lg:py-7 lg:leading-6">
        {description}
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
            ${(price - price * (discount / 100)).toFixed(2)}
          </div>

          {discount > 0 && (
            <div className="discount text-blue-700 bg-blue-200 w-max px-2 rounded mx-5 h-6">
              {discount + "% off"}
            </div>
          )}
        </div>
        {discount > 0 && (
          <div className="original-price text-grayish-blue line-through lg:mt-2">
            ${originalPrice.toFixed(2)}
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
          {/* <button
            onClick={() => {
              setQuantity(quantity !== 1 ? quantity - 1 : 1);
            }}
            className="text-blue-700 text-2xl leading-none font-bold mb-1 lg:mb-2 lg:text-3xl hover:opacity-60"
          >
            -
          </button> */}
          <input
            // ref={productQuantityRef}
            min={1}
            max={totalQuantity}
            // onChange={(e, v) => {
            //   console.log(e, v);
            // }}
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
          {/* <button
            onClick={() => {
              setQuantity(
                quantity !== totalQuantity ? quantity + 1 : totalQuantity
              );
            }}
            className="text-blue-700 text-2xl leading-none font-bold mb-1 lg:mb-2 lg:text-3xl hover:opacity-60"
          >
            +
          </button> */}
        </div>

        <div className="flex flex-row w-full gap-2">
          {!showComboBox ? (
            <>
              <button
                onClick={(e) => {
                  var newItem = {
                    id: props.item._id,
                    title: title,
                    img: images[0],
                    price: price,
                    discount: discount,
                    quantity: quantity,
                    bitsSpent: 0,
                  };
                  addCart(newItem);
                }}
                className="cart w-full h-14 bg-blue-700 rounded-lg lg:rounded-xl mb-2 shadow-bg-blue-700 shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:opacity-60"
              >
                <i className="cursor-pointer text-white text-xl leading-0 pr-3">
                  <ion-icon name="cart-outline"></ion-icon>
                </i>
                Add to cart
              </button>

              <button
                onClick={(e) => {
                  setShowComboBox(true);
                  var config = {
                    method: "get",
                    url: process.env.REACT_APP_API_BASE_URL + "/bits",
                    params: { id: JSON.parse(localStorage.getItem("userid")) },
                  };
                  axios(config).then((response) => {
                    if (response.status === 200) {
                      var Items =
                        JSON.parse(localStorage.getItem("cart")) || [];

                      var t = 0;
                      Items.map((item) => {
                        t = t + item.bitsSpent;
                      });
                      setUserBits(parseInt(response.data) - t);
                    } else {
                      setUserBits(0);
                    }
                  });
                }}
                className="cart w-full h-14 bg-blue-700 rounded-lg lg:rounded-xl mb-2 shadow-bg-blue-700 shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:opacity-60"
              >
                <i className="cursor-pointer text-white text-xl leading-0 pr-3">
                  <ion-icon name="cart-outline"></ion-icon>
                </i>
                Use Bits
              </button>
            </>
          ) : (
            <div className="flex flex-col w-full">
              <label className="text-left block text-sm font-medium dark:text-white">
                Bits Spent, Max bits to be spent: (
                {Math.min(bitsLimitToShow, userBits)})
              </label>
              <div className="flex flex-row gap-2 justify-evenly w-full">
                <input
                  type="number"
                  className="dark:bg-gray-800 block h-14 w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                  value={bitsSpent}
                  onChange={(e) => {
                    setBitsSpent(e.target.value);
                  }}
                  min={0}
                  max={Math.min(bitsLimitToShow, userBits)}
                />

                <button
                  onClick={(e) => {
                    var newItem = {
                      id: props.item._id,
                      title: title,
                      img: images[0],
                      price: price,
                      discount: discount,
                      quantity: quantity,
                      bitsSpent: bitsSpent,
                    };
                    addCart(newItem);
                  }}
                  className="cart w-full h-14 bg-blue-700 rounded-lg lg:rounded-xl mb-2 shadow-bg-blue-700 shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:opacity-60"
                >
                  <i className="cursor-pointer text-white text-xl leading-0 pr-3">
                    <ion-icon name="cart-outline"></ion-icon>
                  </i>
                  Add to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
            {showComboBox ? (
              <div className="flex flex-row gap-2 w-full justify-evenly">
                <button
                  className="bg-red-600 w-full rounded-lg hover:bg-red-800"
                  onClick={() => {
                    setShowComboBox(false);
                  }}
                >
                  Cancel
                </button>
                <Link
                  className="cart w-full py-4 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 text-white hover:opacity-60"
                  to={"/checkout"}
                >
                  Go to Checkout
                </Link>
              </div>
            ) : (
              <Link
                className="cart w-full py-4 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 text-white hover:opacity-60"
                to={"/checkout"}
              >
                Go to Checkout
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default function MerchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get(useParams().id);
  var [product, setProduct] = useState(null);
  var [showLightBox, setShowLightBox] = useState(false);
  var [quantity, setQuantity] = useState(0);
  var len =
    "cart" in localStorage
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0;
  var [total, setTotal] = useState(len);

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
        setTotal(total + 1);
      }
    }
  };

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
          <Header total={total} />
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
              <ProductDetails addCart={addCart} item={product} />
            </section>
          </main>
        </div>
        <Footer />
      </Stack>
    </>
  );
}
