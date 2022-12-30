import { FC, useState } from 'react';
import Link from 'next/link';

import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineLink, AiOutlineSchedule } from 'react-icons/ai';

import { IUser } from '../../interfaces';
import { ProfileSettingsModal } from '../modals';
import { Photos, Buttons } from './';
import { dates } from '../../services';


interface Props {
    user: IUser;
}


export const Header:FC<Props> = ({ user }) => {

    const [showSettingsProfile, setShowSettingsProfile] = useState(false);
    const { name, username, bio, followers, following, location, website, createdAt } = user;

    return (
        <>
            <header className='mt-[70px] min-w-[530px] px-1'>
                <div className='relative'>
                    <Photos />
                    <Buttons openSettingsProfile={() => setShowSettingsProfile(true)} user={user} />
                </div>

                <div className='mt-4 px-2'>
                    <div className='flex flex-col text-lg'>
                        <span className='font-bold text-xl'>{ name }</span>
                        <span className='text-gray-700'>@{ username }</span>
                        <p className='mt-3 whitespace-pre-line'>
                            { bio }
                        </p>
                    </div>
                </div>

                <div className='flex gap-x-3 mt-4 flex-wrap px-2'>
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
                        <span className='text-lg text-gray-700'>Joined {dates.formatJoined(createdAt)}</span>
                    </div>
                </div>

                <div className='mt-3 flex px-2'>
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
            />

        </>
    )
}

