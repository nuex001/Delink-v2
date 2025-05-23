import React, { useEffect, useState } from "react";
import {
  BasenameTextRecordKeys,
  getBasename,
  getBasenameAddress,
  getBasenameAvatar,
  getBasenameTextRecord,
  getBasenameTextRecords,
} from "../layouts/basenames";
import dp from "../../assets/images/dp.jpg";
import { useParams } from "react-router-dom";
import { getIconAndLabel, resolveIpfsUrl } from "../../utils/utils";
import { Helmet } from 'react-helmet';


function Home() {
  const [bnsDomainState, setBnsDomainState] = useState("");
  const [bnsRecords, setBnsRecords] = useState(true);
  const [ensRecordAvatar, setEnsRecordAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  const { bnsDomain } = useParams();
  //   console.log("bnsDomain" + bnsDomain);

  async function fetchData(bnsDomainLower) {
    setLoading(true);
    if (bnsDomainLower === undefined) throw Error("failed to resolve basename");
    const basename = bnsDomainLower + ".base.eth";
    // console.log(basename);

    const resolvedAddr = await getBasenameAddress(basename);
    // console.log(`Resolved Addr: ${resolvedAddr}`);
    if (resolvedAddr === "0x0000000000000000000000000000000000000000") {
      setEmpty(true);
      setLoading(false);
      return;
    }

    const records = await getBasenameTextRecords(basename);
    // console.log(records);

    setBnsRecords(records);
    // console.log(records);
    setLoading(false);
  }

  // Now map through URLs

  useEffect(() => {
    if (bnsDomain) {
      const bnsDomainLower = bnsDomain.toLowerCase();
      setBnsDomainState(bnsDomainLower);
      fetchData(bnsDomainLower);
    }
  }, [bnsDomain]);
  return (
    <>
      {loading && !empty ? (
        <span className="loader"></span>
      ) : empty ? (
        <div className="empty_Cont">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          </svg>
          <div className="txt">
            To get your basename or set it up, visit base officail website
            <a href="https://www.base.org/names" target="_blank">
              Link
            </a>
          </div>
        </div>
      ) : (
        <>
          <Helmet>
            <meta property="og:title" content={`${bnsDomainState} on Delink`} />
            <meta
              property="og:description"
              content={`Check out @${bnsDomainState}'s profile on Delink`}
            />
            <meta
              property="og:image"
              content={
                bnsRecords?.Avatar ? resolveIpfsUrl(bnsRecords?.Avatar) : dp
              }
            />
            <meta
              property="og:url"
              content={`https://delink.xyz/${bnsDomainState}`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <title>DeLink - {bnsDomainState}</title>
          </Helmet>
          <div className="rows">
            <img
              src={bnsRecords?.Avatar ? resolveIpfsUrl(bnsRecords?.Avatar) : dp}
              alt=""
              className="dp"
            />
            <h2>@{bnsDomainState} </h2>
            <p>{bnsRecords?.Description}</p>
            <ul>
              {bnsRecords?.Github && (
                <a
                  href={`https://github.com/${bnsRecords?.Github}`}
                  target="_blank"
                  className="box"
                >
                  <div className="btn">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0099 0.277344C5.36875 0.277344 0 5.68567 0 12.3765C0 17.7249 3.43994 22.2521 8.21205 23.8545C8.80869 23.9749 9.02724 23.5941 9.02724 23.2738C9.02724 22.9933 9.00757 22.0318 9.00757 21.0301C5.6667 21.7514 4.97099 19.5878 4.97099 19.5878C4.43409 18.1855 3.63858 17.8252 3.63858 17.8252C2.54511 17.084 3.71823 17.084 3.71823 17.084C4.93117 17.1641 5.56763 18.3259 5.56763 18.3259C6.64118 20.1687 8.37111 19.648 9.06706 19.3274C9.16638 18.5462 9.48473 18.0054 9.82275 17.7049C7.15817 17.4244 4.35469 16.3829 4.35469 11.7354C4.35469 10.4133 4.8316 9.33162 5.58729 8.49038C5.46807 8.18997 5.0504 6.94778 5.70677 5.28521C5.70677 5.28521 6.72083 4.96464 9.00732 6.52716C9.98625 6.26231 10.9958 6.12758 12.0099 6.12645C13.024 6.12645 14.0577 6.26682 15.0123 6.52716C17.299 4.96464 18.3131 5.28521 18.3131 5.28521C18.9695 6.94778 18.5515 8.18997 18.4323 8.49038C19.2079 9.33162 19.6652 10.4133 19.6652 11.7354C19.6652 16.3829 16.8617 17.4043 14.1772 17.7049C14.6148 18.0855 14.9924 18.8065 14.9924 19.9484C14.9924 21.5709 14.9727 22.8731 14.9727 23.2736C14.9727 23.5941 15.1915 23.9749 15.7879 23.8547C20.56 22.2519 23.9999 17.7249 23.9999 12.3765C24.0196 5.68567 18.6312 0.277344 12.0099 0.277344Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h2>Github</h2>
                  </div>
                </a>
              )}
              {bnsRecords?.Twitter && (
                <a
                  href={`https://x.com/${bnsRecords?.Twitter}`}
                  target="_blank"
                  className="box"
                >
                  <div className="btn">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.0979642 0.136564C0.151854 0.211665 1.39988 1.9859 2.87137 4.0793C4.34285 6.17269 5.70383 8.10863 5.89579 8.38141C6.08774 8.65419 6.24478 8.88284 6.24478 8.88953C6.24478 8.89623 6.1733 8.98231 6.08595 9.08081C5.99859 9.17931 5.75253 9.45815 5.53917 9.70044C5.3258 9.94273 4.96611 10.3511 4.73985 10.6079C4.51361 10.8648 4.11558 11.3167 3.85534 11.6123C3.59511 11.9079 3.12714 12.4394 2.8154 12.7933C1.85126 13.888 1.71212 14.0461 0.978182 14.8811C0.586289 15.3269 0.210488 15.7531 0.143086 15.8283C0.0756833 15.9035 0.020531 15.9729 0.020531 15.9825C0.020531 15.9938 0.266687 16 0.714057 16H1.40757L2.17001 15.1322C2.58936 14.6548 3.00303 14.185 3.08927 14.0881C3.27576 13.8786 4.69796 12.2623 4.8175 12.1241C4.86327 12.0711 4.92975 11.9958 4.96524 11.9567C5.00075 11.9175 5.28055 11.6 5.58703 11.2511C5.8935 10.9022 6.15268 10.6082 6.16295 10.5977C6.17323 10.5873 6.33548 10.4029 6.5235 10.1881C6.71153 9.97318 6.87118 9.79736 6.87827 9.79736C6.88538 9.79736 7.85124 11.1632 9.02466 12.8326C10.1981 14.502 11.1791 15.8974 11.2047 15.9335L11.2512 15.9992L13.6301 15.9996C15.5864 15.9999 16.0074 15.9959 15.9999 15.9769C15.992 15.9566 14.8522 14.3329 11.9283 10.1762C9.82332 7.18386 9.54342 6.78174 9.55145 6.76134C9.55925 6.7415 9.84596 6.41397 11.7309 4.27167C12.0542 3.90419 12.4999 3.39736 12.7213 3.14537C12.9428 2.89339 13.1663 2.63965 13.2181 2.5815C13.27 2.52335 13.5424 2.2141 13.8236 1.89427C14.1048 1.57445 14.5828 1.03101 14.8859 0.686643C15.1889 0.342273 15.448 0.0469077 15.4616 0.0302557C15.4849 0.0017623 15.4453 0 14.7819 0H14.0775L13.7642 0.356828C13.3472 0.831718 12.5934 1.68809 12.3794 1.93008C12.2848 2.037 12.1668 2.17138 12.1172 2.22869C12.0676 2.28599 11.9697 2.39674 11.8997 2.4748C11.8297 2.55286 11.4768 2.95374 11.1155 3.36564C10.7543 3.77753 10.4538 4.1185 10.4477 4.12335C10.4416 4.12819 10.3642 4.21589 10.2757 4.31825C10.1208 4.49729 9.96312 4.67649 9.24013 5.49542C8.92278 5.85489 8.90651 5.87033 8.87976 5.83729C8.86437 5.81825 7.93435 4.49715 6.81309 2.90152L4.77442 0.000369975L2.38721 0.000176384L0 0L0.0979642 0.136564ZM1.96115 1.08796C1.97908 1.1147 2.4251 1.73921 2.95232 2.47577C3.95222 3.8727 7.88144 9.36539 10.4084 12.8987C11.2159 14.0278 11.8864 14.9615 11.8984 14.9737C11.9157 14.9911 12.1508 14.9949 12.9971 14.9913L14.0738 14.9868L11.2562 11.0485C9.70657 8.88238 7.46293 5.74626 6.27037 4.0793L4.10205 1.04846L3.01532 1.04391L1.92858 1.03937L1.96115 1.08796Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h2>X (Twitter)</h2>
                  </div>
                </a>
              )}
              {bnsRecords?.Farcaster && (
                <a
                  href={`https://warpcast.com/${bnsRecords?.Farcaster}`}
                  target="_blank"
                  className="box"
                >
                  <div className="btn">
                    <svg
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                    >
                      <path
                        d="M4.11859 0.043457H19.5979V21.9565H17.3257V11.9189H17.3034C17.0523 9.14476 14.7103 6.97081 11.8582 6.97081C9.00619 6.97081 6.66419 9.14476 6.41307 11.9189H6.39078V21.9565H4.11859V0.043457Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M0.000244141 3.1537L0.923321 6.26393H1.70439V18.8463C1.31223 18.8463 0.994327 19.1627 0.994327 19.5531V20.4014H0.852315C0.46016 20.4014 0.142256 20.7179 0.142256 21.1083V21.9565H8.09492V21.1083C8.09492 20.7179 7.77702 20.4014 7.38486 20.4014H7.24285V19.5531C7.24285 19.1627 6.92494 18.8463 6.53279 18.8463H5.68072V3.1537H0.000244141Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M17.4677 18.8463C17.0755 18.8463 16.7576 19.1627 16.7576 19.5531V20.4014H16.6156C16.2235 20.4014 15.9056 20.7179 15.9056 21.1083V21.9565H23.8582V21.1083C23.8582 20.7179 23.5403 20.4014 23.1482 20.4014H23.0062V19.5531C23.0062 19.1627 22.6883 18.8463 22.2961 18.8463V6.26393H23.0772L24.0002 3.1537H18.3198V18.8463H17.4677Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h2>Farcaster</h2>
                  </div>
                </a>
              )}
              {bnsRecords?.Url && (
                <a href={`${bnsRecords?.Url}`} target="_blank" className="box">
                  <div className="btn">
                    {getIconAndLabel(bnsRecords?.Url).icon}
                    <h2> {getIconAndLabel(bnsRecords?.Url).label}</h2>
                  </div>
                </a>
              )}
              {bnsRecords?.Url2 && (
                <a href={`${bnsRecords?.Url2}`} target="_blank" className="box">
                  <div className="btn">
                    {getIconAndLabel(bnsRecords?.Url2).icon}
                    <h2> {getIconAndLabel(bnsRecords?.Url2).label}</h2>
                  </div>
                </a>
              )}
              {bnsRecords?.Url3 && (
                <a href={`${bnsRecords?.Url3}`} target="_blank" className="box">
                  <div className="btn">
                    {getIconAndLabel(bnsRecords?.Url3).icon}
                    <h2> {getIconAndLabel(bnsRecords?.Url3).label}</h2>
                  </div>
                </a>
              )}

              {/* <a href="#" className="box">
              <div className="btn">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4424 23.8252L11.5273 23.8726L11.5612 23.8916C11.6958 23.9627 11.8464 24 11.9994 24C12.1524 24 12.303 23.9627 12.4376 23.8916L12.4715 23.8738L12.5576 23.8252C13.0317 23.5503 13.4943 23.2569 13.9442 22.9457C15.1092 22.1415 16.1976 21.2362 17.1964 20.2409C19.5527 17.8822 22 14.3383 22 9.77851C22 7.18509 20.9464 4.69789 19.0711 2.86406C17.1957 1.03023 14.6522 0 12 0C9.34784 0 6.8043 1.03023 4.92893 2.86406C3.05357 4.69789 2 7.18509 2 9.77851C2 14.3371 4.44848 17.8822 6.80364 20.2409C7.80199 21.2362 8.89003 22.1414 10.0545 22.9457C10.5049 23.2569 10.9679 23.5503 11.4424 23.8252ZM12 13.3343C12.9644 13.3343 13.8893 12.9597 14.5713 12.2929C15.2532 11.626 15.6364 10.7216 15.6364 9.77851C15.6364 8.83545 15.2532 7.93101 14.5713 7.26416C13.8893 6.59732 12.9644 6.22269 12 6.22269C11.0356 6.22269 10.1107 6.59732 9.4287 7.26416C8.74675 7.93101 8.36364 8.83545 8.36364 9.77851C8.36364 10.7216 8.74675 11.626 9.4287 12.2929C10.1107 12.9597 11.0356 13.3343 12 13.3343Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <h2>Global</h2>
              </div>
            </a> */}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
