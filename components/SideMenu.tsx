import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';

import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { FaHashtag } from 'react-icons/fa'
import { HiOutlineHashtag } from 'react-icons/hi'
import { IoIosNotifications } from 'react-icons/io';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

import { BsTwitter } from 'react-icons/bs'
import {  AiOutlineDown } from 'react-icons/ai';
import { FiFeather } from 'react-icons/fi'

import { WriteTweetModal, BasicModal } from './modals';
import { AuthContext } from '../context/auth';

import img from '../public/avatar.png';

export const SideMenu = () => {

    const { pathname } = useRouter();
    const [openTweetModal, setOpenTweetModal] = useState(false);
    const { user, logOutUser } = useContext(AuthContext);
    const [openMiniModal, setOpenMiniModal] = useState(false);

    return (
        <div className='w-24 lg:w-full h-screen p-10 px-5'>
            <Link href='/home'>
                <div className='flex items-center p-3 gap-x-4'>
                    <BsTwitter className='text-3xl text-twitter-blue' />
                    <span className='text-2xl font-bold hidden lg:block'>Twitter</span>
                </div>
            </Link>

            <Link href='/home'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <AiOutlineHome style={{ display: pathname !== '/home' ? 'block' : 'none' }} className='text-3xl' />
                    <AiFillHome style={{ display: pathname === '/home' ? 'block' : 'none' }} className='text-3xl' />
                    <span className='px-2 text-xl hidden lg:block'>Home</span>
                </div>
            </Link>

            <Link href='/explore'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <HiOutlineHashtag style={{ display: pathname !== '/explore' ? 'block' : 'none' }} className='text-3xl' />
                    <FaHashtag style={{ display: pathname === '/explore' ? 'block' : 'none' }} className='text-3xl' />
                    <span className='px-2 text-xl hidden lg:block'>Explore</span>
                </div>
            </Link>

            <Link href='/notifications'>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <IoNotificationsOutline style={{ display: pathname !== '/notifications' ? 'block' : 'none' }} className='text-3xl' />
                    <IoIosNotifications style={{ display: pathname === '/notifications' ? 'block' : 'none' }} className='text-3xl' />
                    <span className='px-2 text-xl hidden lg:block'>Notifications</span>
                </div>
            </Link>

            <Link href={`/${user?.username || ''}`}>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <CgProfile style={{ display: pathname !== '/[username]' ? 'block' : 'none' }} className='text-3xl' />
                    <BsPersonCircle style={{ display: pathname === '/[username]' ? 'block' : 'none' }} className='text-3xl' />
                    <span className='px-2 text-xl hidden lg:block'>Profile</span>
                </div>
            </Link>

            <button 
                className='lg:block bg-twitter-blue hover:bg-blue-600 transition-colors p-4 lg:py-4 lg:px-10 font-bold text-white rounded-full lg:w-[85%] mt-5 text-xl'
                onClick={() => setOpenTweetModal(true)}
            >
                <span className='hidden lg:block'>Tweet</span>
                <FiFeather className='lg:hidden' />
            </button>

            {
                user &&
                <div
                    className='flex items-center justify-between mt-7 max-w-[85%] cursor-pointer hover:bg-gray-200 rounded-full p-2'
                    onClick={() => setOpenMiniModal(true)} 
                >
                    <Image 
                        src={img} alt='avatar' 
                        width={40} height={40}
                        style={{ minWidth: 40, minHeight: 40 }}
                        className='rounded-full' 
                    />
                    <div className='hidden lg:block'>
                        <span className='font-semibold block'>{ user.name.slice(0, 11).concat('...') }</span>
                        <span className=''>@{user.username}</span>
                    </div>
                    
                    <AiOutlineDown className='text-lg hidden lg:block' />
                </div>
            }
            
            <BasicModal
                className='absolute z-10 w-screen h-screen top-0 left-0'
                open={openMiniModal}
                closeModal={() => setOpenMiniModal(false)}
            >
                <button 
                    className='py-5 px-2 border-2 border-gray-100 bg-white rounded-md shadow-md shadow-gray-600 w-64 relative'
                    style={{
                        top: '320px',
                        left: '100px'
                    }}
                    onClick={logOutUser}
                >
                    <span 
                        className='font-bold p-2 hover:bg-gray-100 cursor-pointer w-full'
                    >Log out @{user?.username}</span>
                </button>
            </BasicModal>


            <WriteTweetModal
                open={openTweetModal}
                closeModal={() => setOpenTweetModal(false)}
            />
        </div>
    )
}
