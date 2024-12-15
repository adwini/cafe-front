import React from "react";
import menuImg from "../assets/img/menu.png";
function Menu() {
  return (
    <div className="flex justify-center w-full p-4">
      <img src={menuImg} alt="Menu" className="rounded-lg shadow-lg" />
    </div>
  );
}

export default Menu;
