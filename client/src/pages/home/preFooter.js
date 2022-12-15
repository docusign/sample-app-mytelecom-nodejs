import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import arrow from "../../assets/img/arrow-square-right.svg"

const PreFooter = () => {
    const { t } = useTranslation("Home")
    return (
        <section className="text-center">
            <div className="container cta-section">
                <h2 className="h2 cta-title">{t("PreFooter1")}</h2>
                <div className="cta-description">{t("PreFooter2")}</div>
            </div>
            <div className="cta-buttons">
                <a href={t("CreateDeveloperAccountHeaderLink")} rel="noopener noreferrer">
                    <button className="first-button" type="button">
                    {t("CreateDeveloperAccountHeader")}
                    </button>
                </a>

                <a href={t("LearnMoreLink")} rel="noopener noreferrer">
                    <button className="second-button" type="button">
                    {t("LearnMore")}
                    </button>
                </a>
            </div>
            <div className="cta-links">
                <div className="resource-links">
                    <h2 className="h2 resource-title">{t("PreFooter3")}</h2>
                    <div className="resource-link">
                        <a
                            className="resource-link"
                            href={t("DocuSignLink")}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("DocuSignLinkHeader")}
                            <img src={arrow} alt=""/>
                        </a>
                    </div>
                    <div className="resource-link">
                        <a
                            className="resource-link"
                            href={t("eSignatureSDKLink")}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("eSignatureSDK")}
                            <img src={arrow} alt=""/>
                        </a>
                    </div>
                    <div className="resource-link">
                        <a
                            className="resource-link"
                            href={t("ClickSDKLink")}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("ClickSDK")}
                            <img src={arrow} alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default PreFooter;