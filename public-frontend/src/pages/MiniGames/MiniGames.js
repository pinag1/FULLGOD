// src/components/MiniGames.js

import React, { useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MiniGames = () => {

  let location = useLocation();
  const ref = useRef(null);

  const progressBar = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
    }, 300);
  };


  return (
    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
      <li>
        {/* <Link to="/bonus-hunt" className="nav-link text-white ms-4 fs-7"> */}
        <Link as={Link} onClick={progressBar} className={`nav-link ${ location.pathname === "/Betify" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/bonus-hunt">
          <Icon.Bullseye size={18} className="me-1" />
          Bonus Hunt
        </Link>
      </li>
      <li>
        <Link to="/bonus-buy-battle" className="nav-link text-white ms-4 fs-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-swords"
            style={{ marginRight: ".25rem" }}
            width="18"
            height="18"
            strokeWidth="1.25"
            viewBox="0 0 22 22"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z"></path>
            <path d="M5 13l6 6"></path>
            <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365"></path>
            <path d="M10 5.5l-2 -2.5h-5v5l3 2.5"></path>
          </svg>
          Bonus Buy Battle
        </Link>
      </li>
      <li>
      <Link to="/tournaments" className="nav-link text-white ms-4 fs-7">
      <Icon.Trophy size={18} className="me-1" />
          Tournaments
        </Link>
      </li>
      <li>
        <Link to="/king-of-the-hill" className="nav-link text-white ms-4 fs-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-crown"
            style={{ marginRight: ".25rem" }}
            viewBox="0 0 22 22"
            strokeWidth="1.25"
            height="18"
            fill="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"></path>
          </svg>
          King of the Hill
        </Link>
      </li>
      <li>
        <a
          href="#"
          className="nav-link text-white ms-4 fs-7 disabled opacity-50"
        >
          <Icon.ChevronDoubleUp size={18} className="me-1" />
          Climb the Quest
        </a>
      </li>
    </ul>
  );
};

export default MiniGames;
