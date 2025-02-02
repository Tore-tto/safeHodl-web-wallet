import { useState } from 'react';

function TransactionHistory(props: { transactions: any[]; currentCoinType: any }) {
  const [expandedId, setExpandedId] = useState<string>("");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <>
      {props.transactions.length > 0 ? (
        <ul style={listStyle}>
          {props.transactions
            .filter((transaction) => transaction.type === props.currentCoinType) // Filter transactions first
            .map((transaction) => (
              <li style={listItem} key={transaction.hash}>
                <p
                  style={{
                    ...amount,
                    color: transaction.status === "OnChain" ? "darkgreen" : "red",
                  }}
                  onClick={() => toggleExpand(transaction.hash)}
                >
                  <strong>{transaction.amount}</strong> ({transaction.type}) on {transaction.status}
                </p>

                {expandedId === transaction.hash && (
                  <div
                    style={{
                      ...expanded,
                      backgroundColor: transaction.status === "OnChain" ? "lightgreen" : "#fc9781",
                    }}
                  >
                    <p>
                      <strong>Hash:</strong>{" "}
                      <a
                        href={`https://amoy.polygonscan.com/tx/${transaction.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {transaction.hash}
                      </a>
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

// Styles
const listStyle = {
  listStyle: "none",
  padding: 0,
};
const amount = {
  color: "darkgreen",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};
const expanded = {
  backgroundColor: "lightgreen",
  padding: "10px",
  borderRadius: "5px",
  marginTop: "10px",
};
const listItem = {
  marginBottom: "10px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

export default TransactionHistory;
