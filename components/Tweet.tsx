import { FC, useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import useSWR from 'swr';

import { CiViewBoard } from 'react-icons/ci'
import { TbMessageCircle2 } from 'react-icons/tb'
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoShareOutline } from 'react-icons/io5'

import { twitterApi } from '../api';
import { ITweet, IUser } from '../interfaces'
import { AuthContext } from '../context/auth';

import img from '../public/avatar.png'

interface Props {
    tweet: ITweet;
}

export const Tweet:FC<Props> = ({ tweet }) => {

    const [tweetContent, setTweetContent] = useState<ITweet>(tweet);
    const [{ username, name }, setUser ] = useState<IUser>({} as IUser);
    const { user } = useContext(AuthContext);

    const { _id, user: userId, likes, retweets, comments, views, text } = tweetContent;
    const { data } = useSWR(`api/tweets/${_id}`, { refreshInterval: 10000 });

    useEffect(() => {
        twitterApi.get(`/users/${userId}`)
            .then(({data}) => setUser(data));
    }, [userId]);

    useEffect(() => {
        if( data )
            setTweetContent(data);
    }, [data])

    if( !username || !tweet ) return <h1>Loading</h1>;


    const onReaction = async( type: string ) => {
        switch( type ) {
            case 'like':
                const { data: { likes } } = await twitterApi.put('/tweets/like', { tweetId: _id, userId: user?._id || '' });
                setTweetContent({
                    ...tweetContent,
                    likes
                })
                break;

            case 'retweet':
                const{ data: { retweets } } = await twitterApi.put('/tweets/retweet', { tweetId: _id, userId: user?._id || '' });
                setTweetContent({
                    ...tweetContent,
                    retweets
                })
                break;

            default:
                break;
        }
    }

    return (
        <div className='w-full flex hover:bg-gray-100 cursor-pointer border-b-2 border-b-gray-200'>
            <div className='p-2'>
                <Link href={`/${ username }`}>
                    <Image src={img} alt='avatar' width={150} height={150} className='rounded-full' />
                </Link>
            </div>
            <div className='p-2'>
                <Link href={`/${ username }`}>
                    <p className='flex'>
                        <span className='mr-1 font-bold hover:underline'>{ name }</span>
                        <span className='text-gray-700'>@{ username }</span>
                    </p>
                </Link>

                <p>{ text }</p>
                
                <div className='flex justify-start'>
                    <span className='flex items-center mt-3 mr-10 text-gray-700 hover:text-blue-600 group transition-colors'>
                        <span className='group-hover:bg-blue-200 rounded-full p-2'>
                            <CiViewBoard className='text-xl font-light' />
                        </span>
                        <span>{ views.length }</span>
                    </span>
                    <span className='flex items-center mt-3 mr-10 text-gray-700 hover:text-blue-600 group transition-colors'>
                        <span className='group-hover:bg-blue-200 rounded-full p-2'>
                            <TbMessageCircle2 className='text-xl font-light' />
                        </span>
                        <span>{ comments.length }</span>
                    </span>

                    <span 
                        className='flex items-center mt-3 mr-10 text-gray-700 hover:text-green-600 group transition-colors'
                        onClick={() => onReaction('retweet')}
                    >
                        <span className='group-hover:bg-green-200 rounded-full p-2'>
                            <AiOutlineRetweet 
                                className='text-xl font-light' 
                                style={{ color: retweets.includes(user?._id || '') ? 'green' : '' }}
                            />
                        </span>
                        <span style={{ color: retweets.includes(user?._id || '') ? 'green' : '' }}>{ retweets.length }</span>
                    </span>

                    <span 
                        className='flex items-center mt-3 mr-10 text-gray-700 hover:text-red-600 group transition-colors'
                        onClick={() => onReaction('like')}
                    >
                        <span className='group-hover:bg-red-200 rounded-full p-2'>
                            {
                                likes.includes(user?._id || '')
                                    ? ( <AiFillHeart className='text-xl font-light text-red-600' /> )
                                    : ( <AiOutlineHeart className='text-xl font-light' /> )
                            }
                        </span>
                        <span style={{ color: likes.includes(user?._id || '')? 'red' : '' }}>{ likes.length }</span>
                    </span>

                    <span className='hover:bg-blue-200 rounded-full p-2 mt-3 mr-10'>
                        <IoShareOutline className='text-xl text-gray-700 hover:text-blue-600 transition-colors' />
                    </span>
                </div>
            </div>
        </div>
    )
}
