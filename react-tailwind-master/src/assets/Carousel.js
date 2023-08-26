import React, { useState } from "react";
import { useEffect } from "react";

// import { RxDotFilled } from "react-icons/rx";

export default function Carousel(props) {
  const slides = props.slides;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // useEffect(() => {
  //   props.slide &&
  //     setInterval(() => {
  //       setCurrentIndex((currentIndex + 1) % slides.length);
  //     }, 5000);
  // }, []);

  return (
    <div className="w-full m-auto relative group">
      <div
        // style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      >
        {slides[currentIndex]}
      </div>
      {/* Left Arrow */}
      <div
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <button
          // onClick={nextSlide}
          className="next-arrow w-14 h-14 bg-white rounded-full"
        >
          <i className="flex items-center text-black justify-center m-auto text-2xl hover:text-black">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </i>
        </button>
      </div>
      {/* Right Arrow */}

      <div
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <button
          // onClick={nextSlide}
          className="next-arrow w-14 h-14 bg-white rounded-full"
        >
          <i className="flex items-center text-black justify-center m-auto text-2xl hover:text-black">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </i>
        </button>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        ))}
      </div>
    </div>
  );
}
