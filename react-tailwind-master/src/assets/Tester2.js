import React, { useState } from "react";
import "./CSS/animation.css";
import { ReactComponent as Store } from "./CSS/cart-shopping-solid.svg";

const ComponentA = () => {
  const [animate, setAnimate] = useState(false);
  const [show, setShow] = useState(false);

  //   const handleMove = () => {
  //     setAnimate(true);
  //     setShow(true);
  //     setTimeout(() => {
  //       setAnimate(false);
  //       setShow(false);
  //     }, 2000); // Adjust the duration to match your animation duration
  //   };
  let count = 0;
  const counter = document.getElementById("counter");
  document
    .getElementById("add-animation")
    .addEventListener("click", (Event) => {
      const c1 = counter.classList;
      const c = "animated-counter";
      count++;
      counter.innerText = count;
      c1.remove(c, c1.contains(c));
      setTimeout(() => counter.classList.add("animated-counter"), 1);
    });
  return (
    //     <div className="main bg-white ">
    //       <div>
    //         <Store />
    //       </div>
    //       <div style={{ position: "absolute", bottom: "10px", left: "50%" }}>
    //         <button
    //           className="bg-blue-600 rounded-lg px-2 py-2 text-lg text-white"
    //           onClick={handleMove}
    //         >
    //           Move
    //         </button>
    //         {show && (
    //           <div
    //             className={`w-20 h-20 bg-blue-500 ${animate ? "animate-move" : ""}`}
    //           ></div>
    //         )}
    //       </div>
    //     </div>
    //

    <div className="main">
      <div className="shopping-container">
        <div className="counter-container">
          <span id="counter">1</span>
          <Store />
        </div>
        <button id="add-animation">Add to cart</button>
      </div>
    </div>
  );
};

export default ComponentA;
