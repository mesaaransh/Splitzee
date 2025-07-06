import { MemberFlow } from "../../../../schemas/memberflows";
import { Trip } from "../../../../schemas/trip";

function calculateMemberFlows(trip: Trip): MemberFlow[] {
    const flowsMap: Record<string, MemberFlow> = {};
    trip.members.forEach(member => {
        flowsMap[member._id] = {
            memberId: member._id,
            name: member.name,
            inflow: 0,
            outflow: 0,
        };
    });

    for (const transaction of trip.transactions) {
        const { amount, financer, members } = transaction;
        const splitAmount = amount / members.length;

        const financerIsMember = members.includes(financer);
        members.forEach(memberId => {
            if(memberId === financer){
                return;
            }
            flowsMap[memberId].outflow += splitAmount;
        });

        const inflowCount = financerIsMember ? members.length - 1 : members.length;
        flowsMap[financer].inflow += splitAmount * inflowCount;
    }
    return Object.values(flowsMap);
}

export default calculateMemberFlows