import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineRetweet } from 'react-icons/ai';
import { BsPin } from 'react-icons/bs';

import { ITweet } from "../../interfaces"
import { UserContext } from '../../context/user';


interface Props {
    tweet: ITweet;
}


export const TweetMessage:FC<Props> = ({ tweet }) => {

    const { query } = useRouter();
    const { user } = useContext(UserContext);

    if( !user ) return <></>

    return (
    <>
        <div 
            className='w-full pl-10 flex items-center gap-x-2 text-gray-600 font-bold'
            style={{ display: tweet.retweets.includes(user._id || '') ? 'flex' : 'none' }}
        >
            <AiOutlineRetweet />
            <span>You Retweeted</span>
        </div>

        <div 
            className='w-full pl-10 flex items-center gap-x-2 text-gray-600 font-bold'
            style={{ display: user?.pined === tweet._id && query.username === user.username ? 'flex' : 'none' }}
        >
            <BsPin />
            <span>Pinned Tweet</span>
        </div>
    </>
    )
}