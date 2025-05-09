import React, { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import * as Icon from 'react-bootstrap-icons'
import '../components/sidebar.css'
import "../fonts/font.css";
import '../components/topbar.css'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-modal';
import Logo from '../images/Logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import En from '../images/EN.jpg'
import Pt from '../images/PT.webp'
import Form from 'react-bootstrap/Form';
import LogoEmote from '../images/Logo Emote.png'
import { Tooltip } from 'react-tooltip'
import Items from "./items";
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // ref.current.parent.value = ""
        ref.current.parentElement.children[1].value = ""
        ref.current.className = "SearchResults"
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
    return items.filter((song) => song.name.includes(query));
};

function TopBarMenu({isLive}) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const location = useLocation();

    useEffect(() => {
      wrapperRef.current.parentElement.children[1].value = ""
      wrapperRef.current.className = "SearchResults"
    }, [location]);
  

      const styleLogin = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const [query, setQuery] = useState("");

    const { tracks } = Items;
    const { items } = tracks;
  
    const filteredItems = getFilteredItems(query, items);

    const handleChange = (e) => {
      e.target.value = e.target.value.toLowerCase()

      if (e.target.value.length > 2) {
        setFormState({
          ...formState,
          [e.target.name]: e.target.value,
        });
  
        e.preventDefault(); // prevent the default action
        setQuery(e.target.value); // set name to e.target.value (event)
      } else {
        setFormState({
          ...formState,
          [e.target.name]: "",
        });
        e.preventDefault(); // prevent the default action
        setQuery(e.target.value); // set name to e.target.value (event)
      }

    };

    const [formState, setFormState] = useState({
      text: "",
     });


    
    return(
            <div id="TopBar">
                <div id="Logo" className='d-flex align-items-center'>
                  {/* <img src={LogoEmote} className="img-fluid center mx-auto mt-2" style={{width: "75px"}} alt="Logo GODMOTA Emote"/> */}
                  <Link to="/Offers">
                  <img src={Logo} className="img-fluid center mx-auto LogoGODMOTA" style={{width: "100px", paddingLeft: "7px"}}alt="Logo GODMOTA"/>
                  </Link>
                  {isLive ? <div><Link to="/Live" className="LiveOn Desktop">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.015619 12.00781">
                    <path fill="#f04545" d="M 0,6.0039 C 0,5.60937 0.0391,5.21875 0.11328,4.83203 0.19138,4.44531 0.30469,4.07031 0.45703,3.70312 0.60547,3.33984 0.79297,2.99609 1.01172,2.66797 1.23047,2.33984 1.48047,2.03515 1.75781,1.75781 2.03516,1.47656 2.33984,1.23047 2.66797,1.01172 2.99609,0.79297 3.33984,0.60547 3.70703,0.45703 4.07031,0.30469 4.44531,0.1914 4.83203,0.11328 5.21875,0.03518 5.60937,0 6.00391,0 h 15.00781 c 0.39453,0 0.78515,0.0352 1.17187,0.11328 0.38672,0.0781 0.76172,0.19141 1.125,0.34375 0.36719,0.14844 0.71094,0.33594 1.03907,0.55469 0.32812,0.21875 0.63281,0.46484 0.91015,0.74609 0.27735,0.27734 0.52735,0.58203 0.7461,0.91016 0.21875,0.32812 0.40625,0.67187 0.55468,1.03515 0.15235,0.36719 0.26563,0.74219 0.34375,1.12891 0.0742,0.38672 0.11328,0.77734 0.11328,1.17187 0,0.39063 -0.0391,0.78125 -0.11328,1.16797 -0.0781,0.38672 -0.1914,0.76172 -0.34375,1.12891 -0.14843,0.36328 -0.33593,0.71094 -0.55468,1.03516 -0.21875,0.32812 -0.46875,0.63281 -0.7461,0.91015 -0.27734,0.28125 -0.58203,0.52735 -0.91015,0.7461 -0.32813,0.22265 -0.67188,0.40625 -1.03907,0.55859 -0.36328,0.14844 -0.73828,0.26172 -1.125,0.33984 -0.38672,0.0781 -0.77734,0.11719 -1.17187,0.11719 H 6.00391 c -0.39454,0 -0.78516,-0.0391 -1.17188,-0.11719 -0.38672,-0.0781 -0.76172,-0.1914 -1.125,-0.33984 C 3.33984,11.39844 2.99609,11.21484 2.66797,10.99609 2.33984,10.77344 2.03516,10.52734 1.75781,10.24609 1.48047,9.96875 1.23047,9.66406 1.01172,9.33594 0.79297,9.01172 0.60547,8.66406 0.45703,8.30078 0.30469,7.93359 0.19141,7.55859 0.11328,7.17187 0.03908,6.78515 0,6.39453 0,6.0039 Z m 0,0"/>
                    <path fill="#fff" d="m 8.8538666,9.0041491 h -3.4375 v -6.203125 h 1.203125 v 5.140625 h 2.0625 z m 0,0"/>
                    <path fill="#fff" d="M 10.966965,9.0041491 H 9.7638397 v -6.203125 h 1.2031253 z m 0,0"/>
                    <path fill="#fff" d="m 17.635117,2.8010241 -2.3125,6.234375 h -1.21875 l -2.265625,-6.09375 1.25,-0.203125 1.671875,4.75 1.609375,-4.6875 z m 0,0"/>
                    <path fill="#fff" d="m 22.175171,9.0041491 h -3.703125 v -6.203125 h 3.609375 v 1 h -2.421875 v 1.484375 h 1.859375 l 0.171875,1 h -2.03125 v 1.71875 h 2.515625 z m 0,0"/>
                  </svg>
                  </Link>
                    <Link to="https://twitch.tv/godmota" className="LiveOn Mobile">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.015619 12.00781">
                      <path fill="#f04545" d="M 0,6.0039 C 0,5.60937 0.0391,5.21875 0.11328,4.83203 0.19138,4.44531 0.30469,4.07031 0.45703,3.70312 0.60547,3.33984 0.79297,2.99609 1.01172,2.66797 1.23047,2.33984 1.48047,2.03515 1.75781,1.75781 2.03516,1.47656 2.33984,1.23047 2.66797,1.01172 2.99609,0.79297 3.33984,0.60547 3.70703,0.45703 4.07031,0.30469 4.44531,0.1914 4.83203,0.11328 5.21875,0.03518 5.60937,0 6.00391,0 h 15.00781 c 0.39453,0 0.78515,0.0352 1.17187,0.11328 0.38672,0.0781 0.76172,0.19141 1.125,0.34375 0.36719,0.14844 0.71094,0.33594 1.03907,0.55469 0.32812,0.21875 0.63281,0.46484 0.91015,0.74609 0.27735,0.27734 0.52735,0.58203 0.7461,0.91016 0.21875,0.32812 0.40625,0.67187 0.55468,1.03515 0.15235,0.36719 0.26563,0.74219 0.34375,1.12891 0.0742,0.38672 0.11328,0.77734 0.11328,1.17187 0,0.39063 -0.0391,0.78125 -0.11328,1.16797 -0.0781,0.38672 -0.1914,0.76172 -0.34375,1.12891 -0.14843,0.36328 -0.33593,0.71094 -0.55468,1.03516 -0.21875,0.32812 -0.46875,0.63281 -0.7461,0.91015 -0.27734,0.28125 -0.58203,0.52735 -0.91015,0.7461 -0.32813,0.22265 -0.67188,0.40625 -1.03907,0.55859 -0.36328,0.14844 -0.73828,0.26172 -1.125,0.33984 -0.38672,0.0781 -0.77734,0.11719 -1.17187,0.11719 H 6.00391 c -0.39454,0 -0.78516,-0.0391 -1.17188,-0.11719 -0.38672,-0.0781 -0.76172,-0.1914 -1.125,-0.33984 C 3.33984,11.39844 2.99609,11.21484 2.66797,10.99609 2.33984,10.77344 2.03516,10.52734 1.75781,10.24609 1.48047,9.96875 1.23047,9.66406 1.01172,9.33594 0.79297,9.01172 0.60547,8.66406 0.45703,8.30078 0.30469,7.93359 0.19141,7.55859 0.11328,7.17187 0.03908,6.78515 0,6.39453 0,6.0039 Z m 0,0"/>
                      <path fill="#fff" d="m 8.8538666,9.0041491 h -3.4375 v -6.203125 h 1.203125 v 5.140625 h 2.0625 z m 0,0"/>
                      <path fill="#fff" d="M 10.966965,9.0041491 H 9.7638397 v -6.203125 h 1.2031253 z m 0,0"/>
                      <path fill="#fff" d="m 17.635117,2.8010241 -2.3125,6.234375 h -1.21875 l -2.265625,-6.09375 1.25,-0.203125 1.671875,4.75 1.609375,-4.6875 z m 0,0"/>
                      <path fill="#fff" d="m 22.175171,9.0041491 h -3.703125 v -6.203125 h 3.609375 v 1 h -2.421875 v 1.484375 h 1.859375 l 0.171875,1 h -2.03125 v 1.71875 h 2.515625 z m 0,0"/>
                    </svg>
                  </Link></div> : ""}
                </div>
                <div className="Items">
                  <Form.Group className="d-flex position-relative InputSearch">
                    <Icon.Search color="#9aa9bb" size={18} className="position-absolute IconAbsolute"/>
                      <Form.Control
                        type="search"
                        placeholder='Search..'
                        className="me-2 Input"
                        name="text"
                        aria-label="Search"
                        onChange={handleChange} 
                        // onClick={ () => setClicked(true) }
                      />
                      <ul ref={wrapperRef} className={!formState.text? "SearchResults" : "SearchResults Show"} >
                      {filteredItems.length >= 1
                        ? filteredItems.map((value) => (
                              <li key={value.name}>
                              <Link key={value.name} to={value.url}>
                                <img width={24} height={24} style={{marginRight: "4px"}} src={value.logo} />  {value.desc}
                              </Link>
                            </li>
                          ))
                        : <li>
                              <a>
                                No results found. Try again.
                              </a>
                            </li>
                  }

                      </ul>
                    </Form.Group>
    
                    <div className="IconsAndButtons justify-content-center d-flex align-items-center">
                    {/* <Icon.Search color="#9aa9bb" onClick={openModalSearch} size={18} className="mx-3"/> */}
                    <Icon.Bell color="#9aa9bb" size={20} data-tooltip-id="ToolTipTopBar" data-tooltip-offset="28" data-tooltip-place="bottom" data-tooltip-content="Coming Soon" className=""/>
                    <Tooltip id="ToolTipTopBar" />
                    <Icon.Cart color="#9aa9bb" data-tooltip-offset="28" data-tooltip-place="bottom" data-tooltip-id="ToolTipTopBar" data-tooltip-content="Coming Soon" size={20} className="mx-3"/>
                    <Button variant="light" onClick={openModal} className="ButtonWhite">
                        Login
                    </Button>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <img src={En} className="img-fluid center" style={{width: "18px"}} alt="EN"/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item disabled style={{fontSize: "14px"}}>
                          <img src={Pt} className="img-fluid center" style={{width: "18px", marginRight:"6px"}} alt="PT"/>
                          Coming Soon
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={styleLogin}
                        contentLabel="Example Modal"
                        shouldCloseOnOverlayClick={false}
                    >
                        <div className="PopupContent">
                            <img src={Logo} className="img-fluid center mx-auto" style={{width: "150px"}}alt="Logo GODMOTA"/>
                            <Button className="ButtonClose" onClick={closeModal}>
                                <Icon.X color="lightGrey" size={30}/>
                            </Button>
                            <div className="mt-2">Our team is working hard every day to provide you with the best possible experience!</div>
                            <div className="mt-2 bold">Stay tuned!</div>
                            <Button variant="outline-light" className="mt-3" tooltip="Em breve" disabled>
                                <Icon.Twitch color="#A970FF" className="mx-2" />
                                Continue with Twitch
                            </Button>
                        </div>

                    </Modal>
                    </div>
                </div>
            </div>
    )
}

export default TopBarMenu;