import React from "react";
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import ReactCardFlip from "react-card-flip";
import BCGameLogo from "../images/CardFlip/BCGame.png";
import RioAceLogo from "../images/CardFlip/RioAce.webp";
import BetifyLogo from "../images/CardFlip/Betify.png";
import CasaBet from "../images/CardFlip/CasaBet.png";
import Gizbo from "../images/CardFlip/Gizbo.png";
import LeBullLogo from "../images/CardFlip/LeBull.png";
import SmokeAceLogo from "../images/CardFlip/Stake.png";
import "../pages/Offers.css";


const CardStyle = {
    border: "1px solid black",
    padding: "20px",
    margin: "20px",
    width: "200px",
    height: "300px"
  };
  

export default function Offers(){
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isFlippedCB, setIsFlippedCB] = React.useState(false);
    const [isFlippedBetify, setIsFlippedBetify] = React.useState(false);
    const [isFlippedBetRioAce, setisFlippedBetRioAce] = React.useState(false);
    const [isFlippedLeBull, setIsFlippedLeBull] = React.useState(false);
    const [isFlippedBCGame, setIsFlippedBCGame] = React.useState(false);
    const [isFlippedStake, setIsFlippedStake] = React.useState(false);

    return (
        <div id="Container">
            <div id="Ofertas">
                <div className="Header">
                    <div className="HeaderCategory">
                        Casinos
                    </div>
                    <div className="HeaderPage">
                        Offers
                    </div>
                    <div className="HeaderSubTitle">
                        Best offers and bonuses exclusive for you
                    </div>
                </div>
                <div className="OfferExclusive">
                    <div className="OfferBox">
                        <div className="LeftSideBox">
                            <div className="NewBadge HotBadge">
                                Hot
                            </div>
                        </div>
                        <div className="RightSideBox">
                            <div className="box">
                                <div className="MiniTitle">
                                    FREE
                                </div>
                                <div className="Desc">
                                    5 CASES
                                </div>
                            </div>
                            <div className="box">
                                <div className="MiniTitle">
                                    BONUS
                                </div>
                                <div className="Desc">
                                    10%
                                </div>
                            </div>
                            <div className="box">
                                <div className="MiniTitle">
                                    CODE
                                </div>
                                <div className="Desc">
                                    PORTUGAL
                                </div>
                            </div>
                            <div className="ButtonsAndInfo">
                                <Button href="https://empiredrop.com?r=godmota" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                                <span>+18 | T&C APPLY</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Offers">
                <div className="offerBox mx-auto">
                        <ReactCardFlip isFlipped={isFlippedBetRioAce} flipDirection="horizontal">
                            <div className="CardFront">
                            <div className="fundoOferta">
                            <div className="casinoImage RioAce"></div>
                            <div className="infoButton" onClick={() => setisFlippedBetRioAce((prev) => !prev)}>
                            {/* <Icon.InfoCircleFill size="20px" /> */}
                            Show More
                            </div>
                            <div className="NewBadge">
                                NEW
                            </div>
                            </div>
                            <div className="boxInside">
                            <div className="Title">HUGE FREE SPINS & BONUS DEPOSITS</div>
                            <div className="Boxes d-flex justify-content-center">
                            <div className="box">
                            <div className="MiniTitle">
                            Min. Dep.
                            </div>
                            <div className="Desc">
                            25€
                            </div>
                            </div>
                            <div className="box">
                            <div className="MiniTitle">
                            Bonus
                            </div>
                            <div className="Desc">
                            450%
                            </div>
                            </div>
                            <div className="box">
                            <div className="MiniTitle">
                            CODE
                            </div>
                            <div className="Desc">
                            -
                            </div>
                            </div>
                            <div className="box bigger">
                            <div className="MiniTitle">
                            Cashback
                            </div>
                            <div className="Desc">
                            UP TO 35%
                            </div>
                            </div>
                            <div className="box bigger">
                            <div className="MiniTitle">
                            Deposit free spins
                            </div>
                            <div className="Desc">
                            up to 350FS
                            </div>
                            </div>
                            </div>
                            <div className="Alert">
                            +18 | T&C APPLY
                            </div>
                            <Button href="https://bit.ly/PortugalRioAce" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                            </div>
                            </div>
                            <div className="InfoPlusCasinos CardBack">
                            <div className="CloseCard" onClick={() => setisFlippedBetRioAce((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                <div className="Top">
                                <div className="LeftTop">
                                <img className="CasinoImage" src={RioAceLogo} />
                                <div className="CasinoBrandName">RioAce</div>
                                </div>
                                <div className="RightTop">
                                Est. 2023
                                </div>
                                </div>
                                <div className="MiddleContent">
                                <div className="Title">Withdraw Time</div>
                                <div className="Text">Up to 48h</div>
                                <div className="Title">License</div>
                                <div className="Text">Curaçao</div>
                                </div>
                                <div className="BottomContent">
                                <ul>
                                <li>
                                • Click on our button "CLAIM BONUS" and complete the registration to receive <b> free spins and bonus deposits!</b>

                                </li>
                                <li>
                                • 24/7 Live Support
                                </li>
                                </ul>
                                </div>
                            </div>
                        </ReactCardFlip>    
                    </div>
                
                        <div className="offerBox mx-auto CardFront">
                            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                            <div className="CardFront">
                                <div className="fundoOferta">
                                    <div className="casinoImage Gizbo"></div>
                                    <div className="infoButton" onClick={() => setIsFlipped((prev) => !prev)}>
                                    {/* <Icon.InfoCircleFill size="20px" /> */}
                                        Show More
                                    </div>
                                    {/* <div className="NewBadge HotBadge">
                                        New
                                    </div> */}
                                    <div className="NewBadge HotBadge">
                                        HOT
                                    </div>
                                </div>
                                
                                <div className="boxInside">
                                    <div className="Title">125 free spins on signup</div>
                                    <div className="Boxes d-flex justify-content-center">
                                        <div className="box">
                                            <div className="MiniTitle">
                                                Min. Dep.
                                            </div>
                                            <div className="Desc">
                                                10€
                                            </div>
                                        </div>
                                        <div className="box">
                                            <div className="MiniTitle">
                                                Bonus
                                            </div>
                                            <div className="Desc">
                                                150%
                                            </div>
                                        </div>
                                        <div className="box">
                                            <div className="MiniTitle">
                                                CODE
                                            </div>
                                            <div className="Desc">
                                                Godmota
                                            </div>
                                        </div>
                                        <div className="box bigger">
                                            <div className="MiniTitle">
                                                Deposit free spins
                                            </div>
                                            <div className="Desc">
                                                up to 400FS
                                            </div>
                                        </div>
                                        <div className="box bigger">
                                            <div className="MiniTitle">
                                                DEPosit Bonus
                                            </div>
                                            <div className="Desc">
                                                UP TO 225%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Alert">
                                        +18 | T&C APPLY
                                    </div>
                                    <Button href="https://bit.ly/PortugalGizbo" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                                </div>
                                </div>
                                <div className="InfoPlusCasinos CardBack">
                                <div className="CloseCard" onClick={() => setIsFlipped((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                <div className="Top">
                                    <div className="LeftTop">
                                        <img className="CasinoImage" src={Gizbo} />
                                        <div className="CasinoBrandName">Gizbo</div>
                                    </div>
                                    <div className="RightTop">
                                        Est. 2024
                                    </div>
                                </div>
                                <div className="MiddleContent">
                                    <div className="Title">Withdraw Time</div>
                                    <div className="Text">Up to 72h</div>
                                    <div className="Title">License</div>
                                    <div className="Text">Curaçao</div>
                                </div>
                                <div className="BottomContent">
                                    <ul>
                                        <li>
                                        • Registration is required via the link with promocode <b>GODMOTA</b> during registration to receive promotions and  <b>125 FREE SPINS</b> without deposit: <b>Book of Kemet/Dragon's Gold 100</b>
                                        </li>
                                        {/* <li>
                                        • 24/7 Live Support
                                        </li> */}
                                    </ul>
                                </div>
                                </div>
                                </ReactCardFlip>
                            </div>
                    <div className="offerBox mx-auto">
                    <ReactCardFlip isFlipped={isFlippedBetify} flipDirection="horizontal">
                            <div className="CardFront">
                        <div className="fundoOferta">
                            <div className="casinoImage Betify"></div>
                            <div className="infoButton" onClick={() => setIsFlippedBetify((prev) => !prev)}>
                            {/* <Icon.InfoCircleFill size="20px" /> */}
                                Show More
                            </div>
                            <div className="HotBadge Betify">
                                Top
                            </div>
                        </div>
                        <div className="boxInside">
                            <div className="Title">EXCLUSIVE GODMOTA VIP PROGRAM</div>
                            <div className="Boxes d-flex justify-content-center">
                                <div className="box">
                                    <div className="MiniTitle">
                                        Min. Dep.
                                    </div>
                                    <div className="Desc">
                                        20€
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="MiniTitle">
                                        Bonus 
                                    </div>
                                    <div className="Desc">
                                        100%
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="MiniTitle">
                                        CODE
                                    </div>
                                    <div className="Desc">
                                        GODMOTA
                                    </div>
                                </div>
                                <div className="box bigger">
                                    <div className="MiniTitle">
                                        CASHBACK
                                    </div>
                                    <div className="Desc">
                                        UP TO 20%
                                    </div>
                                </div>
                                <div className="box bigger">
                                    <div className="MiniTitle">
                                        DAILY WHEEL
                                    </div>
                                    <div className="Desc">
                                        UP TO 3000€
                                    </div>
                                </div>
                            </div>
                            <div className="Alert">
                                +18 | T&C APPLY
                            </div>
                            <Button href="https://bit.ly/GODMOTAxBetify" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                            </div>
                        </div>
                        <div className="InfoPlusCasinos CardBack" >
                        <div className="CloseCard" onClick={() => setIsFlippedBetify((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                <div className="Top">
                                    <div className="LeftTop">
                                        <img className="CasinoImage" src={BetifyLogo} />
                                        <div className="CasinoBrandName">Betify</div>
                                    </div>
                                    <div className="RightTop">
                                        Est. 2023
                                    </div>
                                </div>
                                <div className="MiddleContent">
                                    <div className="Title">Withdraw Time</div>
                                    <div className="Text">Up to 48h</div>
                                    <div className="Title">License</div>
                                    <div className="Text">Curaçao</div>
                                </div>
                                <div className="BottomContent">
                                    <ul>
                                        <li>
                                        • There MAY be a promotion of <b>€10</b> free or another promotion on our Discord. <b>Open a ticket to check if the promotion is active.</b> 

                                        </li>
                                        <li>
                                        • 24/7 Live Support
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </ReactCardFlip>    
                    </div>
                    <div className="offerBox mx-auto">
                        <ReactCardFlip isFlipped={isFlippedBCGame} flipDirection="horizontal">
                            <div className="CardFront">
                                <div className="fundoOferta">
                                    <div className="casinoImage BCGame"></div>
                                    <div className="infoButton" onClick={() => setIsFlippedBCGame((prev) => !prev)}>
                                    {/* <Icon.InfoCircleFill size="20px" /> */}
                                        Show More
                                    </div>
                                </div>
                                <div className="boxInside">
                                    <div className="Title">SUPER VIP CLUB | Daily & Weekly</div>
                                    <div className="Boxes d-flex justify-content-center">
                                    <div className="box">
                                        <div className="MiniTitle">
                                            Min. Dep.
                                        </div>
                                        <div className="Desc">
                                            10€
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="MiniTitle">
                                            Cashback
                                        </div>
                                        <div className="Desc">
                                            up to 25%
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="MiniTitle">
                                            CODE
                                        </div>
                                        <div className="Desc">
                                            Mota
                                        </div>
                                    </div>
                                    <div className="box bigger">
                                        <div className="MiniTitle">
                                            Daily Wheel
                                        </div>
                                        <div className="Desc">
                                            Up to 5 BTC
                                        </div>
                                    </div>
                                    <div className="box bigger">
                                        <div className="MiniTitle">
                                            Deposit Bonus
                                        </div>
                                        <div className="Desc">
                                            up to 360%
                                        </div>
                                    </div>
                                    </div>
                                    <div className="Alert">
                                        +18 | T&C APPLY
                                    </div>
                                    <Button href="http://bit.ly/godmotaBCGame_" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                                    </div>
                            </div>
                            <div className="InfoPlusCasinos CardBack">
                            <div className="CloseCard" onClick={() => setIsFlippedBCGame((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                        <div className="Top">
                                            <div className="LeftTop">
                                                <img className="CasinoImage" src={BCGameLogo} />
                                                <div className="CasinoBrandName">BC Game</div>
                                            </div>
                                            <div className="RightTop">
                                                Est. 2017
                                            </div>
                                        </div>
                                        <div className="MiddleContent">
                                            <div className="Title">Withdraw Time</div>
                                            <div className="Text">Up to 72h</div>
                                            <div className="Title">License</div>
                                            <div className="Text">Curaçao</div>
                                        </div>
                                        <div className="BottomContent">
                                            <ul>
                                                <li>
                                                • Use the code during registration: <b>MOTA</b> and receive a 300% deposit bonus + <b>1 daily Free Spin</b>, where you can win up to 3 BTC!
                                                </li>
                                                <li>
                                                • You must deposit within 20 minutes of registration to receive the 300% bonus.
                                                </li>
                                            </ul>
                                        </div>
                            </div>
                        </ReactCardFlip>  
                    </div>
                    <div className="offerBox mx-auto CardFront">
                            <ReactCardFlip isFlipped={isFlippedCB} flipDirection="horizontal">
                            <div className="CardFront">
                                <div className="fundoOferta">
                                    <div className="casinoImage CasaBet"></div>
                                    <div className="infoButton" onClick={() => setIsFlippedCB((prev) => !prev)}>
                                    {/* <Icon.InfoCircleFill size="20px" /> */}
                                        Show More
                                    </div>
                                    {/* <div className="NewBadge">
                                        New
                                    </div> */}
                                </div>
                                <div className="boxInside">
                                    <div className="Title">FREE SPINS + BONUS DEPOSITS</div>
                                    <div className="Boxes d-flex justify-content-center">
                                        <div className="box">
                                            <div className="MiniTitle">
                                                Min. Dep.
                                            </div>
                                            <div className="Desc">
                                                10€
                                            </div>
                                        </div>
                                        <div className="box">
                                            <div className="MiniTitle">
                                                Bonus
                                            </div>
                                            <div className="Desc">
                                                400%
                                            </div>
                                        </div>
                                        <div className="box">
                                            <div className="MiniTitle">
                                                CODE
                                            </div>
                                            <div className="Desc">
                                                GODCB
                                            </div>
                                        </div>
                                        <div className="box bigger">
                                            <div className="MiniTitle">
                                                Deposit free spins
                                            </div>
                                            <div className="Desc">
                                                350FS Gates
                                            </div>
                                        </div>
                                        <div className="box bigger">
                                            <div className="MiniTitle">
                                                DEPosit Bonus
                                            </div>
                                            <div className="Desc">
                                                UP TO 2200€
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Alert">
                                        +18 | T&C APPLY
                                    </div>
                                    <Button href="https://bit.ly/CasaBet200FreeSpins" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                                </div>
                                </div>
                                <div className="InfoPlusCasinos CardBack">
                                <div className="CloseCard" onClick={() => setIsFlippedCB((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                <div className="Top">
                                    <div className="LeftTop">
                                        <img className="CasinoImage" src={CasaBet} />
                                        <div className="CasinoBrandName">CasaBet</div>
                                    </div>
                                    <div className="RightTop">
                                        Est. 2024
                                    </div>
                                </div>
                                <div className="MiddleContent">
                                    <div className="Title">Withdraw Time</div>
                                    <div className="Text">Up to 48h</div>
                                    <div className="Title">License</div>
                                    <div className="Text">Curaçao</div>
                                </div>
                                <div className="BottomContent">
                                    <ul>
                                        <li>
                                        • Click on our button "CLAIM BONUS" and use the promocode <b>GODCB</b> during registration to receive <b> free spins and bonus deposits!</b>
                                        </li>
                                        <li>
                                        • 24/7 Live Support (for help with free spins)
                                        </li>
                                    </ul>
                                </div>
                                </div>
                                </ReactCardFlip>
                            </div>
                    <div className="offerBox mx-auto">
                        <ReactCardFlip isFlipped={isFlippedLeBull} flipDirection="horizontal">
                            <div className="CardFront">
                                <div className="fundoOferta">
                                    <div className="casinoImage LeBull"></div>
                                    <div className="infoButton" onClick={() => setIsFlippedLeBull((prev) => !prev)}>
                                    {/* <Icon.InfoCircleFill size="20px" /> */}
                                        Show More
                                    </div>
                                </div>
                                <div className="boxInside">
                                    <div className="Title">Best sport odds in Portugal</div>
                                    <div className="Boxes d-flex justify-content-center">
                                    <div className="box">
                                        <div className="MiniTitle">
                                            Min. Dep.
                                        </div>
                                        <div className="Desc">
                                            10€
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="MiniTitle">
                                            Bonus
                                        </div>
                                        <div className="Desc">
                                            100%
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="MiniTitle">
                                            WAGER
                                        </div>
                                        <div className="Desc">
                                            X30
                                        </div>
                                    </div>
                                    <div className="box bigger">
                                        <div className="MiniTitle">
                                            License
                                        </div>
                                        <div className="Desc">
                                            SRIJ
                                        </div>
                                    </div>
                                    <div className="box bigger">
                                        <div className="MiniTitle">
                                            Deposit Bonus
                                        </div>
                                        <div className="Desc">
                                            up to 250%
                                        </div>
                                    </div>
                                    </div>
                                    <div className="Alert">
                                        +18 | T&C APPLY
                                    </div>
                                    <Button href="https://bit.ly/godmotaXLeBull" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                                    </div>
                            </div>
                            <div className="InfoPlusCasinos CardBack" >
                            <div className="CloseCard" onClick={() => setIsFlippedLeBull((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                        <div className="Top">
                                            <div className="LeftTop">
                                                <img className="CasinoImage" src={LeBullLogo} />
                                                <div className="CasinoBrandName">LeBull</div>
                                            </div>
                                            <div className="RightTop">
                                                Est. 2023
                                            </div>
                                        </div>
                                        <div className="MiddleContent">
                                            <div className="Title">Withdraw Time</div>
                                            <div className="Text">Up to 8h</div>
                                            <div className="Title">License</div>
                                            <div className="Text">SRIJ (PT)</div>
                                        </div>
                                        <div className="BottomContent">
                                            <ul>
                                                <li>
                                                • Portuguese casino with <b>SRIJ license</b>. Turbo withdrawals. All deposit and withdrawal methods.

                                                </li>
                                                <li>
                                                • 100% deposit bonus up to €400 on your deposits with a wager of only X30!
                                                </li>
                                            </ul>
                                        </div>
                            </div>
                        </ReactCardFlip>  
                    </div>
                    <div className="offerBox">
                        <ReactCardFlip isFlipped={isFlippedStake} flipDirection="horizontal">
                            <div className="CardFront">
                                <div className="fundoOferta">
                                    <div className="casinoImage SmokAce"></div>
                                    <div className="infoButton" onClick={() => setIsFlippedStake((prev) => !prev)}>
                                        Show More
                                    </div>
                                </div>
                                <div className="boxInside">
                                    <div className="Title">FREE SPINS + BONUS DEPOSITS</div>
                                    <div className="Boxes d-flex justify-content-center">
                                    <div className="box">
                                        <div className="MiniTitle">
                                            Min. Dep.
                                        </div>
                                        <div className="Desc">
                                            20€
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="MiniTitle">
                                            BONUS
                                        </div>
                                        <div className="Desc">
                                            177%
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="MiniTitle">
                                            CODE
                                        </div>
                                        <div className="Desc">
                                            GODMOTA
                                        </div>
                                    </div>
                                    <div className="box bigger">
                                        <div className="MiniTitle">
                                            Deposit Free Spins
                                        </div>
                                        <div className="Desc">
                                            Up to 300FS
                                        </div>
                                        </div>
                                    </div>
                                    <div className="Alert">
                                        +18 | T&C APPLY
                                    </div>
                                    <Button href="https://bit.ly/GODMOTASmokAce" target="_blank" variant="light" className="w-100 ButtonWhite">CLAIM BONUS</Button>
                                    </div>
                            </div>
                            <div className="InfoPlusCasinos CardBack" >
                            <div className="CloseCard" onClick={() => setIsFlippedStake((prev) => !prev)}>
                                    <Icon.X style={{fontSize: "24px"}}/>
                                </div>
                                        <div className="Top">
                                            <div className="LeftTop">
                                                <img className="CasinoImage" src={SmokeAceLogo} />
                                                <div className="CasinoBrandName">SmokAce</div>
                                            </div>
                                            <div className="RightTop">
                                                Est. 2023
                                            </div>
                                        </div>
                                        <div className="MiddleContent">
                                            <div className="Title">Withdraw Time</div>
                                            <div className="Text">Up to 1h</div>
                                            <div className="Title">License</div>
                                            <div className="Text">Curaçao</div>
                                        </div>
                                        <div className="BottomContent">
                                            <ul>
                                                <li>
                                                • Click on our button "CLAIM BONUS" and use the promocode <b>GODMOTA</b> during registration to receive <b> free spins and bonus deposits!</b>
                                                </li>
                                                <li>
                                                • 24/7 Live Support
                                                </li>
                                            </ul>
                                        </div>
                            </div>
                        </ReactCardFlip>  
                    </div>
                </div>
                
            </div>

        </div>
    )
}