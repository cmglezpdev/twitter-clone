import Image from 'next/image';
import { LeftPanel, SideMenu, TopBar } from "../components";

import img from '../public/avatar.png'

const ProfilePage = () => {
    return (
        <div className="w-screen h-screen grid grid-cols-twitter">
            <SideMenu />
                <div>
                    <TopBar title="Profile" />

                    <header className='mt-[70px]'>
                        <div className='relative'>
                            <div className='w-full h-[200px] bg-gray-500'>
                                {/* image without banner */}
                            </div>
                            <div className='absolute w-32 h-32 rounded-full p-1 bg-white left-4 -bottom-1'>
                                <Image src={img} alt='avatar' className='rounded-full w-full h-full' />
                            </div>
                            <div className='flex w-full justify-end mt-3'>
                                <button className='border-gray-400 hover:bg-gray-200 transition-colors border-2 text-lg font-bold py-2 px-4 rounded-full'>
                                    Edit Profile
                                </button>
                            </div>
                        </div>


                        <div className='mt-4'>
                            <div className='flex flex-col text-lg'>
                                <span className='font-bold text-xl'>Carlos M. González</span>
                                <span className='text-gray-700'>@cmglezpdev</span>
                                <p className='mt-3'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi explicabo, sit dolor, minima nemo distinctio exercitationem possimus eaque deserunt ipsum, hic officiis sapiente soluta. Accusamus veritatis quae dicta aliquam aliquid.
                                </p>
                            </div>
                        </div>

                    </header>
                </div>
            <LeftPanel />
        </div>
    )
}

export default ProfilePage;