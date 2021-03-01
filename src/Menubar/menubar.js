import React from "react";
import "./menubar.scss";
import logo from "../Assets/logo.png";

export default function Menubar({ history }) {
  return (
    <div className="menu-wrapper">
      <img
        src={logo}
        onClick={() => {
          history.push("/");
        }}
      ></img>
      <h4
        onClick={() => {
          history.push("/favourites");
        }}
      >
        Wishlist
      </h4>
    </div>
  );
}
