import React from "react";
import { Link } from "react-router-dom";

import "./Banner.css";
import Avatar from "../../assets/icons/avatar.png";
import BGBanner from "../../assets/images/bg-banner.png";

export default function () {
  const bannerStyle = {
    // backgroundImage: `url(${BGBanner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  };

  return (
    <div className="Banner" style={bannerStyle}>
      <div className="menubar">
        <Link to="/">
          <div className="brand">
            <span className="logo">kt</span>
            <span className="name">Kreeti</span>
          </div>
        </Link>
      </div>
      <div className="banner-container">
        <h1 className="head">Online Examing</h1>
        <p className="content">The best way to taking online exam</p>
      </div>
    </div>
  );
}
