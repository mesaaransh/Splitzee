import dateFormat from "dateformat";
function exportData(data){

    let temp = []

    for (let i = 0; i < data.length; i++) {
        const transaction = data[i];
        
        temp.push({
            date: dateFormat(transaction.date, 'dd mmmm yyyy'),
            description: transaction.description,
            financer: transaction.financer.name,
            members: transaction.members.map(member => member.name).join(", "),
            amount: transaction.amount
        })

    }

    return temp

}

export default exportData