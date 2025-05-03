import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useRef, useState } from "react";
import { FaLink } from "react-icons/fa6";
import { useLocation } from "react-router-dom"; // STEP 1

function Navbar() {
  const [copied, setcopied] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const timeoutRef = useRef(null); // store the timeout
  const pathname = useLocation().pathname; // STEP 2
  const copyLink = (e) => {
    e.preventDefault(); // optional, if it's inside a button or link
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setcopied(true);
        timeoutRef.current = setTimeout(() => {
          setcopied(false);
        }, 1000);
        console.log("Link copied to clipboard!");
        // You can also trigger a toast or success message here
      })
      .catch((err) => {
        setcopied(false);
        console.error("Failed to copy:", err);
      });
  };

  useEffect(() => {
    setIsHomePage(pathname === "/"); // STEP 3
  }, [pathname]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav>
      <a href="/" className="logo">
        DeLink
      </a>
      {!isHomePage ? (
        <button onClick={copyLink} className="btn">
          <FaLink className="icon" />
          {copied ? " Copied" : "My Link"}
        </button>
      ) : (
        <a href="/" target="_blank" className="btn">
          Your Guild
        </a>
      )}
    </nav>
  );
}

export default Navbar;
