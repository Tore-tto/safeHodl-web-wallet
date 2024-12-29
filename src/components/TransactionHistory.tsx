import React, { useState } from 'react';

function TransactionHistory(props: { transactions: any }) {
  const [expandedId, setExpandedId] = useState<String>("");

  const toggleExpand = (id: String) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <>
      {props.transactions.length > 0 ? (
        <ul style={listStyle}>
          {props.transactions.map((transaction: any) => (
            <li style={listItem} key={transaction.hash}>
              {/* Click handler moved to the <p> */}
              <p
                style={amount}
                onClick={() => toggleExpand(transaction.hash)}
              >
                <strong>{transaction.amount}</strong> ({transaction.type}) on {transaction.status}
              </p>

              {expandedId === transaction.hash && (
                <div style={expanded}>
                  <p>
                    <strong>Hash:</strong>
                    <a
                      href={`https://amoy.polygonscan.com/tx/${transaction.hash}`}
                      target="_blank" // Open in a new tab
                      rel="noopener noreferrer" // Security best practices
                    >{transaction.hash}</a>
                  </p>
                  <p>
                    <strong>To Address:</strong> {transaction.to}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found</p>
      )}
    </>
  );
}

//Style
const listStyle = {
  listStyle: 'none', // Remove bullets
  padding: 0,        // Remove padding
};
const amount = {
  color: 'darkgreen',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer', // Indicate it's clickable
};
const expanded = {
  backgroundColor: 'lightgreen',
  padding: '10px',
  borderRadius: '5px',
  marginTop: '10px',
};
const listItem = {
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

export default TransactionHistory;
