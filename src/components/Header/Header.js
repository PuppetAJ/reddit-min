import React from "react";
import {
  BarChartIcon,
  HomeIcon,
  CardStackPlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

function Header() {
  return (
    <header className="quicksand-reg">
      <div className="header-container ">
        <img
          className="logo"
          id="logo"
          src="./reddit-seeklogo.svg"
          alt="logo"
        />
        <div className="search-container">
          <ul className="header-nav">
            <li>
              <HomeIcon width={"20px"} height={"20px"} />
              <p>Home</p>
            </li>
            <li>
              <BarChartIcon width={"20px"} height={"20px"} />
              <p>Popular</p>
            </li>
            <li>
              <CardStackPlusIcon width={"20px"} height={"20px"} />
              <p>All</p>
            </li>
          </ul>
          <form id="search">
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
                  style={{ position: "absolute", left: "13px", top: "11px" }}
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
            <img id="pfp" src="./pfp.png" alt="profile" />
            <ChevronDownIcon width={"20px"} height={"20px"} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;