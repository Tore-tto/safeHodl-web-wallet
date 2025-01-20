import { useState } from "react";

export default function Send(props:any) {
    const [toAddress, setToAddress] = useState<any>();
    const [amount, setAmount] = useState<any>();
    const [balance, setBalance] = useState<number>(0);

    return (
        <div>
            {/* Header */}
            <div style={header}>
                <span style={arrow} onClick={() => props.isSend(false)}>‹</span> {/* Back Arrow */}
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
                        placeholder={props.currentCoin['name'] + ' Amount'}
                    />
                    <p> available: {balance}</p>
                    <button style={{ ...submitButton, backgroundColor: (toAddress && amount) ? '#8b6b99' : '#cfcad2' }} disabled={!(toAddress && amount)} onClick={(e) => { e.preventDefault() }}>Next</button>
                </form>
            </div>
        </div>
    );
}

// Styles
const transferContainer: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px',
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
    marginBottom: '20px'

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

const arrow: React.CSSProperties = {
    color: '#000',
    fontSize: '40px',
    cursor: 'pointer', // Indicates it's clickable
    marginRight: '10px',
    paddingRight: '10px'
};

const title: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 0 30px',
    flexGrow: 1,
    textAlign: 'left'
}

const header: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px dotted lavender',
    marginBottom: '20px',
}