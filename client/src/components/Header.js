import React from "react";
import { Link } from "react-router-dom";
import * as text from "../assets/text.json";
// TODO
// Currently just a bunch of HTML links stacked next to each other
// Eventually will be a more fleshed out nav bar on top
// of the page
function Header() {
  return (
    <header className="header" role="banner">
      <nav className="navbar">
        <Link to="login">{text.loginTitle}</Link>
        <Link to="assumption-of-liability">{text.assumptionTitle}</Link>
        <Link to="purchase-new-device">{text.assumptionTitle}</Link>
        <Link to="service-change">{text.serviceChangeTitle}</Link>
      </nav>
    </header>
  );
}

export default Header;
