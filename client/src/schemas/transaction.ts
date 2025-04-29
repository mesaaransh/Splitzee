export type Transaction = {
    _id: string,
    date: string;
    description: string;
    amount: number
    members: string[];
    financer: string,
    trip: string
}