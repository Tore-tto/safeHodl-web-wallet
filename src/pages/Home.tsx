import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const createClick = () => {
    navigate('/Create');
  };

  const loginClick = () => {
    navigate('/Login');
  };

  return (
    <div className='container'>
      <h1 style={header}>Join 70M+ people shaping the future of the internet with us</h1>

      {/* Create New Wallet Option */}
      <div style={option} onClick={createClick}>
        <div style={iconContainer}>
          <span style={newWalletIcon}>✨</span>
        </div>
        <div style={textContainer}>
          <p style={title}>Create new wallet</p>
          <p style={subtitle}>safehodl passkey wallet</p>
        </div>
        <span style={arrow}>›</span>
      </div>

      {/* Add Existing Wallet Option */}
      <div style={option} onClick={loginClick}>
        <div style={iconContainer}>
          <span style={existingWalletIcon}>⬇️</span>
        </div>
        <div style={textContainer}>
          <p style={title}>Add existing wallet</p>
          <p style={subtitle}>restore with passkey</p>
        </div>
        <span style={arrow}>›</span>
      </div>
    </div>
  );
}

// Styles

const header: React.CSSProperties = {
  fontSize: '30px',
  fontWeight: 500,
  marginBottom: '50px',
};

const option: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#bfc9ca',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '15px',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const iconContainer: React.CSSProperties = {
  backgroundColor: '#8b6b99',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
};

const newWalletIcon: React.CSSProperties = {
  color: '#121212',
  fontSize: '20px',
};

const existingWalletIcon: React.CSSProperties = {
  color: '#121212',
  fontSize: '20px',
};

const textContainer: React.CSSProperties = {
  flexGrow: 1,
  textAlign: 'left',
};

const title: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  margin: '0',
};

const subtitle: React.CSSProperties = {
  fontSize: '12px',
  color: '#000000',
  margin: '0',
};

const arrow: React.CSSProperties = {
  color: '#000000',
  fontSize: '20px',
};

export default Home;
