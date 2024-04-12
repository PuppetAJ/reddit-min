import React from "react";

function Footer() {
  return (
    <footer className="quicksand-reg">
      <div className="footer-ad">
        <svg className="ad-pattern" width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              id="pattern-circle"
              cx="5"
              cy="5"
              r="2"
              fill="currentColor"
            ></circle>
          </pattern>

          <rect
            id="rect"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          ></rect>
        </svg>
        <div className="footer-ad-content">
          <img
            className="logo"
            src="/assets/reddit-seeklogo.svg"
            alt="reddit logo"
          ></img>
          <h3>Advertise on Reddit</h3>
          <button className="ad-button">Get Started</button>
        </div>
      </div>
      <div className="footer-container-wrapper">
        <div className="footer-container">
          <hr className="sidebar-bottom-div" />
          <div className="footer-lists">
            <ul className="footer-list">
              <li>
                <p>Products</p>
              </li>
              <li>
                <p>Advertise</p>
              </li>

              <li>
                <p>Careers</p>
              </li>
            </ul>
            <ul className="footer-list">
              <li>
                <p>About</p>
              </li>

              <li>
                <p>Help</p>
              </li>

              <li>
                <p>Blog</p>
              </li>
            </ul>
            <ul className="footer-list">
              <li>
                <p>Reddit App</p>
              </li>
              <li>
                <p>Reddit Gold</p>
              </li>
              <li>
                <p>Reddit Hits</p>
              </li>
            </ul>
          </div>

          <hr className="sidebar-bottom-div" />
          <div className="footer-content">
            <div>
              <p>© 2021 Reddit</p>
            </div>
            <div className="footer-legal">
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
