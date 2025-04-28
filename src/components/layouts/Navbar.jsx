import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useRef, useState } from "react";
import { FaLink } from "react-icons/fa6";
function Navbar() {
  const [copied, setcopied] = useState(false);
  const timeoutRef = useRef(null); // store the timeout

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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav>
      <a href="#" className="logo">
        DeLink
      </a>
      <button onClick={copyLink}>
       <FaLink className="icon"/>
        {copied ? " Copied" : "My Link"}
      </button>
    </nav>
  );
}

export default Navbar;
