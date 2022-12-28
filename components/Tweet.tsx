import { FC, useState, useEffect } from 'react';
import Image from "next/image"

import { CiViewBoard } from 'react-icons/ci'
import { TbMessageCircle2 } from 'react-icons/tb'
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoShareOutline } from 'react-icons/io5'

import { ITweet } from "../interfaces"
import img from '../public/avatar.png'
import useSWR from 'swr';

interface Props {
    tweet: ITweet;
}

export const Tweet:FC<Props> = ({ tweet }) => {

    const [tweetContent, setTweetContent] = useState<ITweet>(tweet);
    const { _id, user, likes, retweets, comments, views, text } = tweetContent;

    const { data } = useSWR(`api/tweets/${_id}`, { refreshInterval: 10000 });

    useEffect(() => {
        if( data )
            setTweetContent(data);
    }, [data])

    return (
        <div className="w-full flex hover:bg-gray-100 cursor-pointer border-b-2 border-b-gray-50">
            <div className="p-2">
                <Image src={img} alt="avatar" width={150} height={150} className='rounded-full' />
            </div>
            <div className="p-2">
                <p className="flex">
                    <span className="mr-1 font-bold">{ user }</span>
                    <span className="font-light">@cmglezpdev</span>
                </p>
                <p>{ text }</p>
                
                <div className="flex justify-start">
                    <span className="flex items-center mt-3 mr-10 text-gray-700 hover:text-blue-600 group transition-colors">
                        <span className="group-hover:bg-blue-200 rounded-full p-2">
                            <CiViewBoard className='text-xl font-light' />
                        </span>
                        <span>{ views.length }</span>
                    </span>
                    <span className="flex items-center mt-3 mr-10 text-gray-700 hover:text-blue-600 group transition-colors">
                        <span className="group-hover:bg-blue-200 rounded-full p-2">
                            <TbMessageCircle2 className='text-xl font-light' />
                        </span>
                        <span>{ comments.length }</span>
                    </span>

                    <span className="flex items-center mt-3 mr-10 text-gray-700 hover:text-green-600 group transition-colors">
                        <span className="group-hover:bg-green-200 rounded-full p-2">
                            <AiOutlineRetweet className='text-xl font-light' />
                        </span>
                        <span>{ retweets.length }</span>
                    </span>
                    <span className="flex items-center mt-3 mr-10 text-gray-700 hover:text-red-600 group transition-colors">
                        <span className="group-hover:bg-red-200 rounded-full p-2">
                            <AiOutlineHeart className='text-xl font-light' />
                        </span>
                        <span>{ likes.length }</span>
                    </span>

                    <span className="hover:bg-blue-200 rounded-full p-2 mt-3 mr-10">
                        <IoShareOutline className='text-xl text-gray-700 hover:text-blue-600 transition-colors' />
                    </span>


                    
            
                </div>
            </div>
        </div>
    )
}
