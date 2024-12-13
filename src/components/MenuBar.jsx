import React from "react";
import menuImg from "../assets/img/menu.png";
function Menu() {
  return (
    <div className="w-full p-4 flex justify-center">
      <img src={menuImg} alt="Menu" className="rounded-lg shadow-lg" />
    </div>
  );
}

export default Menu;
