import { FC } from 'react';

import { AiOutlineRetweet } from 'react-icons/ai';
import { BsPin } from 'react-icons/bs';

import { ITweet, IUser } from "../../interfaces"


interface Props {
    user: IUser | null | undefined;
    tweet: ITweet;
}


export const TweetMessage:FC<Props> = ({ user, tweet }) => {

    if( !user ) return <></>

    return (
    <>
        <div 
            className='w-full pl-10 flex items-center gap-x-2 text-gray-600 font-bold'
            style={{ display: tweet.retweets.includes(user?._id || '') ? 'flex' : 'none' }}
        >
            <AiOutlineRetweet />
            <span>You Retweeted</span>
        </div>

        <div 
            className='w-full pl-10 flex items-center gap-x-2 text-gray-600 font-bold'
            style={{ display: user?.pined === tweet._id ? 'flex' : 'none' }}
        >
            <BsPin />
            <span>Pinned Tweet</span>
        </div>
    </>
    )
}