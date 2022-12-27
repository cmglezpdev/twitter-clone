import { useState } from 'react';
import Link from 'next/link';

import { AiFillHome } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg'
import { FaHashtag } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'

import { WriteTweetModal } from './modals';


export const SideMenu = () => {

    const [openTweetModal, setOpenTweetModal] = useState(false);

    return (
        <div className='w-full h-screen p-10'>
            <Link href='/home'>
                <div className='flex items-center my-2'>
                    <BsTwitter className='text-4xl text-twitter-blue mr-4' />
                    <span className='text-2xl font-bold'>Twitter</span>
                </div>
            </Link>

            <Link href='/home'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <AiFillHome className='text-3xl' />
                    <span className='px-2 text-xl'>Home</span>
                </div>
            </Link>
            <Link href='/explore'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <FaHashtag className='text-3xl' />
                    <span className='px-2 text-xl'>Explore</span>
                </div>
            </Link>
            <Link href='/notifications'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <IoIosNotifications className='text-3xl' />
                    <span className='px-2 text-xl'>Notifications</span>
                </div>
            </Link>
            <Link href='/cmglezpdev'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <CgProfile className='text-3xl' />
                    <span className='px-2 text-xl'>Profile</span>
                </div>
            </Link>

            <button 
                className='bg-twitter-blue hover:bg-blue-600 transition-colors py-4 px-10 font-bold text-white rounded-full w-full mt-5 text-xl'
                onClick={() => setOpenTweetModal(true)}
            >
                Tweet
            </button>

            <WriteTweetModal 
                open={openTweetModal}
                closeModal={() => setOpenTweetModal(false)}
            />
        </div>
    )
}
