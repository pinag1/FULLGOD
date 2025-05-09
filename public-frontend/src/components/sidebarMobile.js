import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import React, { useRef } from 'react'
import * as Icon from 'react-bootstrap-icons'
import Badge from 'react-bootstrap/Badge'
import { Link, useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import '../components/sidebarMobile.css'
import "../fonts/font.css"
import LogoBetify from '../images/Betify Logo.png'
import LogoEmpireDrop from '../images/EmpireLogoBlack.png'
import MiniGames from '../pages/MiniGames/MiniGames'
import BHCIcon from '../icons/BHCIcon.js'

function SideBarMenuMobile({onClick}) {
    let location = useLocation(); 
    
    const ref = useRef(null)

    const progressBar = () => {
      ref.current.continuousStart();
      setTimeout(() => {
        ref.current.complete();
      }, 300);
    };


    return(
        <div id="SideBarMobile">
        <LoadingBar color='#73EDE5' ref={ref} />
        <div id="sideBarMobile" className="d-flex flex-column flex-shrink-0 p-2 text-white">
            {/* <img src={LogoEmote} className="img-fluid center mx-auto mt-2" style={{width: "75px"}} alt="Logo GODMOTA Emote"/> */}
            {/* <img src={Logo} className="img-fluid center mx-auto" style={{width: "150px"}}alt="Logo GODMOTA"/> */}
        <ul className="nav nav-pills flex-column mb-auto mt-1">
            <li>
                <a href="#" className={`nav-link ${location.pathname === "/Offers" || location.pathname === "/Betify" ? "Selected nav-link text-white mb-1 fw-semibold d-flex justify-content-between fs-7 align-items-center" : "nav-link text-white mb-1 fw-semibold d-flex justify-content-between fs-7 align-items-center"}`}  data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                Casinos
                <Icon.ChevronDown/>
                </a>
                <div className="collapse show" id="home-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li>
                            <Link as={Link} onClick={onClick} className={`nav-link ${location.pathname === "/Offers" ? "nav-link text-white ms-4 fs-7 mb-1 active BadgeFix" : "nav-link text-white ms-4 fs-7 mb-1 BadgeFix"}`} to="/Offers">
                                <Icon.TagFill size={18} className="me-1"/>
                                Offers 
                                <Badge bg="light" className="ms-2" text="dark">
                                    NEW
                                </Badge>
                            </Link>
                        </li>
                        <li>
                            <Link as={Link} onClick={onClick} className={`nav-link ${location.pathname === "/Betify" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/Betify">
                                <img src={LogoBetify} className="img-fluid center me-1" style={{width: "20px", marginTop: "-3px"}}alt="Betify Logo"/>
                                Betify
                                {/* <Badge bg="danger" className="ms-2" text="dark">
                                    HOT
                                </Badge> */}
                            </Link>
                        </li>
                        <li>
                            <Link as={Link} onClick={onClick} className={`nav-link ${location.pathname === "/Leaderboard" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/Leaderboard">
                                <img src={LogoEmpireDrop} className="img-fluid center me-1" style={{width: "20px", marginTop: "-3px"}}alt="Logo EmpireDrop"/>
                                10000€ Race
                                { <Badge bg="warning" className="ms-2" text="dark">
                                    HOT
                                </Badge> }
                            </Link>
                        </li>
                    </ul>
                </div>
            </li>
            <hr/>
            <li>
                <a href="https://streamelements.com/godmota/store" target='_blank' className="nav-link text-white mb-1 fw-semibold fs-7">
                <Icon.CartFill size={18} className="me-1"/>
                Shop
                </a>
            </li>
            <li>
                <a href="https://discord.gg/uzKpswMgUH" target='_blank' className="nav-link text-white mb-1 fw-semibold fs-7">
                <Icon.PeopleFill size={18} className="me-1"/>
                Community
                </a>
            </li>
            <li>
                <a href="#" className="nav-link text-white mb-1 fw-semibold disabled opacity-50 fs-7">
                <Icon.ViewList size={18} className="me-1"/>
                Slots
                </a>
            </li>
            <li>
                <a href="#" className={`nav-link ${location.pathname === "/Live" ? "Selected nav-link text-white mb-1 fw-semibold d-flex justify-content-between fs-7 align-items-center" : "nav-link text-white mb-1 fw-semibold d-flex justify-content-between fs-7 align-items-center"}`} data-bs-toggle="collapse" data-bs-target="#stream" aria-expanded="false">
                    Stream
                    <Icon.ChevronDown style={{fontsize: "12px"}}/>
                </a>
                <div className="collapse" id="stream">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link as={Link} onClick={onClick} className={`nav-link ${location.pathname === "/Live" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="https://Twitch.tv/GODMOTA">
                        <Icon.Broadcast size={18} className="me-1"/>
                            Live
                        </Link>
                    </li>
                    <li><a href="#" className="nav-link text-white ms-4 fs-7 disabled opacity-50">
                        <Icon.GraphUp size={18} className="me-1"/>
                        Stats
                        </a>
                    </li>
                    <li><a href="#" className="nav-link text-white ms-4 fs-7 disabled opacity-50">
                        <Icon.PlayCircle size={18} className="me-1"/>
                        Clips
                        </a>
                    </li>
                    </ul>
                </div>
            </li>
            <li>
            <a
              href="#"
              className={`nav-link ${
                location.pathname === "/BonusHuntChallenge" ||
                location.pathname === "/BonusHunt" ||
                location.pathname === "/BonusBuyBattle" ||
                location.pathname === "/KingOfTheHill" ||
                location.pathname === "/Tournaments" 
                  ? "Selected nav-link text-white mb-1 fw-semibold d-flex justify-content-between fs-7 align-items-center"
                  : "nav-link text-white mb-1 fw-semibold d-flex justify-content-between fs-7 align-items-center"
              }`}
              data-bs-toggle="collapse"
              data-bs-target="#miniGames"
              aria-expanded="false"
            >
              Mini Games
              <Badge className="ms-2 badgeNewHomePage" text="dark">
                NEW
              </Badge>
              <Icon.ChevronDown />
            </a>
                <div className="collapse" id="miniGames">
                    <li>
                        <Link as={Link} onClick={onClick} className={`nav-link ${ location.pathname === "/BonusHuntChallenge" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/BonusHuntChallenge">
                        <BHCIcon />
                        Bonus Hunt Challenge
                        </Link>
                    </li>
                    <li>
                        <Link as={Link} onClick={onClick} className={`nav-link ${ location.pathname === "/BonusHunt" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/BonusHunt">
                        <Icon.Bullseye size={18} className="me-1" />
                        Bonus Hunt
                        </Link>
                    </li>
                    <li>
                    <Link as={Link} onClick={onClick} className={`nav-link ${ location.pathname === "/BonusBuyBattle" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/BonusBuyBattle">
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
                    <Link as={Link} onClick={onClick} className={`nav-link ${ location.pathname === "/Tournaments" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/Tournaments">
                    <Icon.Trophy size={18} className="me-1" />
                        Tournaments
                        </Link>
                    </li>
                    <li>
                    <Link as={Link} onClick={onClick} className={`nav-link ${ location.pathname === "/KingOfTheHill" ? "nav-link text-white ms-4 fs-7 active BadgeFix" : "nav-link text-white ms-4 fs-7 BadgeFix"}`} to="/KingOfTheHill">
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
                </div>
            </li>
            {/* <hr/> */}
            <li>
                <a href="#" className="nav-link text-white disabled opacity-50 mb-1 fw-semibold fs-7">
                <Icon.PersonFill size={18} className="me-1"/>
                About Me
                </a>
            </li>
            <hr/>
            <li className="d-flex justify-content-around flex-wrap p-3">
                <div className="Socials mb-2">
                    <a href="https://youtube.com/GODMOTA" target="_blank">
                        <Icon.Youtube size="18" className='me-1'/>
                        Youtube
                    </a> 
                </div> 
                <div className="Socials">
                    <a href="https://instagram.com/motahenr" target="_blank">
                        <Icon.Instagram size="18" className='me-1'/>
                        Instagram
                        </a>
                </div> 
                <div className="Socials">
                    <a href="https://twitch.tv/GODMOTA" target="_blank">
                        <Icon.Twitch size="18" className='me-1'/>
                        Twitch
                    </a>
                </div> 
                <div className="Socials">
                    <a href="https://t.me/godmotav2" target="_blank">
                        <Icon.Telegram size="18" className='me-1'/>
                        Telegram
                    </a>
                </div> 
            </li>
            {/* <hr/> */}
            <li className="Copyright">
            Copyright © 2025 GODMOTA
            </li>
            </ul>
        </div>
    </div>
    )
}

export default SideBarMenuMobile;