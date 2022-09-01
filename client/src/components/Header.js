import React from "react";
import { Link } from "react-router-dom";
import text from "../assets/Text.json";
// TODO
// Currently just a bunch of HTML links stacked next to each other
// Eventually will be a more fleshed out nav bar on top
// of the page
function Header() {
  return (
    <header className="header" role="banner">
      <nav className="navbar">
        <Link to="login">{text.titles.loginTitle}</Link>
        <Link to="assumption-of-liability">{text.titles.assumptionTitle}</Link>
        <Link to="purchase-new-device">{text.titles.purchaseTitle}</Link>
        <Link to="service-change">{text.titles.serviceChangeTitle}</Link>
      </nav>
    </header>
  );
}

export default Header;
