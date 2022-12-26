import Link from 'next/link';

import { AiFillHome } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg'
import { FaHashtag } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'

export const SideMenu = () => {
    return (
        <div className='w-full h-screen p-10'>
            <div className='flex items-center my-2'>
                <BsTwitter className='text-4xl text-blue-600 mr-4' />
                <span className='text-2xl font-bold'>Twitter</span>
            </div>

            <Link href=''>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <AiFillHome className='text-3xl' />
                    <span className='px-2 text-xl'>Home</span>
                </div>
            </Link>
            <Link href=''>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <FaHashtag className='text-3xl' />
                    <span className='px-2 text-xl'>Explore</span>
                </div>
            </Link>
            <Link href=''>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <IoIosNotifications className='text-3xl' />
                    <span className='px-2 text-xl'>Notifications</span>
                </div>
            </Link>
            <Link href=''>
                <div className='flex rounded-full p-3 cursor-pointer hover:bg-gray-200'>
                    <CgProfile className='text-3xl' />
                    <span className='px-2 text-xl'>Profile</span>
                </div>
            </Link>

            <button className='bg-blue-500 hover:bg-blue-600 transition-colors py-4 px-10 font-bold text-white rounded-full w-full mt-5 text-xl'>
                Tweet
            </button>
        </div>
    )
}
