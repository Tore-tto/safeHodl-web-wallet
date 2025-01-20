import { useState } from "react";

export default function Receive(props:any) {
    const [address, setAddress] = useState<any>();
    
    return (
        <div>
            <div style={header}>
                <span style={arrow} onClick={() => props.isReceive(false)}>‹</span> {/* Back Arrow */}
                <h2 style={title}>Receive</h2>
                <p>{address}</p>
            </div>
        </div>
    );
}

// Styles

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