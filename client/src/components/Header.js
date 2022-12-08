import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/img/logo.svg"

const Header = () => {
    const { t } = useTranslation("Common")

    return (
    <header className="header" role="banner">
        <nav className="navbar navbar-expand-md navbar-light bg-light">

            <Link className="navbar-brand" to="/">
                <img src={logo} alt="logo" />
            </Link>
            <button 
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-5">
                    <li className="nav-item">
                        <a className="nav-link"
                            href={t("GitHubLink")}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("GitHubLinkText")}
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            {t("LogInText")}
                        </Link>
                    </li>
                </ul>
            </div>
        </ nav>
    </ header>
    )
}
export default Header