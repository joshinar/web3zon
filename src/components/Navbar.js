import React from 'react';

const Navbar = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
  };
  return (
    <div
      style={{
        background: '#000',
      }}
    >
      <nav
        style={{
          background: 'transparent',
          display: 'flex',
          width: '90%',
          margin: 'auto',
          justifyContent: 'space-between',
          padding: '10px 5px',
        }}
      >
        <h2 style={{ color: '#fff' }}>Web3Zon</h2>
        <button
          style={{
            border: 'none',
            padding: '10px',
            width: '10%',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: '#f3ca18',
          }}
          onClick={() => connectHandler()}
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(38)}`
            : 'Connect'}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
