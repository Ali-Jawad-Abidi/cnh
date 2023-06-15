import { createContext, useEffect, createRef, useRef, useState } from "react";
import imgProduct1 from "../img/image-product-1.jpg";
import imgProduct2 from "../img/image-product-2.jpg";
import imgProduct3 from "../img/image-product-3.jpg";
import imgProduct4 from "../img/image-product-4.jpg";
import thumbnail1 from "../img/image-product-1-thumbnail.jpg";
import thumbnail2 from "../img/image-product-2-thumbnail.jpg";
import thumbnail3 from "../img/image-product-3-thumbnail.jpg";
import thumbnail4 from "../img/image-product-4-thumbnail.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  console.log("Hellllllo");
  const productId = useParams().id;
  const [images, setImages] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [thumbnails, setThumbnails] = useState(null);
  const [slideCount, setSlideCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [thisproduct, setThisProduct] = useState(null);

  const currentIndex = parseInt(0);
  let thumbnailRef = createRef();
  let modalThumbnailRef = useRef(null);
  const sliderRef = useRef(null);
  const productImgRef = useRef();
  const productTitleRef = createRef(null);
  const productPriceRef = useRef();
  const productQuantityRef = useRef();

  useEffect(() => {
    if (false) {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/getmerch",
        data: { id: productId },
      };

      axios(config).then(function (response) {
        setImages(response.data.images);
        setPreviewImg(response.data.images[0]);
        setThumbnails(response.data.images);
        setTotalQuantity(response.data.quantity);
        setDiscount(response.data.discount);
        setPrice(response.data.price);
        setTitle(response.data.title);
        setDescription(response.data.description);
        var newItem = {
          img: response.data.images[0],
          title: response.data.title,
          id: response.data._id,
          price: response.data.price,
          quantity: 0,
        };
        setThisProduct(newItem);

        thumbnailActive();
        modalThumbnailActive();
      });
    } else {
      thumbnailActive();
      modalThumbnailActive();
    }
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);

    // eslint-disable-next-line
  }, [previewImg, modal, productId]);

  const previewDisplay = (e) => {
    // CHANGE PREVIEW IMG ON CLICK
    setPreviewImg(images[e.target.id]);
  };

  const lightBox = () => {
    setModal(true);
  };

  const close = () => {
    setModal(false);
  };

  const nextPreview = () => {
    if (currentIndex > 2) {
      setPreviewImg(images[currentIndex]);
    } else {
      setPreviewImg(images[currentIndex + 1]);
    }
  };

  const prevPreview = () => {
    if (currentIndex < 1) {
      setPreviewImg(images[currentIndex]);
    } else {
      setPreviewImg(images[currentIndex - 1]);
    }
  };

  const thumbnailActive = () => {
    // REMOVE STYLE FROM INACITVE THUMBNAIL
    thumbnailRef.current.childNodes.forEach((img) => {
      img.classList.remove("border-2", "border-orange");
      img.firstElementChild.classList.remove("opacity-50");
    });

    // STYLE ACITVE THUMBNAIL
    return (
      thumbnailRef.current.childNodes[currentIndex].classList.add(
        "border-2",
        "border-orange"
      ),
      thumbnailRef.current.childNodes[
        currentIndex
      ].firstElementChild.classList.add("opacity-50")
    );
  };

  const modalThumbnailActive = () => {
    if (modal) {
      // REMOVE STYLE FROM INACITVE THUMBNAIL
      let modalThumbnailImgs =
        modalThumbnailRef.current.parentElement.childNodes;
      modalThumbnailImgs.forEach((img) => {
        img.classList.remove("border-2", "border-orange");
        img.firstElementChild.classList.remove("opacity-50");
      });

      // STYLE ACITVE THUMBNAIL
      return (
        modalThumbnailImgs[currentIndex].classList.add(
          "border-2",
          "border-orange"
        ),
        modalThumbnailImgs[currentIndex].firstElementChild.classList.add(
          "opacity-50"
        )
      );
    }
  };

  const nextSlide = () => {
    let slideLength = sliderRef.current.childElementCount;
    if (
      slideCount > slideLength - 2 ||
      (slideCount > slideLength - 3 && window.innerWidth > 640)
    ) {
      setSlideCount(slideCount);
      sliderRef.current.style.transform = `translateX(-${100 * slideCount}%)`;
    } else {
      setSlideCount(slideCount + 1);
      sliderRef.current.style.transform = `translateX(-${
        100 * (slideCount + 1)
      }%)`;
    }
  };

  const prevSlide = () => {
    if (slideCount === 0) {
      setSlideCount(slideCount);
      sliderRef.current.style.transform = `translateX(-${100 * slideCount}%)`;
    } else {
      setSlideCount(slideCount - 1);
      sliderRef.current.style.transform = `translateX(-${
        100 * (slideCount - 1)
      }%)`;
    }
  };

  // const quantity = (e) => {
  //   let action = e.target.innerText;
  //   if (action === "-") {
  //     setQuantityCount((quantityCount) => Math.max(quantityCount - 1, 1));
  //   } else if (action === "+") {
  //     setQuantityCount((quantityCount) =>
  //       Math.min(quantityCount + 1, totalQuantity)
  //     );
  //   } else {
  //     setQuantityCount(() => Math.min(parseInt(e.target.value), totalQuantity));
  //   }
  // };

  const cartDisplay = () => {
    setShowCart(!showCart);
  };

  const addCart = (newItem) => {
    console.log(newItem);
    if (localStorage.getItem("cart") !== null) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      const ret = cart.findIndex((item) => item.id === newItem.id);
      console.log(ret);
      if (ret === -1) {
        setCartItems((oldArray) => [...oldArray, newItem]);
        cart.push(newItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        setTotal(cart.length);
      } else {
        if (newItem.quantity !== cart[ret].quantity)
          cart[ret].quantity = newItem.quantity;
        setCartItems(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([newItem]));
      setCartItems([newItem]);
    }
  };

  const deleteItem = (product) => {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems(cart);
    setTotal(cart.length);
  };

  return (
    <ProductContext.Provider
      value={{
        images,
        thumbnails,
        thumbnailRef,
        previewImg,
        modal,
        modalThumbnailRef,
        sliderRef,
        quantityCount,
        cartItems,
        showCart,
        productImgRef,
        productTitleRef,
        productPriceRef,
        productQuantityRef,
        price,
        discount,
        totalQuantity,
        title,
        total,
        description,
        thisproduct,
        addCart,
        setQuantityCount,
        previewDisplay,
        lightBox,
        close,
        nextPreview,
        prevPreview,
        nextSlide,
        prevSlide,
        // quantity,
        cartDisplay,
        deleteItem,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
