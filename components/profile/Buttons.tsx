import { FC, useState, useContext, useEffect } from 'react';

import { IoNotificationsOffOutline, IoNotificationsOutline } from 'react-icons/io5'
import { IUser } from '../../interfaces';
import { twitterApi } from '../../api';
import { UserContext } from '../../context/user';

interface Props {
    user: IUser;
    openSettingsProfile: () => void;
}

export const Buttons:FC<Props> = ({ user: profileUser, openSettingsProfile }) => {
    
    const { user: userAuth, setProfileUser } = useContext(UserContext);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        setIsFollowing(profileUser.followers.includes(userAuth?._id || ''));
    }, [profileUser.followers, userAuth?._id])

    const onFollow =  async (follow: boolean) => {
        await twitterApi.put(`/users/${profileUser._id}/follow`);
        setProfileUser(profileUser._id);
        setIsFollowing(follow);
    }

    return (
        <div className='flex w-full justify-end mt-3 pr-5'>
            <button
                className='border-gray-300 hover:bg-gray-200 transition-colors border-2 text-md font-bold py-1 px-4 rounded-full'
                style={{ display: userAuth?._id === profileUser._id ? 'block' : 'none' }}
                onClick={openSettingsProfile}
            >
                Edit Profile
            </button>
    
            <div style={{ display: userAuth?._id !== profileUser._id ? 'flex' : 'none' }} className=' gap-3'>
                <div 
                    className='hover:bg-gray-300 p-2 rounded-full border-2 border-gray-300 transition-colors'
                    style={{ display: isFollowing ? 'block' : 'none' }}
                >
                    <IoNotificationsOutline className='text-xl' />
                </div>

                <button 
                    className='group px-4 py-1 rounded-full border-2 border-black bg-black hover:bg-gray-900 min-w-[110px]'
                    style={{ display: isFollowing ? 'none' : 'block' }}
                    onClick={() => onFollow(true)}
                >
                    <span className='font-bold text-md text-white'>Follow</span>
                </button>

                <button 
                    className='group px-4 py-1 rounded-full border-2 border-gray-300 hover:border-red-300 hover:bg-red-200 min-w-[110px]'
                    style={{ display: isFollowing ? 'block' : 'none' }}
                    onClick={() => onFollow(false)}
                >
                    <span className='block group-hover:hidden font-bold text-md'>Following</span>
                    <span className='hidden group-hover:block font-bold text-md text-red-600'>Unfollow</span>
                </button>
            </div>

        </div>
    )
}
