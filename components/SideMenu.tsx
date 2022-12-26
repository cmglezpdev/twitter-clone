import Link from 'next/link';

import { AiFillHome } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg'
import { FaHashtag } from 'react-icons/fa'

export const SideMenu = () => {
    return (
        <div className='w-[350px] h-screen bg-cyan-200'>
            <Link href=''>
                <div className='flex rounded-lg py-3 px-2 bg-red-300 cursor-pointer'>
                    <AiFillHome className='text-3xl' />
                    <span className='px-2 text-xl'>Home</span>
                </div>
            </Link>
            <Link href=''>
                <div className='flex rounded-lg py-3 px-2 bg-red-300 cursor-pointer'>
                    <FaHashtag className='text-3xl' />
                    <span className='px-2 text-xl'>Explore</span>
                </div>
            </Link>
            <Link href=''>
                <div className='flex rounded-lg py-3 px-2 bg-red-300 cursor-pointer'>
                    <IoIosNotifications className='text-3xl' />
                    <span className='px-2 text-xl'>Notifications</span>
                </div>
            </Link>
            <Link href=''>
                <div className='flex rounded-lg py-3 px-2 bg-red-300 cursor-pointer'>
                    <CgProfile className='text-3xl' />
                    <span className='px-2 text-xl'>Profile</span>
                </div>
            </Link>
        </div>
    )
}
