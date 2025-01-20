import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import setting from '../assets/setting.png';
import notification from '../assets/notification.png';
import home from '../assets/home.png';
import discover from '../assets/discover.png';
import bitcoinLogo from '../assets/bitcoin-logo.png';
import downArrow from '../assets/downarrow.png';
import upArrow from '../assets/uparrow.png';
function User() {
    const [isTransfer, setIsTransfer] = useState<Boolean>(false);
    const [isSend, setIsSend] = useState<Boolean>(false);
    const [isReceive, setIsReceive] = useState<Boolean>(false);
    const [toAddress, setToAddress] = useState<any>();
    const [amount, setAmount] = useState<any>();
   
    const [searchQuery, setSearchQuery] = useState<any>("");
    const [buyBDXDomain, setBuyBDXDomain] = useState<Boolean>(false);
    const [importToken, setImportToken] = useState<Boolean>(false);
    const [isHistory, setIsHistory] = useState<Boolean>(false);

    const [balance, setBalance] = useState<number>(0);
    const [currentCoin, setCurrentCoin] = useState<any>('');
    const location = useLocation();
    const {name,rawId,publicKeys} = location.state || {}; // Safely destructure state
    console.log(name,rawId,publicKeys);
    // Mock data for crypto items
    const cryptoItems = [
        { name: "BDX", desc: "Beldex", type: "COIN", price: "$0.0789", change: "-0.14%", icon: bitcoinLogo, color: "red" },
        { name: "POL", desc: "AmoyPolygon", type: "COIN", price: "$101,234", change: "-0.14%", icon: bitcoinLogo, color: "red" },
        { name: "ETH", desc: "ShepoliaEthereum", type: "COIN", price: "$3,200", change: "+1.25%", icon: bitcoinLogo, color: "green" },
        { name: "SAR", desc: "Sarvy", type: "TOKEN", price: "$0.89", change: "-2.56%", icon: bitcoinLogo, color: "red" },
        { name: "RON", desc: "Ronin", type: "TOKEN", price: "$0.0002124", change: "-10.23%", icon: bitcoinLogo, color: "red" },
    ];

    function processTransaction(index: any) {
        console.log(cryptoItems[index]);
        setCurrentCoin(cryptoItems[index])
        setIsTransfer(true);
    }

    function handleBackClick() {
        setIsTransfer(false);
    }
    return (
        <div className="container"> {(isTransfer && !(isSend||isReceive)) ?
         <div >
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
                    alt="downArrow Icon"  onClick={()=>setIsSend(true)}/>
                    <p>Send</p>
                </div>
                <div>
                    <img src={upArrow}
                        style={transferIcon}
                        alt="upArrow Icon" onClick={()=>setIsReceive(true)}/>
                    <p>Receive</p>
                </div>
            </div>
            <div style={history}>
                <p>history</p>
            </div>

        </div> :<>
        {!(isSend||isReceive) && 
            <div style={containerStyle}>
                <div style={mainContents}>
                    {/* Header section*/}
                    <div style={header}>
                        <img src={setting}
                            style={Icon}
                            alt="Settings Icon" />
                        <h3>{name}</h3>
                        <img src={notification}
                            style={Icon}
                            alt="Notification Icon" />
                    </div>

                    {/* Search token section*/}
                    <div style={searchContainer}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={searchInput}
                        />
                        <span style={searchIcon}>🔍</span>
                    </div>

                    {/* Buy BDX domain section and import token*/}
                    <div style={tokenContainer}>
                        <button style={button} onClick={() => { setBuyBDXDomain(true) }}>Buy BDX Domain</button>
                        <button style={button} onClick={() => { setImportToken(true) }}>Import Token</button>
                    </div>

                    {/* Crypto and History section*/}
                    <div style={cryptoHistoryContainer}>
                        <div style={cryptoHistoryHeader}>
                            <p style={{ ...cryptSec, borderBottom: isHistory ? 'none' : '2px solid black' }} onClick={() => { setIsHistory(false); }}>Crypto</p>
                            <p style={{ ...historySec, borderBottom: isHistory ? '2px solid black' : 'none' }} onClick={() => { setIsHistory(true); }}>History</p>
                        </div>
                        <div style={cryptoHistory}>
                            {!isHistory ? <div style={cryptoListContainer}>
                                {cryptoItems.map((item, index) => (
                                    <div key={index} style={cryptoCardStyle} onClick={() => { processTransaction(index) }}>
                                        <img src={item.icon} style={cryptoIconStyle} alt={item.name} />
                                        <div>
                                            <strong>{item.name}</strong>
                                            <p>{item.desc}</p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <strong>{item.price}</strong>
                                            <p style={{ color: item.color }}>{item.change}</p>
                                        </div>
                                    </div>
                                ))}
                            </div> : <div>
                                <p>history</p>
                            </div>
                            }
                        </div>

                    </div>
                </div>
                {/* Footer section*/}
                <div style={footerContainer}>
                    <img src={home}
                        style={Icon}
                        alt="home Icon" />
                    <img src={discover}
                        style={Icon}
                        alt="discover Icon" />
                </div>
            </div>
        }

        {isSend && <>
            {/* Header */}
            <div style={header}>
                    <span style={arrow} onClick={()=>setIsSend(false)}>‹</span> {/* Back Arrow */}
                    <h2 style={title}>Send</h2>
                </div>
            
            {/* Tramsfer Section */}
          <div style={transferContainer}>
            <form style={addressContainer}>
              <input
                style={inputField}
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="Address or Domain Name"
              />
              <input
                style={inputField}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={currentCoin['name']+ ' Amount'}
              />
              <p> available: {balance}</p>
              <button style={{...submitButton,  backgroundColor: (toAddress && amount) ? '#8b6b99' : '#cfcad2'}} disabled={name.length < 4} onClick={(e)=>{e.preventDefault()}}>Next</button>
            </form>
          </div>
        </>
        }

        {isReceive &&        
        <div style={header}>
                <span style={arrow} onClick={()=>setIsReceive(false)}>‹</span> {/* Back Arrow */}
                <h2 style={title}>Receive</h2>
                <p>{address}</p>
            </div>}
            </>
        }
        </div>
    )

}

// Styles
const transferContainer: React.CSSProperties = {
  textAlign: 'left',
  padding:'10px',
//   lineHeight:'80px',
}

const addressContainer: React.CSSProperties = {
  width: '100%',
};

const inputField: React.CSSProperties = {
  paddingLeft: '15px',
  width: '100%',
  height: '55px',
  fontSize: '15px',
  boxSizing: 'border-box', // Ensure padding doesn't exceed width
  outline: 'none', // Prevents blue border
  marginBottom:'20px'

};

const submitButton: React.CSSProperties = {
  width: '100%',
  padding: '15px 0',
  borderRadius: '27px',
  fontSize: '20px',
  backgroundColor: '#e9ecef',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px', // Add space between input and button
  outline: 'none', // Prevents blue border
};
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

const title : React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 0 30px',
    flexGrow: 1,
    textAlign: 'left'
}

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight:'100vh'
};

const mainContents = {
    flex: 1, // Pushes footer to the bottom
}
const footerContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    backgroundColor: '#f8f8f8',
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #ccc',
}

const cryptoHistoryContainer: React.CSSProperties = {
}

const cryptSec: React.CSSProperties = {
    width: '100%',
    paddingBottom: '15px'
}

const historySec: React.CSSProperties = {
    width: '100%',
    paddingBottom: '15px'
}

const cryptoHistory: React.CSSProperties = {
    textAlign: 'left',
    minHeight:'60vh'
}

const cryptoHistoryHeader: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px',
    padding: '0 30px',
}
const header: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px dotted lavender',
    marginBottom: '20px',
}

const Icon: React.CSSProperties = {
    width: '30px',
    // borderRadius: '10px' 
}

const searchContainer: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: '20px',
    marginBottom: '20px',
    border: '2px dotted lavender',

};

const searchInput = {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '30px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '16px',
    paddingLeft: '40px', // Add space for the search icon
};

const searchIcon: React.CSSProperties = {
    position: 'absolute',
    left: '15px',
    fontSize: '18px',
    color: '#888',
};

const tokenContainer: React.CSSProperties = {
    display: 'flex',
    alignItems: 'left',
    margin: '20px',
    justifyContent: 'space-between',
    marginBottom: '20px',
    border: '2px dotted lavender',

};
const cryptoListContainer: React.CSSProperties = {
    // marginBottom: "30px",
    overflowY: 'auto',
    height: '550px'
};

const cryptoCardStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    margin: "10px 0",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    fontSize: '13px',
};

const cryptoIconStyle: React.CSSProperties = {
    width: "30px",
    height: "30px",
    marginRight: "10px",
    backgroundColor: "#8b6b99",
    borderRadius: "50px",
    padding: '5px'
};

const button: React.CSSProperties = {
    backgroundColor: '#8b6b99',
    color: '#fff',
    width: '30%',
    outline: 'none',
    borderRadius: '50px'
}
export default User;