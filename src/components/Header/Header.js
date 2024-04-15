import React from "react";
import {
  BarChartIcon,
  HomeIcon,
  CardStackPlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeClosedIcon,
  HeartIcon,
} from "@radix-ui/react-icons";

import { MdOutlineLocalFireDepartment } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Header({ currentMode, setCurrentMode }) {
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
  return (
    <header className="quicksand-reg">
      <div className="header-container ">
        <img
          className="logo"
          id="logo"
          src="/assets/reddit-seeklogo.svg"
          alt="logo"
        />
        <div className="search-container">
          <ul className="header-nav">
            <li onClick={() => navigate("/")}>
              <HomeIcon width={"20px"} height={"20px"} />
              <p>Home</p>
            </li>
            <li className="header-nav-div">
              {/* <p style={{ color: "var(--secondary-text)" }}>|</p> */}
            </li>
            <li
              className={currentMode === "rising" ? "header-selected" : null}
              onClick={() => setCurrentMode("rising")}
            >
              <BarChartIcon width={"20px"} height={"20px"} />
              <p>Rising</p>
            </li>
            <li
              className={currentMode === "new" ? "header-selected" : null}
              onClick={() => setCurrentMode("new")}
            >
              <CardStackPlusIcon width={"20px"} height={"20px"} />
              <p>New</p>
            </li>
            <li
              className={currentMode === "hot" ? "header-selected" : null}
              onClick={() => setCurrentMode("hot")}
            >
              <MdOutlineLocalFireDepartment size={"20px"} />
              <p>Hot</p>
            </li>
            <li
              className={currentMode === "top" ? "header-selected" : null}
              onClick={() => setCurrentMode("top")}
            >
              <HeartIcon width={"20px"} height={"20px"} />
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
                  width={"25px"}
                  height={"25px"}
                  style={{ position: "absolute", left: "13px", top: "9px" }}
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
          <EnvelopeClosedIcon width={"20px"} height={"20px"} />
          <div className="pfp-wrapper">
            <img id="pfp" src="/assets/pfp.png" alt="profile" />
            <ChevronDownIcon width={"20px"} height={"20px"} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
