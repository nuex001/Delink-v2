import React, { useEffect, useState } from "react";
import StarsBox from "./components/pages/StarsBox";
import Navbar from "./components/layouts/Navbar";
import { GrFormNextLink } from "react-icons/gr";
import bg from "./assets/images/bg.png";
import bg1 from "./assets/images/bg1.png";
import congrats from "./assets/images/congrats.png";
import Select from "react-select";
import { useWalletClient } from "wagmi";
import { useEthersSigner } from "./utils/ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { FaLink } from "react-icons/fa6";
import axios from "axios";
import { jwtVerify, SignJWT } from "jose";

function App() {
  const signer = useEthersSigner();
  const { data: walletClient } = useWalletClient();
  const [dgnames, setDgnames] = useState([]);
  const [stage, setStage] = useState(null);
  const [errorcont, setErrorcont] = useState(null);
  const [successCont, setSuccessCont] = useState(null);
  const [ticker, setTicker] = useState(null);
  const [redirect_link, setRedirect_link] = useState(null);
  const [successStage, setSuccessStage] = useState(null);
  const [txLink, setTxLink] = useState(null);
  const stages = ["Register", "Update", "Transfer"];
  const [formData, setFormData] = useState({
    domainname: "",
    ticker: "",
    redirect_link: "",
    verifyens: "",
  });

  const style = {
    control: (base, state) => ({
      ...base,
      boxShadow: "2.6px 5.1px 5.1px rgba(0, 0, 0, 0.4)",
      background: "var(--header2)",
      border: "1px solid #B3B3B3",
      borderRadius: "5px",
      margin: " 1em 0em",
      "&:hover": {
        border: state.isFocused ? "1px solid #B3B3B3" : "1px solid #B3B3B3",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--header2)",
    }),
    option: (styles) => ({
      ...styles,
      background: "var(--header2)",
      color: "var(--text)",
    }),
    singleValue: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: isSelected ? "var(--text)" : "var(--text)",
    }),
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetFormData = () => {
    setFormData({
      domainname: "",
      redirect_link: "",
      verifyens: "",
    });
  };

  // const contracts = {
  //   // 97: { address: "BNB_CONTRACT_ADDRESS", abi: bnbAbi },
  //   84532: {
  //     address: contractBaseAddress,
  //     abi: contractBaseAbi,
  //     txLink: "https://sepolia.basescan.org/tx/",
  //     regex: /^0x[a-fA-F0-9]{40}$/,
  //   },
  // };

  const setTransfer = (e) => {
    e.preventDefault();
    console.log("Dffdf");
    setStage(3);
  };
  const updateDegen = (e) => {
    e.preventDefault();
    setStage(2);
  };
  const updateRedirect_link = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() !== "") {
      setFormData({ ...formData, ["redirect_link"]: val.trim() });
    }
  };
  const fetchDomains = async (e) => {
    try {
      if (walletClient) {
        // console.log(walletClient.chain.id);
        const userAddress = walletClient.account.address;
        const chainId = walletClient.chain.id;
        // console.log(chainId);
        if (chainId === 8453) {
          const response = await axios.get(
            `https://delink-production.up.railway.app/api/user/getUsernames?address=${userAddress}`
          );
          console.log(response.data.data);
          //JUST STRUCTURE FOR NOW
          // const response = {
          //   data: [
          //     {
          //       domain: "delink.base.eth",
          //       expires_at: "2025-12-12T12:21:59Z",
          //       is_primary: true,
          //       manager_address: "0xb9f75cB1B7eC69529190d973eB12D796236a0E90",
          //       network_id: "base-mainnet",
          //       owner_address: "0xb9f75cB1B7eC69529190d973eB12D796236a0E90",
          //       primary_address: "0xb9f75cB1B7eC69529190d973eB12D796236a0E90",
          //       token_id:
          //         "1380345562507568046886482777058730848922354961141990781398659957867626125991",
          //     },
          //     {
          //       domain: "nuelyoungtech.base.eth",
          //       expires_at: "2025-09-11T17:30:25Z",
          //       is_primary: false,
          //       manager_address: "0xb9f75cB1B7eC69529190d973eB12D796236a0E90",
          //       network_id: "base-mainnet",
          //       owner_address: "0xb9f75cB1B7eC69529190d973eB12D796236a0E90",
          //       primary_address: "0x0000000000000000000000000000000000000000",
          //       token_id:
          //         "39268747180991617798904539465512931896034045435948753918885435288544283446823",
          //     },
          //   ],
          //   has_more: false,
          //   next_page: "",
          //   total_count: 2,
          // };
          // Extract domains
          const domains = response.data.data.map((item) => item.domain);

          // console.log(domains);
          if (domains.length > 0) {
            let items = [];
            domains.forEach((item) => {
              items.push({
                label: item,
                value: item,
              });
            });
            setDgnames(items);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleDomainSelectChange = (e) => {
    setFormData({ ...formData, ["domainname"]: e.value });
  };
  // BUY Domain
  const setUpdoamin = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      const payload = {
        ensdomain: formData.domainname,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
      };
      // Example: Encode a JWT
      const secret = new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY); // Convert the secret to a Uint8Array

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      // console.log("JWT Token:", token);
      const response = await axios.post(
        `https://delink-production.up.railway.app/api/user/`,
        { redirect_link: formData.redirect_link },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
      if (response.data.redirect_link) {
        console.log(response.data.redirect_link);
        setSuccessStage(0);
        setTxLink(response.data.redirect_link);
      }
    } catch (error) {
      console.log(error);
      setErrorcont("SERVER ERROR");
    }
  };
  // BUY Domain
  const getLinkFunc = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData.domainname);
      const response = await axios.get(
        `https://delink-production.up.railway.app/api/user/${formData.domainname}`
      );
      // console.log(response.data);
      if (response.data.ensdomain) {
        setTxLink(`http://${response.data.ensdomain}.delink.click`);
        setSuccessStage(1);
      } else {
        setErrorcont("Select Domain");
      }
    } catch (error) {
      console.log(error);
      setErrorcont("Not yet Linked");
    }
  };
  // GET Domain DETAILS
  const getDomainDetails = async (e) => {
    e.preventDefault();
    try {
      const val = formData.verifyens;
      const response = await axios.get(
        `https://delink-production.up.railway.app/api/user/${val}`
      );
      // console.log(response.data);
      if (response.data.ensdomain) {
        setSuccessCont(
          `${val} is verified and this is the link http://${response.data.ensdomain}.delink.click`
        );
      } else {
        setErrorcont("Select Domain");
      }
    } catch (error) {
      console.log(error);
      setErrorcont("Domain is not registered");
    }
  };

  // CHECK FOR ONCLICK
  const closePopUp = async (e) => {
    setSuccessStage(null);
    resetFormData();
  };

  // copyTxLink
  const copyTxLink = async (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(txLink)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy Link:", error);
      });
  };

  useEffect(() => {
    fetchDomains();
    if (errorcont) {
      setTimeout(() => {
        setErrorcont(null);
        resetFormData();
      }, 5000);
    }
    if (successCont) {
      setTimeout(() => {
        setSuccessCont(null);
      }, 5000);
    }
  }, [errorcont, successCont]);

  useEffect(() => {
    fetchDomains();
    if (walletClient) {
      setStage(0);
    } else {
      setStage(null);
    }
  }, [walletClient]);

  return (
    <div className="container">
      <Navbar />
      <StarsBox />
      <header>
        <div className="txt">
          <h1> Connect Your Web3 Identity.</h1>
          <h2>
            DeLink: Bridging Domains and Websites in the Decentralized World
          </h2>
          <div className="formCont">
            {stage !== null ? (
              <div className="box">
                <ul>
                  <li
                    className={stage === 0 || stage === 2 ? "active" : ""}
                    onClick={() => setStage(0)}
                  >
                    Update
                  </li>
                  <li
                    className={stage === 1 ? "active" : ""}
                    onClick={() => setStage(1)}
                  >
                    Link
                  </li>
                  <li
                    className={stage === 3 ? "active" : ""}
                    onClick={() => setStage(3)}
                  >
                    Check
                  </li>
                </ul>
                {stage === 0 ? (
                  <div className="rows">
                    <Select
                      options={dgnames}
                      name="dgnames"
                      defaultValue={{ label: "Select Doamin", value: "" }}
                      styles={style}
                      className="select"
                      onChange={handleDomainSelectChange}
                    />
                    <button className="next" onClick={updateDegen}>
                      Next
                      <GrFormNextLink className="icon" />
                    </button>
                  </div>
                ) : stage === 1 ? (
                  <>
                    <div className="rows">
                      <Select
                        options={dgnames}
                        name="dgnames"
                        defaultValue={{ label: "Search Domain", value: "" }}
                        styles={style}
                        className="select"
                        onChange={handleDomainSelectChange}
                      />
                      <button className="next" onClick={getLinkFunc}>
                        Get
                        <FaLink className="icon" />
                      </button>
                    </div>
                    <p>{errorcont}</p>
                  </>
                ) : stage === 2 ? (
                  <div className="rows">
                    <div className="inptBox">
                      <input
                        type="url"
                        placeholder="Add Portfolio Link"
                        onKeyUp={updateRedirect_link}
                        onChange={updateRedirect_link}
                      />
                    </div>
                    <button className="next" onClick={setUpdoamin}>
                      Update
                      <GrFormNextLink className="icon" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="rows">
                      <div className="inptBox">
                        <input
                          type="text"
                          name="verifyens"
                          value={formData.verifyens}
                          onChange={handleInputChange}
                          placeholder="Check Domain Link"
                        />
                      </div>
                      <button className="next" onClick={getDomainDetails}>
                        Check
                        <GrFormNextLink className="icon" />
                      </button>
                    </div>
                    <p>{errorcont}</p>
                    <p className="success">{successCont}</p>
                  </>
                )}
              </div>
            ) : (
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== "loading";
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === "authenticated");
                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button onClick={openConnectModal} className="btn">
                              Get started
                              <GrFormNextLink className="icon" />
                            </button>
                          );
                        }
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
              // <button className="btn">
              //   Get started
              //   <GrFormNextLink className="icon" />
              // </button>
            )}
          </div>
        </div>
        <div className="solarCont">
          <img src={bg} alt="bg1" />
          <img src={bg1} alt="bg1" />
        </div>
        {successStage === 0 ? (
          <div className="overlay" onClick={closePopUp}>
            <div className="overBox" onClick={(e) => e.stopPropagation()}>
              <img src={congrats} alt="congrats" />
              <h1>Congratulations</h1>
              <div className="details">
                <p>
                  You have linked<span>{formData.domainname}</span>
                  <a target="_blank" href={txLink}>
                    <FaLink onClick={copyTxLink} />
                  </a>
                </p>
              </div>
              <button onClick={closePopUp}>Done</button>
            </div>
          </div>
        ) : (
          successStage === 1 && (
            <div className="overlay" onClick={closePopUp}>
              <div className="overBox" onClick={(e) => e.stopPropagation()}>
                <img src={congrats} alt="congrats" />
                <h1>{formData.domainname}</h1>
                <div className="details">
                  <p>
                    <a
                      target="_blank"
                      href={txLink}
                      className="subLink"
                      onClick={copyTxLink}
                    >
                      {txLink}
                      <FaLink className="copy" />
                    </a>
                  </p>
                </div>
                <button onClick={closePopUp}>Done</button>
              </div>
            </div>
          )
        )}
      </header>
    </div>
  );
}

export default App;

/**
 * https://seitrace.com/token/sei1c56q465aeenfxykhaj8vt7vhhqtmhyn0ntvercdsge288xsdcjlq9xh8wx?chain=pacific-1
 */
