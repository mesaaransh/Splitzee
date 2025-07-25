function createUserLedger(tripData, currentUserId) {
  const ledger = [];

  for (const date in tripData.transactions) {
    const userTransactions = tripData.transactions[date]
      .filter(transaction =>
        transaction.members.some(member => member._id === currentUserId)
      )
      .map(transaction => ({
        description: transaction.description,
        amount: transaction.amount/transaction.members.length
      }));
      
    if (userTransactions.length > 0) {
      const total = userTransactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);

      ledger.push({
        date,
        total,
        subTransactions: userTransactions
      });
    }
  }

  return ledger;
}


function tripTotals(tripData){

    let user = JSON.parse(sessionStorage.getItem('userData'));
    return createUserLedger(tripData, user._id);

}

export default tripTotals