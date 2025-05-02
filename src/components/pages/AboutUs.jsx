import React from "react";
import "../../assets/css/about.css";
import icon1 from "../../assets/images/icon1.webp";
import icon2 from "../../assets/images/icon2.webp";
import icon3 from "../../assets/images/icon3.webp";

function AboutUs() {
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
              Use your Basename as your onchain identity in the Base ecosystem.
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
        <a className="box">
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
    </div>
  );
}

export default AboutUs;
