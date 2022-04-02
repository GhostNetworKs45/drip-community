import React, { useEffect, useState } from "react";
import "./Main.css";
import I from "../../images/logo4.png";
import user from "../../images/user.png";
import curve from "../../images/curve.png";
import van from "../../images/van.png";
import transfer from "../../images/transfer.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dripTokenAddress, dripTokenAbi } from "../utils/DripToken";
import { loadWeb3 } from "../api";
import Web3 from "web3";
const webSupply = new Web3("https://rpc.testnet.fantom.network/");

const Main = () => {
  const { t, i18n } = useTranslation();
  const tradeNvigate = useNavigate();
  const stakeNavigate = useNavigate();
  const farmNavigate = useNavigate();
  let [dripTransaction, setDriptransaction] = useState(0);
  let [dripTotalSupply, setDripTotalSupply] = useState(0);
  let [dripPlayers, setDripplayers] = useState(0);
  let [maxDailyReturn, setMaxdailyReturn] = useState(0);
  let [eventDetail, setEventDetail] = useState([]);

  const getData = async () => {
    let tokenContractof = new webSupply.eth.Contract(
      dripTokenAbi,
      dripTokenAddress
    );
    try {
      let drptrx = await tokenContractof.methods.totalTxs().call();
      let players = await tokenContractof.methods.players().call();
      let ttlSply = await tokenContractof.methods.totalSupply().call();
      ttlSply = webSupply.utils.fromWei(ttlSply);
      ttlSply = parseFloat(ttlSply).toFixed(3);
      setDriptransaction(drptrx);
      setDripTotalSupply(ttlSply);
      setDripplayers(players);
    } catch (e) {
      console.log("Error while Fetching Data In Main", e);
    }
  };
  const getEventDetail = async () => {
    try {
      let acc = await loadWeb3();
      if (acc == "No Wallet") {
        setEventDetail([]);
      } else {
        let data = {
          address: acc,
        };
        let res = await axios.post(
          "https://splash-test-app.herokuapp.com/api/users/getTransactionDetail",
          data
        );
        setEventDetail(res.data);
      }
    } catch (e) {
      console.log("error while get events", e);
    }
  };
  setInterval(() => {
    getEventDetail();
  }, 10000);
  useEffect(() => {
    setInterval(() => {
      getData();
    }, 1000);
    getEventDetail();
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <div className="images">
      <div className="router-view">
        <div>
          <div className="container landing-page">
            <div className="row mb-4 mt-2">
              <div className="container col-xl-12">
                <div className="home-text text-center row">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <span
                          className="luck-title notranslate"
                          style={{ fontFamily: "Jost" }}
                        >
                          <b> {t("SplashNETWORK.1")}</b>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="container col-12 col-xl-8 col-lg-8 col-md-8 text-white text1"
                style={{ fontSize: "20px" }}
              >
                {t("SplashNetworkisthelatestprojectdevelopedby.1")}{" "}
                {t("SplassiveTeam.1")}.
              </div>
              <div
                className="container col-12 col-xl-8 col-lg-8 col-md-8 text-white text2"
                style={{ fontSize: "20px" }}
              >
                {t(
                  "TheofficialtokenoftheSplashNetworkisSplash(SPLASH)ontheAvalancheChain(AVAX)thatcapturesvaluebybeingscarce,deflationary,censorshipresistant,andbybeingbuiltonarobust,trulydecentralizedblockchain..1"
                )}
              </div>
              <br />
              <div
                className="container col-12 col-xl-8 col-lg-8 col-md-8 text-white text3"
                style={{ fontSize: "20px" }}
              >
                {t(
                  "TherecommendedexchangefortradingSplashistheTheWellcontractwhichcanbefounddirectlyontheplatformswebsiteundertheTheWelltab,asitallowsustowaivetheinitial10%taxonbuysandprovidesthelowestpricesandhighestliquidity,resultinginlessslippageforlargertrades..1"
                )}
              </div>
              <div className="raw mainrow">
                <div className="col-xl-6 col-lg-6 col-md-6 mb-4 pt-4 ">
                  <p className="col-11 white mb-3 text-justify" />
                  <p className="col-11 white text-center ">
                    <button
                      style={{ color: "#7c625a", fontSize: "20px" }}
                      type="button"
                      className="btn btn-outline-light btn-block m-3"
                      onClick={() => tradeNvigate("/TheWELL")}
                    >
                      <b>{t("TRADE.1")}</b>
                    </button>

                    <button
                      style={{
                        color: "#7c625a",
                        fontSize: "20px",
                        textDecoration: "none",
                      }}
                      type="button"
                      className="btn btn-outline-light btn-block m-3"
                      onClick={() => stakeNavigate("/THETAP")}
                    >
                      <b>{t("STAKE.1")}</b>
                    </button>

                    <button
                      style={{
                        color: "#7c625a",
                        fontSize: "20px",
                        textDecoration: "none",
                      }}
                      type="button "
                      className="btn btn-outline-light btn-block m-3"
                      onClick={() => farmNavigate("/THESHORE")}
                    >
                      <b>{t("LIQUIDITYFARM.1")}</b>
                    </button>
                  </p>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 mb-5 pt-4 mt-5">
                  <img src={I} className="mainimages" />
                </div>
              </div>
            </div>

            <div className="row mb-4 mt-2">
              <div className="container col-12 text-center">
                <h1 data-v-2b20e1ea id="mainh1">
                  <b style={{ fontFamily: "Jost" }}>{t("STATS.1")}</b>
                </h1>
                <p
                  data-v-2b20e1ea
                  id="mainpp"
                  className="text-white"
                  style={{ fontSize: "20px" }}
                >
                  {t(
                    "TheSplashtokencapturestheentirevalueoftheSplashNetworkandmakesitavailabletotheentireAVAXCommunity.1"
                  )}
                  !
                </p>
              </div>
              <div className="container col-6 col-xl-3 col-lg-3 col-md-3 text-center">
                <div className="price-top-part">
                  <img src={user} alt="" />
                  <h5
                    className="mb-0 font-weight-semibold color-theme-1 mb-2 mt-4 "
                    style={{ color: "#7c625a" }}
                  >
                    {t("Players.1")}
                  </h5>
                  <p className="text-large mb-2 text-white">
                    <span
                      className="notranslate"
                      style={{ color: "#ab9769", fontSize: "20px" }}
                    >
                      {dripPlayers}
                    </span>
                  </p>
                  <p className="text-small"> {t("count.1")}</p>
                </div>
              </div>
              <div className="container col-6 col-xl-3 col-lg-3 col-md-3 text-center">
                <div className="price-top-part">
                  <img src={curve} alt="" width="60px" />
                  <h5
                    className="mb-0 font-weight-semibold color-theme-1 mb-2 mt-4"
                    style={{ color: "#7c625a" }}
                  >
                    {t("Maxdailyreturn.1")}
                    <p className="text-large mb-2 text-white mt-2">
                      <span
                        className="notranslate"
                        style={{ color: "#ab9769", fontSize: "20px" }}
                      >
                        2 %
                      </span>
                    </p>
                    <p className="text-small">returns</p>
                  </h5>
                  <p className="text-large mb-2 text-white">
                    <span className="notranslate" />
                  </p>
                  <p className="text-small"></p>
                </div>
              </div>
              <div className="container col-6 col-xl-3 col-lg-3 col-md-3 text-center">
                <div className="price-top-part">
                  <img src={van} alt="" width="60px" />
                  <h5
                    className="mb-0 font-weight-semibold color-theme-1 mb-2 mt-4"
                    style={{ color: "#7c625a" }}
                  >
                    {t("Totalsupply.1")}{" "}
                  </h5>
                  <p className="text-large mb-2 text-white">
                    <span
                      className="notranslate"
                      style={{ color: "#ab9769", fontSize: "20px" }}
                    >
                      {dripTotalSupply}
                    </span>
                  </p>
                  <p className="text-small">{t("Splash.1")} ≈ 0</p>
                </div>
              </div>
              <div className="container col-6 col-xl-3 col-lg-3 col-md-3 text-center">
                <div className="price-top-part">
                  <img src={transfer} alt="" width="60px" />
                  <h5
                    className="mb-0 font-weight-semibold color-theme-1 mb-2 mt-4"
                    style={{ color: "#7c625a" }}
                  >
                    {t("Transactions.1")}{" "}
                  </h5>
                  <p className="text-large mb-2 text-white">
                    <span
                      className="notranslate"
                      style={{ color: "#ab9769", fontSize: "20px" }}
                    >
                      {dripTransaction}
                    </span>
                  </p>
                  <p className="text-small ">{t("count.1")}</p>
                </div>
              </div>
            </div>
            <div className="conatiner">
              <div className="row pt-4 mt-4 ">
                <div className="col-12 mb-4 ">
                  <div
                    className="card text-white"
                    style={{
                      backgroundColor: "#30332f",
                      color: "#dacc79",
                      border: "2px solid #30332f",
                    }}
                  >
                    <div className="tabs" id="__BVID__241">
                      <div className="card-header">
                        <ul
                          role="tablist"
                          className="nav nav-tabs card-header-tabs"
                          id="__BVID__241__BV_tab_controls_"
                        >
                          <li role="presentation" className="nav-item">
                            <a
                              role="tab"
                              aria-selected="true"
                              aria-setsize={1}
                              aria-posinset={1}
                              href="#"
                              target="_self"
                              className="nav-link active"
                              id="__BVID__242___BV_tab_button__"
                              aria-controls="__BVID__242"
                            >
                              {t("Activity.1")}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="tab-content"
                        id="__BVID__241__BV_tab_container_"
                      >
                        <div
                          role="tabpanel"
                          aria-hidden="false"
                          className="tab-pane active card-body "
                          id="__BVID__242"
                          aria-labelledby="__BVID__242___BV_tab_button__"
                        >
                          <p className="card-text"></p>
                          <div className="row">
                            <div className="col-12 list">
                              {eventDetail.slice(0, 5).map((item) => {
                                return (
                                  <div
                                    className="card d-flex flex-row mb-3"
                                    style={{
                                      backgroundColor: "#86ad74",
                                      color: "#dacc79",
                                      border: "2px solid #30332f",
                                    }}
                                  >
                                    <div className="d-flex flex-grow-1 min-width-zero">
                                      <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                        <p className="w-20 w-xs-100">
                                          {t("From.1")}&nbsp;
                                          {item.fromAddress.substring(0, 9) +
                                            "..." +
                                            item.fromAddress.substring(
                                              item.fromAddress.length - 9
                                            )}
                                        </p>
                                        <p className="w-20 w-xs-100">
                                          {t("To.1")}
                                          &nbsp;
                                          {item.toAddress.substring(0, 9) +
                                            "..." +
                                            item.toAddress.substring(
                                              item.toAddress.length - 9
                                            )}
                                        </p>
                                        <span className="mb-1 w-15 w-xs-100">
                                          {t("Amount.1")}
                                          &nbsp;
                                          {item.amount}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <p />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="header">
            <div>
              <svg
                data-v-ab5e3c86
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
                className="waves"
              >
                <defs data-v-ab5e3c86>
                  <path
                    data-v-ab5e3c86
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                  />
                </defs>
                <g data-v-ab5e3c86 className="parallax">
                  <use
                    data-v-ab5e3c86
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={0}
                    fill="rgba(255,255,255,0.7"
                  />
                  <use
                    data-v-ab5e3c86
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={3}
                    fill="rgba(255,255,255,0.5)"
                  />
                  <use
                    data-v-ab5e3c86
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={5}
                    fill="rgba(255,255,255,0.3)"
                  />
                  <use
                    data-v-ab5e3c86
                    xlinkHref="#gentle-wave"
                    x={48}
                    y={7}
                    fill="#fff"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
