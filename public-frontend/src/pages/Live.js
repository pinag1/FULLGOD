import "./Live.css"


export default function Live(){
    return (
        <div id="Container">
            <div id="Live">
                <div className="Header">
                    <div className="HeaderCategory">
                        Stream
                    </div>
                    <div className="HeaderPage">
                    LIVE
                    </div>
                    {/* <div className="HeaderSubTitle">
                        How to play at Betify and get access to the best VIP program ever
                    </div> */}
                </div>
                <div className="Info">
                <iframe src="https://player.twitch.tv/?channel=GODMOTA&parent=godmota.com&parent=localhost&parent=www.godmota.com" autoplay frameborder="0" allowfullscreen="true" scrolling="no" height="520" width="1000"></iframe> 
                <iframe
                    id="chat_embed"
                    src="https://www.twitch.tv/embed/godmota/chat?darkpopout&parent=godmota.com&parent=localhost&parent=www.godmota.com"
                    height="520"
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals"
                    width="350">
                </iframe>
                </div>
            </div>
        </div> 
    )
}