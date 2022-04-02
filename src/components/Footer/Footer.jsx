import React from "react";
import "./footer.css";
import { IoIosArrowDropup } from "react-icons/io";
import l from "../../images/logo4.png";
import { useTranslation } from "react-i18next";
import { FaTelegramPlane, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div id="footer" className="section footer mb-0">
        <div className="container">
          <div className="row footer-row">
            <div className="col-11 text-right">
              <a
                id="footerCircleButton"
                className="btn btn-circle btn-outline-semi-light footer-circle-button"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <IoIosArrowDropup size={60} style={{ color: "#7c625a" }} />
              </a>
            </div>
            <div className="col-12 text-center footer-content">
              <img alt="footer logo" src={l} className="footer-logo" />
            </div>
          </div>
          <div id="footerMenuAccordion" className="row"></div>
        </div>
        <div className="container copyright pt-5 pb-5">
          <div className="row justify-content-between">
            <div
              className="col-sm-12 col-md-6 mb-2"
              style={{ color: "#dacc79", fontSize: "24px" }}
            >
              2022 © {t("SplashNETWORK.1")}
            </div>
            <div className="social-icons col-sm-12 col-md-6 text-center d-flex justify-content-evenly">
              <p>
                <a
                  style={{ color: "#dacc79", fontSize: "20px" }}
                  target="_blank"
                  href="https://t.me/+V_o9E0Mms0s3YWQx"
                  className="footer-link"
                >
                  <FaTelegramPlane size={30} />

                  {t("JoinusonTelegram.1")}
                </a>
              </p>
              <p>
                <a
                  style={{ color: "#dacc79", fontSize: "20px" }}
                  target="_blank"
                  href="https://twitter.com/splassive_com"
                  className="footer-link"
                >
                  <FaTwitter size={30} />
                  {t("JoinusTwiter.1")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
