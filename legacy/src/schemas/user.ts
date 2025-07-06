import Friend from "./friend"

export type User = {
    _id: string,
    name: string,
    email: string,
    gender: string,
    profilePhoto: string,
    phone: string,
    friends: Friend[],
    requests: string[]
}