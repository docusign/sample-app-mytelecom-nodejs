import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/img/logo.svg"
import source from "../assets/img/github-source.svg"

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
                className="navbar-collapse justify-content-end"
            >
                <Link className="nav-link" to={t("GitHubLink")} rel="noopener noreferrer" target="_blank">
                    <img src={source} alt={t("GitHubLinkText")}/>
                </Link>
            </div>
        </ nav>
    </ header>
    )
}
export default Header