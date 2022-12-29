import { useState, useContext, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import { AiFillHome, AiOutlineDown } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg'
import { FaHashtag } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'

import { WriteTweetModal, BasicModal } from './modals';
import { AuthContext } from '../context/auth';

import img from '../public/avatar.png';

export const SideMenu = () => {

    const [openTweetModal, setOpenTweetModal] = useState(false);
    const { user, logOutUser } = useContext(AuthContext);
    const [openMiniModal, setOpenMiniModal] = useState(false);


    return (
        <div className='w-full h-screen p-10 px-5'>
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

            {
                user &&
                <div className='flex items-center justify-between mt-7 w-[85%] cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                    <Link href='/cmglezpdev'>
                        <Image 
                            src={img} alt='avatar' 
                            width={50} height={50}
                            style={{ minWidth: 50, minHeight: 50 }}
                            className='rounded-full mr-2' 
                        />
                    </Link>
                    <Link href='/cmglezpdev'>
                        <span className='font-semibold block'>{ user.name.slice(0, 17).concat('...') }</span>
                        <span className=''>{user.username}</span>
                    </Link>
                    
                    <AiOutlineDown className='text-lg' onClick={() => setOpenMiniModal(true)} />
                </div>
            }

            <BasicModal
                className='absolute z-10 w-screen h-screen top-0 left-0'
                open={openMiniModal}
                closeModal={() => setOpenMiniModal(false)}
            >
                <button 
                    className='py-5 px-2 border-2 border-gray-100 bg-white rounded-md shadow-md shadow-gray-600 w-64 relative top-[320px] left-36'
                    onClick={logOutUser}
                >
                    <span 
                        className='font-bold p-2 hover:bg-gray-100 cursor-pointer block w-full'
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
