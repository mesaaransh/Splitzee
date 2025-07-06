import { Transaction } from "./transaction";
import { User } from "./user";

export type Trip = {
    _id: string;
    startDate: string;
    owner: string;
    transactions: Transaction[];
    members: User[];
};