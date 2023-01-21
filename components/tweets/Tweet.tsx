import { FC, useState, useEffect, useContext, MouseEvent } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import useSWR from 'swr';

import { CiViewBoard } from 'react-icons/ci';
import { TbMessageCircle2 } from 'react-icons/tb';
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsPinAngle, BsPin } from 'react-icons/bs';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl'

import { twitterApi } from '../../api';
import { ITweet, IUser } from '../../interfaces';
import { AuthContext } from '../../context/auth';
import { UserContext } from '../../context/user';
import { dates } from '../../services';
import { BasicModal } from '../modals';

import img from '../../public/avatar.png';
import { Loader } from '../spinners';
import { TweetMessage } from './TweetMessage';

interface Props {
    tweet: ITweet;
}

export const Tweet:FC<Props> = ({ tweet }) => {

    const [tweetContent, setTweetContent] = useState<ITweet>(tweet);
    const [{ username, name }, setUser ] = useState<IUser>({} as IUser);
    const { user } = useContext(AuthContext);
    const { pinTweet, user: GUser, onFollowUser } = useContext(UserContext)
    const [openMiniModal, setOpenMiniModal] = useState(false);
    const [settingsPosition, setSettingsPosition] = useState({ posX: 0, posY: 0 })


    const { _id, user: userId, likes, retweets, comments, views, text, createdAt } = tweetContent;
    const { data } = useSWR(`api/tweets/${_id}`, { refreshInterval: 10000 });

    useEffect(() => {
        twitterApi.get(`/users/${userId}`)
            .then(({data}) => setUser(data));
    }, [userId]);

    useEffect(() => {
        if( data )
            setTweetContent(data);
    }, [data])

    if( !username || !tweet )
        return (
            <div className='border-2 border-gray-200 mb-1 w-full h-32 flex justify-center items-center'>
                <Loader />
            </div>
        )

    const onOpenSettings = (e: MouseEvent<HTMLDivElement>) => {
        const { pageX, pageY } = e; 
        setSettingsPosition({ posX: pageX, posY: pageY });
        setOpenMiniModal(true);
    }
    
    const onCloseSettings = () => {
        setSettingsPosition({ posX: 0, posY: 0 });
        setOpenMiniModal(false);
    }

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
        <div className='w-full hover:bg-gray-100 cursor-pointer border-b-2 border-b-gray-200'>
            
            <TweetMessage tweet={tweet} />

            <div className='flex'>
                <div className='p-2'>
                    <Link href={`/${ username }`}>
                        <Image 
                            src={img} alt='avatar' 
                            width={50} height={50} 
                            className='rounded-full' 
                            style={{ minWidth: 50, minHeight: 50 }}
                        />
                    </Link>
                </div>
                <div className='p-2 w-full'>
                    <div className='flex justify-between'>
                        <Link href={`/${ username }`}>
                            <p className='flex gap-x-2'>
                                <span className='font-bold hover:underline'>{ name }</span>
                                <span className='text-gray-700'>@{ username }</span>
                                &bull;
                                <span>{ dates.formatDistance( createdAt ) }</span>
                            </p>
                        </Link>

                        <div 
                            className='p-2 hover:bg-gray-200 rounded-full'
                            onClick={onOpenSettings}
                        >
                            <FiMoreHorizontal className='text-lg'/>
                        </div>
                    </div>

                    <p className='whitespace-pre-line'>{ text }</p>
                    
                    <div className='flex justify-around'>
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


            <BasicModal
                className='absolute z-10 w-screen h-screen top-0 left-0'
                open={openMiniModal}
                closeModal={onCloseSettings}
            >
                <ul
                    className='py-2 border-2 border-gray-100 bg-white rounded-md shadow-md shadow-gray-600 w-64 relative'
                    style={{
                        top: settingsPosition.posY - 10,
                        left: settingsPosition.posX -  250,
                    }}
                >
                    <li 
                        className='flex items-center gap-2 font-bold p-2 hover:bg-gray-100 cursor-pointer w-full'
                        style={{ display: GUser?.pined !== tweet._id && GUser?._id === tweet.user ? 'flex' : 'none' }}
                        onClick={() => pinTweet(tweet._id)}
                        >
                        <BsPinAngle />
                        Pin to your profile
                    </li>

                    <li 
                        className='flex items-center gap-2 font-bold p-2 hover:bg-gray-100 cursor-pointer w-full'
                        style={{ display: GUser?.pined === tweet._id && GUser?._id === tweet.user ? 'flex' : 'none' }}
                        onClick={() => pinTweet(undefined)}
                    >
                        <BsPin />
                        Unpin from profile
                    </li>


                    <li 
                        className='flex items-center gap-2 font-bold p-2 hover:bg-gray-100 cursor-pointer w-full'
                        style={{ display: GUser?._id !== tweet.user && !GUser?.following.includes(tweet.user) ? 'flex' : 'none' }}
                        onClick={() => onFollowUser(tweet.user)}
                    >
                        <SlUserFollow />
                        {`Follow @${username}`}
                        
                    </li>

                    <li 
                        className='flex items-center gap-2 font-bold p-2 hover:bg-gray-100 cursor-pointer w-full'
                        style={{ display: GUser?._id !== tweet._id && GUser?.following.includes(tweet.user) ? 'flex' : 'none' }}
                        onClick={() => onFollowUser(tweet.user)}
                    >
                        <SlUserUnfollow />
                        {`Unfollow @${username}`}
                    </li>


                    



                </ul>
            </BasicModal>



        </div>
    )
}
