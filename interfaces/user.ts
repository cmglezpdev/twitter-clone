

export interface IUser {
    _id: string;
    name: string;
    username: string;
    email: string;
    bibliography: string;
    avatar: string;
    banner: string;

    tweets: string[];

    // ... other fields
    following: string[];
    followers: string[];
    joined: string;
}