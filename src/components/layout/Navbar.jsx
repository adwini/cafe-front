import React from "react";
import navImage from "../../assets/img/header-img.png";
const NavBar = () => {
  return (
    <>
      <div className="bg-black">
        <div className="flex items-center justify-between">
          <img src={navImage} alt="KopeeTearia" className="h-12" />
        </div>
      </div>
      <div
        className="bg-[rgba(0,0,139,0.96)] text-white text-center p-2 font-extrabold whitespace-nowrap overflow-hidden"
        style={{ fontFamily: "Helvetica, sans-serif" }}>
        <marquee behavior="scroll" direction="left">
          <strong>5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!</strong>
        </marquee>
      </div>
    </>
  );
};

export default NavBar;
