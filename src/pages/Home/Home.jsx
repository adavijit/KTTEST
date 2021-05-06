import React from "react";

import "./Home.css";

import Banner from "../../components/Banner/Banner";
import Register from "../../components/Register/Register";

export default function () {
  return (
    <div className="Home">
      <Banner />
      <Register />
    </div>
  );
}
