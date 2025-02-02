import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
  platformAuthenticatorIsAvailable,
  startRegistration,
} from "@simplewebauthn/browser";
// @ts-ignore
import elliptic from "elliptic";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import * as cbor from "../utils/cbor";
import {
  parseAuthData,
} from "../utils/helpers";
const EC = elliptic.ec;
const ec = new EC("p256");

export enum COSEKEYS {
  kty = 1,
  alg = 3,
  crv = -1,
  x = -2,
  y = -3,
  n = -1,
  e = -2,
}
function Create() {
  const navigate = useNavigate();

  const [isCreateInfo, setIsCreateInfo] = useState<Boolean>(true);
  const [isCreate, setIsCreate] = useState<Boolean>(false);

  const [username, setUsername] = useState<any>("");

  const handleBackClick = () => {
    navigate('/'); // Absolute path ensures proper navigation
  };

  const handleIsCreateInfoClick = () => {
    setIsCreateInfo(true);
    setIsCreate(false);
  }

  const storePubkey = async (publicKey : any , publicKeyCredential : any) =>{

    const payload = { name: username, rawId: publicKeyCredential.id, X : publicKey[0], Y : publicKey[1]};
    console.log("signUp payload:", payload);

    try {
        const response = await fetch("https://safehodl.beldex.dev/api/auth/signup", {
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
        throw error;
    }

  }

  function _generateRandomBytes() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return array;
  }

  const createPassKey = async () => {
    const supportsWebAuthn = browserSupportsWebAuthn();
    const supportsWebAuthnAutofill = await browserSupportsWebAuthnAutofill();
    const platformAuthenticatorAvailable = await platformAuthenticatorIsAvailable();

    console.log(
    `Browser supports WebAuthn: ${supportsWebAuthn}
    Browser supports WebAuthn Autofill: ${supportsWebAuthnAutofill}
    Platform Authenticator available: ${platformAuthenticatorAvailable}`
    );

    const platform = platformAuthenticatorAvailable
      ? "platform"
      : "cross-platform";

    const challenge = uuidv4();
    console.log(
    `platform: ${platform}
    challenge: ${challenge}`);
    
    const obj = {
      rp: {
        name: 'SafeHodlWallet/passkey-login',
        id: window.location.hostname,
      },
      user: {
        id: _generateRandomBytes(),
        name: username,
        displayName: username,
      },
      challenge: challenge,
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      attestation: "direct",
      timeout: 60000,
      authenticatorSelection: {
        requireResidentKey: true,
        userVerification: "required", // Webauthn default is "preferred"
        authenticatorAttachment: platform,
      },
    };
    console.log("registration options", obj);

    const publicKeyCredential = await startRegistration(obj as any);
    console.log({publicKeyCredential});

    const attestationObject = base64url.toBuffer(
    publicKeyCredential.response.attestationObject
    );
    const authData = cbor.decode(attestationObject.buffer, undefined, undefined)
    .authData as Uint8Array;

    let authDataParsed = parseAuthData(authData);

    let pubk = cbor.decode(
    authDataParsed.COSEPublicKey.buffer,
    undefined,
    undefined
    );

    const x = pubk[COSEKEYS.x];
    const y = pubk[COSEKEYS.y];

    const pk = ec.keyFromPublic({ x, y });

    const publicKey = [
    "0x" + pk.getPublic("hex").slice(2, 66),
    "0x" + pk.getPublic("hex").slice(-64),
    ];
    console.log({ publicKey });
    const response = await storePubkey(publicKey, publicKeyCredential);
    console.log({response});

    if(publicKey.length > 0 && publicKeyCredential.id){
        const data = {name:username, rawId:publicKeyCredential.id, publicKeys:publicKey};
        navigate(`/User/${username}`, { state: data });
    }
  }
  return (
    <div className="container">
      {(isCreateInfo && !isCreate) &&
        <div>
          {/* Header */}
          <div style={header}>
            <span style={arrow} onClick={handleBackClick}>‹</span> {/* Back Arrow */}
            <div style={subheader}>
              <h2 style={title}>SafeHodl</h2>
              <button style={button} onClick={() => { setIsCreate(true) }}>Create</button>
            </div>
          </div>

          {/* List Section */}
          <div>
            <ul style={list}>
              <li style={listItem}>
                <div style={textContainer}>
                  <h2 style={subtitle}>Security</h2>
                  <p style={paragraph}>
                    Create and recover wallets with Face ID or fingerprint. This is done automatically with your device's passkey.
                  </p>
                </div>
              </li>
              <li style={listItem}>
                <div style={textContainer}>
                  <h2 style={subtitle}>Transactions</h2>
                  <p style={paragraph}>
                    Transactions are available on 8 EVM networks (chains) currently but complete in fewer, simpler steps.
                  </p>
                </div>
              </li>
              <li style={listItem}>
                <div style={textContainer}>
                  <h2 style={subtitle}>Fees</h2>
                  <p style={paragraph}>
                    Pay network fees (gas) with any of our 15+ tokens. Regardless of the transaction network, you can pay this fee with any token that has enough balance.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      }
      {isCreate &&
        <div>
          {/* Header */}
          <div style={{...header}}>
            <span style={arrow} onClick={handleIsCreateInfoClick}>‹</span> {/* Back Arrow */}
            <div style={{ ...subheader, marginLeft: '30px' }}>
              <h2 style={title}>Set Wallet Name</h2>
            </div>
          </div>

          {/* Wallet Section */}
          <div style={walletContainer}>
            <form style={nameContainer}>
              <input
                style={nameField}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Wallet name"
              />
              <p style={notes}>Wallet name should be between 4 to 12 characters</p>
              <button style={{...submitButton,  backgroundColor: username.length >= 4 ? '#8b6b99' : '#e9ecef'}} disabled={username.length < 4} onClick={(e)=>{e.preventDefault();createPassKey()}}>Submit</button>
            </form>
          </div>

        </div>
      }
    </div>
  );
}

// Styles

const header: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
};

const arrow: React.CSSProperties = {
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer', // Indicates it's clickable
  marginRight: '10px',
};

const subheader: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexGrow: 1,
};

const title: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const button: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '14px',
  color: '#fff',
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const list: React.CSSProperties = {
  listStyle: 'none', // Remove bullets
  padding: '0',
};

const listItem: React.CSSProperties = {
  marginBottom: '15px',
  padding: '15px',
  backgroundColor: '#e9ecef',
  borderRadius: '5px',
};

const textContainer: React.CSSProperties = {
  textAlign: 'left',
};

const subtitle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 5px 0',
};

const paragraph: React.CSSProperties = {
  fontSize: '14px',
  margin: '0',
};

const walletContainer: React.CSSProperties = {
  textAlign: 'left',
  padding:'10px',
}

const nameContainer: React.CSSProperties = {
  width: '100%',  
};

const nameField: React.CSSProperties = {
  paddingLeft: '15px',
  width: '100%',
  height: '40px',
  fontSize: '15px',
  boxSizing: 'border-box', // Ensure padding doesn't exceed width
  outline: 'none', // Prevents blue border

};

const notes: React.CSSProperties = {
  paddingLeft:'15px'
}

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

export default Create;
