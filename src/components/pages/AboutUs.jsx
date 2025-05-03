import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/about.css";
import icon1 from "../../assets/images/icon1.webp";
import icon2 from "../../assets/images/icon2.webp";
import icon3 from "../../assets/images/icon3.webp";

function AboutUs() {
  const [delinkUrl, setDelinkUrl] = useState(null);
  const timeoutRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayRefChild = useRef(null);

  const changeDelinkUrl = (e) => {
    e.preventDefault();
    const basename = e.target.delinkUrlInpt.value.trim();
    if (!basename) return;

    const subdomain = basename.split(".")[0];
    setDelinkUrl(`https://delink.click/${subdomain}`);
    e.target.delinkUrlInpt.value = "";

    // Clear existing timeout if any
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set new timeout to clear delinkUrl
    timeoutRef.current = setTimeout(() => {
      setDelinkUrl(null);
    }, 5000);
  };

  const toggleActive = () => {
    overlayRef.current.classList.toggle("active");
  };

  // Handle click outside to close overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        overlayRefChild.current &&
        !overlayRefChild.current.contains(event.target)
      ) {
        setDelinkUrl(null);
        overlayRef.current.classList.remove("active");
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="about">
      <h1>
        Get So much more on <br /> Base with your profile
      </h1>
      <div className="boxRows">
        <a
          href="https://www.base.org/names"
          target="_blank"
          rel="noopener noreferrer"
          className="box"
        >
          <div className="imgCont">
            <img src={icon1} alt="" />
          </div>
          <div className="txt_cont">
            <h2>Build your onchain identity</h2>
            <p>
              Use your ENS or BSASENAME text records to create a decentralized
              link-in-bio page. Just paste your handle and go.
            </p>
          </div>
        </a>
        <a className="box">
          <div className="imgCont">
            <img src={icon3} alt="" />
          </div>
          <div className="txt_cont">
            <h2>Set up your Web3 socials</h2>
            <p>
              Link your Twitter, Farcaster, and more right from your Basename
              profile on the Basename official site.
            </p>
          </div>
        </a>
        <a className="box" onClick={toggleActive}>
          <div className="imgCont">
            <img src={icon2} alt="" />
          </div>
          <div className="txt_cont">
            <h2>Share your personalized link</h2>
            <p>
              Showcase your profile and social links at{" "}
              <code>delink.click/yourname</code> no ".base.eth" required.
            </p>
          </div>
        </a>
      </div>
      <div className="overlay" ref={overlayRef}>
        <form action="" onSubmit={changeDelinkUrl} ref={overlayRefChild}>
          <h2>Enter your basename</h2>
          <input
            type="text"
            name="delinkUrlInpt"
            placeholder="Enter your basename(delink.base.eth)"
          />
          {delinkUrl && (
            <p>
              This is Your delink{" "}
              <a href={delinkUrl} target="_blank">
                {" "}
                {delinkUrl}
              </a>
            </p>
          )}

          <button className="btn">Generate</button>
        </form>
      </div>
    </div>
  );
}

export default AboutUs;
