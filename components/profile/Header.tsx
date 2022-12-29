import { FC, useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineLink, AiOutlineSchedule } from 'react-icons/ai';

import { IUser } from '../../interfaces';
import { ProfileSettingsModal } from '../modals';

import Link from 'next/link';
import { Photos, Buttons } from './';

interface Props {
    user: IUser;
}


export const Header:FC<Props> = ({ user }) => {
    
    const [showSettingsProfile, setShowSettingsProfile] = useState(false);
    const { name, username, bio, followers, following, location, website } = user;

    return (
        <>
            <header className='mt-[70px] min-w-[530px]'>
                <div className='relative'>
                    <Photos />
                    <Buttons openSettingsProfile={() => setShowSettingsProfile(true)} user={user} />
                </div>

                <div className='mt-4'>
                    <div className='flex flex-col text-lg'>
                        <span className='font-bold text-xl'>{ name }</span>
                        <span className='text-gray-700'>@{ username }</span>
                        <p className='mt-3 whitespace-pre-line'>
                            { bio }
                        </p>
                    </div>
                </div>

                <div className='flex gap-x-6 flex-wrap'>
                    <div
                        className='flex items-center gap-x-1'
                        style={{ display: location ? 'flex' : 'none' }}
                    >
                        <CiLocationOn className='text-lg text-gray-900' />
                        <span className='text-lg text-gray-700'>{ location }</span>
                    </div>
                    <div
                        className='flex items-center gap-x-1'
                        style={{ display: website ? 'flex' : 'none' }}
                    >
                        <AiOutlineLink className='text-lg text-gray-900' />
                        <Link href={website || ''} target='_blank' className='text-lg text-twitter-blue hover:underline'>{ website }</Link>
                    </div>
                    <div
                        className='flex items-center gap-x-1'
                        style={{ display: true ? 'flex' : 'none' }}
                    >
                        <AiOutlineSchedule className='text-lg text-gray-900' />
                        <span className='text-lg text-gray-700'>Joined October 2020</span>
                    </div>
                </div>

                <div className='mt-3 flex'>
                    <div className='flex items-center'>
                        <span className='font-bold text-md mr-2'>{ following.length }</span>
                        <span className='text-gray-700'>Following</span>
                    </div>
                    <div className='ml-4'>
                        <span className='font-bold text-md mr-2'>{ followers.length }</span>
                        <span className='text-gray-700'>Followers</span>
                    </div>
                </div>

            </header>

            <ProfileSettingsModal 
                open={showSettingsProfile}
                closeModal={() => setShowSettingsProfile(false)}
                user={user}
            />

        </>
    )
}

