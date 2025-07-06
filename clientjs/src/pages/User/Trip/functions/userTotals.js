function userTotals(trip){

    let userData = JSON.parse(sessionStorage.getItem('userData'))
    let totals = {}    

    for (let i = 0; i < trip.members.length; i++) {
        const member = trip.members[i];
        totals[member._id] = {
            name: member.name,
            total: 0
        }
    }

    for (let i = 0; i < trip.transactions.length; i++) {
        
        const transaction = trip.transactions[i];
        const isPresent = transaction.members.some((m) => m._id === userData._id);
        
        const share = transaction.amount/transaction.members.length;
        
        if(isPresent){
            if(transaction.financer._id == userData._id){
                for (let j = 0; j < transaction.members.length; j++) {
                    const memberId = transaction.members[j]._id;
                    totals[memberId].total += share;                    
                }
            }
            else{
                totals[transaction.financer._id].total -= share;
            }
        }
        
    }
    
    let ans = []
    Object.keys(totals).map((key) => {
        if(key == userData._id) return;
        totals[key].total = Math.round(totals[key].total * 100)/100
        ans.push(totals[key])
    });

    return ans

}

export default userTotals