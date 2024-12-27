import { openDB } from 'idb';

// Initialize IndexedDB
const initDB = async () => {
  const db = await openDB('TransactionDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('transactions')) {
        const store = db.createObjectStore('transactions', {
          keyPath: ['userId', 'hash'], // Composite key: userId + hash
        });
        store.createIndex('userId', 'userId'); // Index for querying by userId
      }
    },
  });
  return db;
};

// Save a transaction for a specific user
export async function saveTransaction(userId:any, tx:any) {
  const db = await initDB();
  await db.put('transactions', { userId, ...tx });
}

// Get all transactions for a specific user
export async function getAllTransactions(userId:any):Promise<any> {
  const db = await initDB();
  const tx = db.transaction('transactions', 'readonly');
  const store = tx.objectStore('transactions');
  const index = store.index('userId');

  console.log({index});
  const result = [];
  let cursor = await index.openCursor(userId); // Query by userId
  console.log({cursor});
  while (cursor) {
    result.push(cursor.value); // Add transaction to the result array
    cursor = await cursor.continue();
  }
  return result;
}

// Clear all transactions for a specific user
export async function clearTransactions(userId:any) {
  const db = await initDB();
  const tx = db.transaction('transactions', 'readwrite');
  const store = tx.objectStore('transactions');

  let cursor = await store.index('userId').openCursor(userId); // Query by userId
  while (cursor) {
    await store.delete(cursor.primaryKey); // Delete by composite key
    cursor = await cursor.continue();
  }
}
