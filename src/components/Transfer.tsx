import { useState } from 'react';

import Send from './Send'
import Receive from './Receive';

import notification from '../assets/notification.png';
import discover from '../assets/discover.png';
import downArrow from '../assets/downarrow.png';
import upArrow from '../assets/uparrow.png';

export default function Transfer(props: any) {
    const currentCoin = props.currentCoin;
    const handleBackClick = props.handleBackClick;
    const [balance, setBalance] = useState<number>(0);

    const [isSend, setIsSend] = useState<Boolean>(false);
    const [isReceive, setIsReceive] = useState<Boolean>(false);

    return (
        <>
            {!(isSend || isReceive) &&
                <div>
                    <div style={tokenheader}>
                        <span style={arrow} onClick={handleBackClick}>‹</span> {/* Back Arrow */}
                        <div style={tokenContent}>
                            <h3> {currentCoin["name"]} </h3>
                            <p> {currentCoin["type"]} | {currentCoin["desc"]} </p>
                        </div>
                        <img src={notification}
                            style={Icon}
                            alt="Notification Icon" />
                        <img src={discover}
                            style={Icon}
                            alt="Discover Icon" />
                    </div>
                    <div style={coinInfo}>
                        <h2> {currentCoin["name"]} </h2>
                        <p>{balance} {currentCoin["name"]}</p>
                    </div>
                    <div style={transferButtons}>
                        <div><img src={downArrow}
                            style={transferIcon}
                            alt="downArrow Icon" onClick={() => setIsSend(true)} />
                            <p>Send</p>
                        </div>
                        <div>
                            <img src={upArrow}
                                style={transferIcon}
                                alt="upArrow Icon" onClick={() => setIsReceive(true)} />
                            <p>Receive</p>
                        </div>
                    </div>
                    <div style={history}>
                        <p>history</p>
                    </div>
                </div>
            }
            {isSend && <><Send currentCoin= {currentCoin} isSend={(e:boolean)=>{setIsSend(e)}}/></>
            }
            {isReceive && <><Receive isReceive={(e:boolean)=>{setIsReceive(e)}}/></>}
        </>
    );
}

//Transaction styles
const tokenheader: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px dotted lavender',
    backgroundColor: '#fff',
    height: '75px',
    marginBottom: '10px'
}
const tokenContent: React.CSSProperties = {
    lineHeight: '10px',
    textAlign: 'left',

}
const coinInfo: React.CSSProperties = {
    border: '1px solid black',
    borderRadius: '15px',
    height: '120px',
    marginBottom: '10px'
}
const transferButtons: React.CSSProperties = {
    marginTop: '30px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
    lineHeight: '10px',
    borderBottom: '1px solid #cfcad2'
}
const transferIcon: React.CSSProperties = {
    backgroundColor: '#cfcad2',
    padding: '15px',
    borderRadius: '50px'
}
const history: React.CSSProperties = {

}

const arrow: React.CSSProperties = {
    color: '#000',
    fontSize: '40px',
    cursor: 'pointer', // Indicates it's clickable
    marginRight: '10px',
    paddingRight: '10px'
};

const Icon: React.CSSProperties = {
    width: '30px',
    // borderRadius: '10px' 
}