

export interface IUser {
    _id          : string;
    name         : string;
    username     : string;
    email        : string;
    password?    : string;
    bio?         : string;
    avatar?      : string;
    banner?      : string;
    location?    : string;
    website?     : string;
    birth?       : string;

    tweets       : string[];
    retweets     : string[];

    // ... other fields
    following    : string[];
    followers    : string[];
    createdAt    : string;
    updatedAt    : string;
}