import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header" role="banner">
      <nav className="navbar">
        <Link to="login">Login</Link>
        <Link to="assumption-of-liability">Assumption of Liability</Link>
        <Link to="purchase-new-device">Purchase New Device</Link>
        <Link to="multi-line-service-change-request-for-business-accounts">
          Multi-Line Service Change Request for Business Accounts
        </Link>
      </nav>
    </header>
  );
}

export default Header;
