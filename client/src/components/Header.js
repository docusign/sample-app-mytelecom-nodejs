import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header" role="banner">
      <nav className="navbar">
        <Link to="login">Login</Link>
        <Link to="assumption-of-liability">Assumption of Liability</Link>
      </nav>
    </header>
  );
}

export default Header;
