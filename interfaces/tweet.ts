
export interface ITweet {
    _id: string;
    text: string;
    user: string;

    createdAt: string;

    views: string[]; //users id
    likes: string[]; //users id
    comments: string[]; //tweets id
    retweets: string[]; //users id
}