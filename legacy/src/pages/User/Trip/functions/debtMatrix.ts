import { DebtMatrix } from "../../../../schemas/debtMatrix";
import { Trip } from "../../../../schemas/trip";

export default function generateDebtMatrix(trip: Trip): DebtMatrix {
    const memberIds = trip.members.map(m => m._id);
    const memberNames = trip.members.map(m => (m.name));

    const indexMap: Record<string, number> = {};
    memberIds.forEach((id, index) => {
        indexMap[id] = index;
    });

    const size = memberIds.length;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (const transaction of trip.transactions) {
        const { amount, financer, members } = transaction;
        const splitAmount = Math.round(amount / members.length);

        for (const memberId of members) {
            if (memberId !== financer) {
                const payerIndex = indexMap[memberId];
                const receiverIndex = indexMap[financer];

                matrix[payerIndex][receiverIndex] += splitAmount;
                matrix[receiverIndex][payerIndex] -= splitAmount;
            }
        }
    }

    return {
        rows: memberNames,
        columns: memberNames,
        matrix,
    };
}
