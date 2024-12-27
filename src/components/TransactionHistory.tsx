import React, { useEffect, useState } from 'react';

function TransactionHistory(props: { transactions:any }) {
    return(
        <>
            {props.transactions.length > 0 ? (
        <ul>
          {props.transactions.map((transaction:any) => (
            <li>
                <p>{transaction.hash}</p>
              <strong>{transaction.amount}</strong> ({transaction.type}) on {transaction.status}
              {/* <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found</p>
      )}
        </>
    )
}

export default TransactionHistory;