import React, { useState, useEffect } from "react";
import {
  BarChartIcon,
  HomeIcon,
  CardStackPlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeClosedIcon,
  HeartIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import * as HoverCard from "@radix-ui/react-hover-card";

import { MdOutlineLocalFireDepartment } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Header({ currentMode, setCurrentMode }) {
  const [openHamburger, setOpenHamburger] = useState(false);
  const navigate = useNavigate();
  const searchSubmit = (e) => {
    e.preventDefault();
    const searchText = document.getElementById("searchText").value;
    if (searchText.match(/(^r\/)/g)) {
      navigate(`${searchText}`);
      return;
    }
    if (searchText) {
      // window.location.href = `/search?q=${searchText}`;
      navigate(`/search?q=${searchText}`);
    }
  };

  const closeHamburger = (e) => {
    // if (!openHamburger) return;
    if (!e.target.classList.contains("hamburger-id")) {
      // console.log("closing");
      setOpenHamburger(false);
    }
  };

  useEffect(() => {
    if (openHamburger) {
      setTimeout(() => {
        window.addEventListener("click", closeHamburger);
      }, 1);
    }

    return () => {
      window.removeEventListener("click", closeHamburger);
    };
  }, [openHamburger]);

  return (
    <>
      <header className="quicksand-reg">
        <div className="header-container ">
          {openHamburger && (
            <div className="hamburger hamburger-id">
              <div className="hamburger-content hamburger-id">
                <ul className="hamburger-nav hamburger-id">
                  <li onClick={() => navigate("/")}>
                    <HomeIcon width={"1.25rem"} height={"1.25rem"} />
                    <p>Home</p>
                  </li>
                  <li
                    className={
                      currentMode === "rising" ? "header-selected" : null
                    }
                    onClick={() => setCurrentMode("rising")}
                  >
                    <BarChartIcon width={"1.25rem"} height={"1.25rem"} />
                    <p>Rising</p>
                  </li>
                  <li
                    className={currentMode === "new" ? "header-selected" : null}
                    onClick={() => setCurrentMode("new")}
                  >
                    <CardStackPlusIcon width={"1.25rem"} height={"1.25rem"} />
                    <p>New</p>
                  </li>
                  <li
                    className={currentMode === "hot" ? "header-selected" : null}
                    onClick={() => setCurrentMode("hot")}
                  >
                    <MdOutlineLocalFireDepartment size={"1.25rem"} />
                    <p>Hot</p>
                  </li>
                  <li
                    className={currentMode === "top" ? "header-selected" : null}
                    onClick={() => setCurrentMode("top")}
                  >
                    <HeartIcon width={"1.25rem"} height={"1.25rem"} />
                    <p>Top</p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center" }}>
            <HamburgerMenuIcon
              id="hamburger-icon"
              onClick={() => setOpenHamburger(!openHamburger)}
              width={"1.75rem"}
              height={"1.75rem"}
              className="hamburger-menu"
            />
            <img
              onClick={() => navigate("/")}
              className="logo pointer"
              id="logo"
              src="/assets/reddit-seeklogo.svg"
              alt="logo"
            />
          </div>
          <div className="search-container">
            <ul className="header-nav">
              <li onClick={() => navigate("/")}>
                <HomeIcon width={"1.25rem"} height={"1.25rem"} />
                <p>Home</p>
              </li>
              <li className="header-nav-div">
                {/* <p style={{ color: "var(--secondary-text)" }}>|</p> */}
              </li>
              <li
                className={currentMode === "rising" ? "header-selected" : null}
                onClick={() => setCurrentMode("rising")}
              >
                <BarChartIcon width={"1.25rem"} height={"1.25rem"} />
                <p>Rising</p>
              </li>
              <li
                className={currentMode === "new" ? "header-selected" : null}
                onClick={() => setCurrentMode("new")}
              >
                <CardStackPlusIcon width={"1.25rem"} height={"1.25rem"} />
                <p>New</p>
              </li>
              <li
                className={currentMode === "hot" ? "header-selected" : null}
                onClick={() => setCurrentMode("hot")}
              >
                <MdOutlineLocalFireDepartment size={"1.25rem"} />
                <p>Hot</p>
              </li>
              <li
                className={currentMode === "top" ? "header-selected" : null}
                onClick={() => setCurrentMode("top")}
              >
                <HeartIcon width={"1.25rem"} height={"1.25rem"} />
                <p>Top</p>
              </li>
            </ul>
            <form onSubmit={searchSubmit} id="search">
              <div
                style={{
                  position: "relative",
                  display: "flex",
                }}
              >
                <label className="search-label" htmlFor="searchText">
                  <MagnifyingGlassIcon
                    width={"1.5625rem"}
                    height={"1.5625rem"}
                    style={{
                      position: "absolute",
                      left: "0.81rem",
                      top: "0.562rem",
                    }}
                  />
                </label>
                <input
                  type="text"
                  id="searchText"
                  placeholder="Find community or post"
                />
              </div>

              <input className="search-submit" type="submit" value="Search" />
            </form>
          </div>
          <div className="user-container">
            {/* <div className="mobile-search">
              <MagnifyingGlassIcon
                style={{ marginRight: "0.5rem" }}
                width={"1.25rem"}
                height={"1.25rem"}
              />
            </div> */}
            <a className="email-anchor" href="mailto: adrianj.web@gmail.com">
              <EnvelopeClosedIcon
                className="email-icon"
                width={"1.25rem"}
                height={"1.25rem"}
              />
            </a>
            <HoverCard.Root openDelay={100} closeDelay={100}>
              <HoverCard.Trigger asChild>
                <a
                  href="https://github.com/PuppetAJ"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover-content-link"
                >
                  <div className="pfp-wrapper">
                    <img id="pfp" src="/assets/pfp.png" alt="profile" />

                    <ChevronDownIcon width={"1.25rem"} height={"1.25rem"} />
                  </div>
                </a>
              </HoverCard.Trigger>
              <HoverCard.Portal className="HoverCardPortal">
                <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                  <div className="hover-content-wrapper">
                    <a
                      className="hover-content-link"
                      href="https://github.com/PuppetAJ"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <div style={{ display: "flex" }}>
                        <GitHubLogoIcon width={"2.5rem"} height={"2.5rem"} />
                        <div className="pfp-head-right">
                          <p>ajimp</p>
                          <p>@PuppetAJ</p>
                        </div>
                      </div>

                      <p>Click on the profile picture to visit my github!</p>
                    </a>
                  </div>
                  <HoverCard.Arrow className="HoverCardArrow" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
