import React from "react";
import { useNavigate } from "react-router-dom";

import { startAuthentication } from "@simplewebauthn/browser";

import elliptic from "elliptic";
import { v4 as uuidv4 } from "uuid";

const EC = elliptic.ec;
const ec = new EC("p256");


function Login() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/'); // Absolute path ensures proper navigation
    };

    const getPubkeys = async(id:string): Promise<any> =>{
        // check the wallet key is present in the contract or not.
        // if it is not present then call login server to get the keys.
        const payload = { rawId: id };
        console.log("Login payload:", payload);
        try {
            const response = await fetch("https://userapi.beldex.dev/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const result = await response.json(); // Parse the JSON response
            return result;
        } catch (error) {
            console.error("Error:", error);
            alert("wallet is not exist");
            throw error;
        }
    }

    const handleLoginClick = async() => {
        const challenge = uuidv4();
        const authData = await startAuthentication({
            rpId: window.location.hostname,
            challenge: challenge,
            userVerification: "required",
            // authenticatorType: "both",
            // timeout: 60000,
        });
        console.log('authData of the user:',authData);
        const response = await getPubkeys(authData.rawId);
        
        const publicKey = [
            response.data.pubkeyX,
            response.data.pubkeyY,
        ];
        console.log({publicKey});
        if(publicKey.length > 0){
            const data = {name:response.data.name, rawId:authData.rawId, publicKeys:publicKey};
            navigate(`/User/${response.data.name}`, { state: data });
        }
    };

    return(
        <div className='container'>
            {/* Header */}
            <div style={header}>
                <span style={arrow} onClick={handleBackClick}>‹</span> {/* Back Arrow */}
                <h2 style={title}>Add existing wallet</h2>
            </div>
            
            {/* List Section */}
            <div>
                <ul style={list}>
                    <li style={listItem} onClick={handleLoginClick}>
                        <div style={option}>
                            <div style={iconContainer}>
                                <span style={newWalletIcon}>✨</span>
                            </div>
                            <div style={textContainer}>
                                <h2 style={subtitle}>SafeHodl</h2>
                                <p style={paragraph}>Use face ID or fingerprint</p>
                            </div>
                                <span style={arrow}>›</span>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div>

            </div>


        </div>
    );

}

const header : React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
}

const arrow : React.CSSProperties = {
    color: '#000',
    fontSize: '20px',
    cursor: 'pointer', // Indicates it's clickable
    marginRight: '10px',
}
const title : React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 0 30px',
    flexGrow: 1,
    textAlign: 'left'
}
const subtitle : React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
}

const paragraph: React.CSSProperties = {
    fontSize: '14px',
    margin: '0',
}

const list : React.CSSProperties = {
    listStyle: 'none', // Remove bullets
    padding: '0',
}

const listItem : React.CSSProperties = {
    marginBottom: '15px',
    padding: '15px',
    backgroundColor: '#bfc9ca',
    borderRadius: '5px',
}

const option : React.CSSProperties = {
    textAlign: 'left',
    display: 'flex',

}

const iconContainer : React.CSSProperties = {
    backgroundColor: '#8b6b99',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
}

const newWalletIcon : React.CSSProperties = {
    color: '#121212',
    fontSize: '20px',
}

const textContainer : React.CSSProperties = {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: '20px',
}
export default Login;