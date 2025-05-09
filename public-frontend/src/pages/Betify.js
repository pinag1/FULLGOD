import Button from 'react-bootstrap/esm/Button'
import Accordion from 'react-bootstrap/Accordion';
import "./Betify.css"
import LogoBetify from  '../images/Betify Logo.png'


export default function Casinos(){

    return (
        <div id="Container">
            <div id="Betify">
                <div className="Header">
                    <div className="HeaderCategory">
                        Casinos
                    </div>
                    <div className="HeaderPage">
                    <svg width="250" height="75" viewBox="0 0 144 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7213 2.30554C19.8888 1.35941 20.7111 0.669922 21.672 0.669922H29.7913C31.0236 0.669922 31.9569 1.78301 31.742 2.99645L30.305 11.1108C30.1375 12.0569 29.3151 12.7464 28.3543 12.7464H20.235C19.0027 12.7464 18.0694 11.6333 18.2843 10.4199L19.7213 2.30554ZM17.2342 16.3949C17.4017 15.4488 18.224 14.7593 19.1849 14.7593H27.3041C28.5365 14.7593 29.4698 15.8724 29.2549 17.0858L27.8179 25.2002C27.6503 26.1463 26.828 26.8358 25.8672 26.8358H17.7479C16.5156 26.8358 15.5823 25.7227 15.7972 24.5093L17.2342 16.3949ZM4.99427 14.7593C4.03342 14.7593 3.2111 15.4488 3.04355 16.3949L1.60658 24.5093C1.39169 25.7227 2.32499 26.8358 3.5573 26.8358H11.6766C12.6374 26.8358 13.4597 26.1463 13.6273 25.2002L15.0643 17.0858C15.2791 15.8724 14.3459 14.7593 13.1135 14.7593H4.99427Z" fill="#1ED760"/>
                        <path d="M34.2053 0.672897H47.5495C50.0805 0.672897 52.0727 1.23364 53.5262 2.35514C54.9796 3.45171 55.7063 4.9595 55.7063 6.8785C55.7063 8.2243 55.3555 9.44548 54.6539 10.5421C53.9522 11.6386 52.9623 12.5109 51.6843 13.1589C52.5614 13.6573 53.238 14.3427 53.7141 15.215C54.2153 16.0623 54.4659 17.0467 54.4659 18.1682C54.4659 19.9128 54.0148 21.4455 53.1127 22.7664C52.2106 24.0623 50.9325 25.0717 49.2786 25.7944C47.6497 26.4922 45.7452 26.8411 43.565 26.8411H29.5861L34.2053 0.672897ZM44.2416 21.0841C45.2691 21.0841 46.071 20.8349 46.6473 20.3364C47.2488 19.8131 47.5495 19.1028 47.5495 18.2056C47.5495 17.5576 47.324 17.0467 46.8729 16.6729C46.4469 16.2741 45.8705 16.0748 45.1438 16.0748H38.5281L37.6369 21.0841H44.2416ZM45.8204 10.6168C46.6724 10.6168 47.349 10.405 47.8502 9.98131C48.3514 9.53271 48.602 8.94704 48.602 8.2243C48.602 7.65109 48.414 7.20249 48.0382 6.8785C47.6873 6.52959 47.1987 6.35514 46.5722 6.35514H40.2364L39.4835 10.6168H45.8204Z" fill="white"/>
                        <path d="M66.1021 27.2523C64.1725 27.2523 62.4936 26.9284 61.0652 26.2804C59.6618 25.6075 58.5843 24.6729 57.8325 23.4766C57.0807 22.2804 56.7048 20.8847 56.7048 19.2897C56.7048 18.6417 56.7549 18.0312 56.8552 17.4579C57.3814 14.4424 58.672 12.1122 60.7269 10.4673C62.8068 8.79751 65.438 7.96262 68.6206 7.96262C70.3998 7.96262 71.9535 8.27415 73.2817 8.8972C74.6098 9.49533 75.6247 10.3551 76.3264 11.4766C77.028 12.5732 77.3789 13.8442 77.3789 15.2897C77.3789 16.5857 77.0782 17.9813 76.4767 19.4766H63.5836C63.7089 20.1994 64.1224 20.785 64.8241 21.2336C65.5257 21.6822 66.4154 21.9065 67.4929 21.9065C69.0717 21.9065 70.6379 21.4081 72.1916 20.4112L74.9732 24.4486C73.7453 25.4455 72.4296 26.1682 71.0263 26.6168C69.623 27.0405 67.9816 27.2523 66.1021 27.2523ZM70.8384 16.0748C70.9135 15.8006 70.9511 15.5514 70.9511 15.3271C70.9511 14.6542 70.688 14.1184 70.1618 13.7196C69.6355 13.3209 68.8837 13.1215 67.9064 13.1215C66.0269 13.1215 64.7489 14.0561 64.0723 15.9252L64.0347 16.0748H70.8384Z" fill="white"/>
                        <path d="M86.5465 27.2897C84.6921 27.2897 83.2763 26.866 82.299 26.0187C81.3216 25.1464 80.833 23.8879 80.833 22.243C80.833 21.6449 80.8831 21.0841 80.9833 20.5607L82.1904 13.6822H79.2166L80.1564 8.37383H83.1259L83.9153 3.92523L90.9069 3.17757L89.9672 8.37383H94.1771L93.2394 13.6822H89.0274L88.0125 19.4766C87.9624 19.8255 87.9373 20.0498 87.9373 20.1495C87.9373 21.0218 88.4385 21.4579 89.4409 21.4579C90.1175 21.4579 90.8317 21.296 91.5835 20.972L92.1849 26.0561C90.531 26.8785 88.6515 27.2897 86.5465 27.2897Z" fill="white"/>
                        <path d="M97.5511 8.37383H104.505L101.249 26.8411H94.299L97.5511 8.37383ZM98.0397 3.36449C98.1901 2.41745 98.6787 1.61994 99.5057 0.971964C100.333 0.323988 101.285 0 102.362 0C103.415 0 104.242 0.261683 104.843 0.785048C105.47 1.30841 105.783 2.03115 105.783 2.95327C105.783 3.12773 105.758 3.38941 105.708 3.73832C105.533 4.68536 105.031 5.48287 104.204 6.13084C103.402 6.75389 102.463 7.06542 101.385 7.06542C100.333 7.06542 99.5057 6.80374 98.9043 6.28038C98.3028 5.73209 98.0021 4.98443 98.0021 4.03738C98.0021 3.73832 98.0147 3.51402 98.0397 3.36449Z" fill="white"/>
                        <path d="M110.523 7.06542C110.924 4.82243 111.901 3.09034 113.455 1.86916C115.033 0.623054 117.038 0 119.469 0C120.697 0 121.774 0.174454 122.701 0.523364C123.654 0.872274 124.418 1.37072 124.994 2.01869L122.175 6.13084C121.9 5.8567 121.561 5.64486 121.16 5.49533C120.784 5.34579 120.396 5.27103 119.995 5.27103C119.293 5.27103 118.717 5.49533 118.266 5.94393C117.815 6.3676 117.505 6.98154 117.355 7.80397L117.251 8.37383H122.029L121.085 13.7196H116.311L113.998 26.8411H107.041L109.357 13.7196H106.234L107.177 8.37383H110.297L110.523 7.06542Z" fill="white"/>
                        <path d="M128.893 36C127.339 36 125.886 35.8006 124.532 35.4019C123.204 35.028 121.876 34.4299 120.548 33.6075L123.706 28.8972C124.507 29.3956 125.397 29.7819 126.374 30.0561C127.352 30.3551 128.304 30.5047 129.231 30.5047C130.66 30.5047 131.75 30.1807 132.501 29.5327C133.278 28.8847 133.792 27.8505 134.043 26.4299L134.306 24.9346C132.652 26.2305 130.697 26.8785 128.442 26.8785C126.462 26.8785 124.946 26.3676 123.893 25.3458C122.866 24.324 122.352 22.8411 122.352 20.8972C122.352 20.1246 122.447 19.3146 122.598 18.4673L124.382 8.37383H131.326L129.645 17.9439C129.569 18.3178 129.532 18.6791 129.532 19.028C129.532 19.7757 129.707 20.3614 130.058 20.785C130.409 21.1838 130.91 21.3832 131.562 21.3832C132.564 21.3832 133.404 21.0592 134.08 20.4112C134.757 19.7632 135.204 18.8536 135.405 17.6822L137.05 8.37383H144.001L140.658 27.1402C140.107 30.1807 138.879 32.4112 136.975 33.8318C135.095 35.2773 132.401 36 128.893 36Z" fill="white"/>
                    </svg>
                    </div>
                    <div className="HeaderSubTitle">
                        How to play at Betify and get access to the best VIP program ever
                    </div>
                </div>
                <div className="InfoTop d-flex justify-content-between align-items-center">
                    <div className="InfoLeftSide">
                        <div className="Info">
                            <p className="Title">
                                Sign up with code GODMOTA
                            </p>
                            <p className="SubTitle">
                                1. CREATE AN ACCOUNT AT BETIFY
                            </p>
                            <p>
                                Click on the button below and at the register use the promocode <b>GODMOTA</b> and enjoy all the promotions.
                            </p>
                            <Button href="https://bit.ly/GODMOTAxBetify" target="_blank" variant="light" className="ButtonWhite">REGISTER NOW</Button>
                        </div>
                        <div className="Info">
                            <p className="SubTitle">
                                2. Fill in all the fields as required
                            </p>
                            <p>
                                Enter the required information such as email, username, password, country, currency and promocode  <b>GODMOTA</b>
                            </p>
                        </div>
                    </div>  
                    <div className="BetifyPromoImage">
                        
                    </div>
                </div>
                <div className="Header">
                    <div className="HeaderCategory mt-4">
                        FAQ's
                    </div>
                    <div className="HeaderSubTitle">
                        If you have any questions, you can take a look at our list of frequently asked questions</div>
                </div>
                <div className="Info PaddingFix">
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>WHERE CAN I FIND AN AVAILABLE PROMOTION?</Accordion.Header>
                        <Accordion.Body>
                            To make sure you catch all the promotions ensure that you are subscribed to our telegram and also check your email frequently, since Betify rewards our users with suprise promotions!
                            <br/><br/>
                            <Button variant="light" href="https://t.me/godmotav2" className="ButtonWhite">
                                Join our Telegram
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Info PaddingFix">
                <Accordion>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>WHY HAVEN'T I RECEIVED THE FREESPINS / BONUS?</Accordion.Header>
                        <Accordion.Body>
                        Make sure you have followed these steps:
                        <br/><br/>
                        • Created the account using the promocode <b>GODMOTA</b>
                        <br/>
                        • Verified your email and phone number
                        <br/>
                        • Verified if the promotion is still active
                        <br/><br/>
                        If you have followed these steps and still haven't received your freespins / bonus reach out to the Betify support chat and they will help you further!
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Info PaddingFix">
                <Accordion>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>WHICH DEPOSIT METHODS ARE AVAILABLE?</Accordion.Header>
                        <Accordion.Body>
                            These are the currently available deposit methods: MBWAY / PAYSAFECARD / VISA / BANKTRANSFER / SKRILL / BINANCE PAY / CRYPTO CURRENCY / ETC...
                        <br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Info PaddingFix">
                <Accordion>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>WHICH WITHDRAW METHODS ARE AVAILABLE?</Accordion.Header>
                        <Accordion.Body>
                        These are the currently available withdraw methods: BANK TRANSFER / SKRILL / CRYPTO CURRENCY.
                        <br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Info PaddingFix">
                <Accordion>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>HOW MUCH TIME DOES IT TAKE TO DEPOSIT/WITHDRAW?</Accordion.Header>
                        <Accordion.Body>
                        The deposit/withdraw times varies a lot depending on the method chosen but most of the transactions usually take 5/15 minutes but can take up to 48 hours!
                        <br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Info PaddingFix">
                <Accordion>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>WHICH SLOTS PROVIDERS ARE AVAILABLE?</Accordion.Header>
                        <Accordion.Body>
                        Betify has a long list of providers which includes the most common:
                        <br/><br/>
                        • Pragmatic Play
                        <br/>
                        • Hacksaw Gaming
                        <br/>
                        • NetEnt
                        <br/> 
                        • Play N Go
                        <br/>
                        • Nolimit City 
                        <br/>
                        • Relax Gaming
                        <br/>
                        • among others
                        <br/><br/>
                        You can check the full list on Betify.co
                        <br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                <div className="Info PaddingFix">
                <Accordion>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>I HAVE A DIFFERENT QUESTION</Accordion.Header>
                        <Accordion.Body>
                        If you can't find the answer you are looking for make sure to join our discord and open a ticket so our team can help you further.                        <br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div> 
    )
}