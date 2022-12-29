import React from 'react'
import Image from 'next/image';

import img from '../../public/avatar.png';

export const Photos = () => {
    return (
        <>
            <div className='w-full h-[200px] bg-gray-500'>
                {/* image without banner */}
            </div>
            <div className='absolute w-32 h-32 rounded-full p-1 bg-white left-4 -bottom-1'>
                {/* Change by images */}
                <Image src={img} alt='avatar' className='rounded-full w-full h-full' />
            </div>
        </>
    )
}
