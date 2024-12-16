import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { RiWallet3Fill } from "react-icons/ri";
function Navbar() {
  return (
    <nav>
      <a href="#" className="logo">
        DeLink
      </a>
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
            (!authenticationStatus || authenticationStatus === "authenticated");
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
                      <RiWallet3Fill className="icon" />
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="btn"
                    >
                      <RiWallet3Fill className="icon" />
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: "1em" }}>
                    {/* <button
                      onClick={openChainModal}
                      type="button"
                      className="btn"
                    >
                      <RiWallet3Fill className="icon" />
                      Switch network
                    </button> */}
                    <button onClick={openAccountModal} className="btn">
                      <RiWallet3Fill />
                      Disconnect
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </nav>
  );
}

export default Navbar;
