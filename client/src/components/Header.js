import React from "react";
import { Link } from "react-router-dom";

// Currently just a bunch of HTML links stacked next to each other
// Eventually will be a more fleshed out nav bar on top
// of the page
function Header() {
  return (
    <header className="header" role="banner">
      <nav className="navbar">
        <Link to="login">Login</Link>
        <Link to="assumption-of-liability">Assumption of Liability</Link>
        <Link to="purchase-new-device">Purchase New Device</Link>
        <Link to="service-change">
          Multi-Line Service Change Request for Business Accounts
        </Link>
      </nav>
    </header>
  );
}

export default Header;
