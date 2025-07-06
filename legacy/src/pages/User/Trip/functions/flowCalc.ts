import { MemberFlow } from "../../../../schemas/memberflows";
import { Trip } from "../../../../schemas/trip";

function CurrUserFlows(trip: Trip, currentUserId: string): MemberFlow[] {
    const flowsMap: Record<string, MemberFlow> = {};

    trip.members.forEach(member => {
        if (member._id !== currentUserId) {
            flowsMap[member._id] = {
                memberId: member._id,
                name: member.name,
                inflow: 0,
                outflow: 0
            };
        }
    });

    for (const tx of trip.transactions) {
        const { amount, financer, members } = tx;
        const splitAmount = Math.round(amount / members.length);
        const userinMember = members.includes(currentUserId);

        if(!userinMember && financer !== currentUserId){
            continue;
        }

        if (userinMember) {
            if (financer === currentUserId) {
                for (const memberId of members) {
                    if (memberId == currentUserId) continue;
                    flowsMap[memberId].outflow += splitAmount;
                }
            }
            else {
                flowsMap[financer].inflow += splitAmount;
            }
        }
        else{
            for (const memberId of members) {
                flowsMap[memberId].outflow += splitAmount;
            }
        }
    }

    return Object.values(flowsMap);
}


export default CurrUserFlows