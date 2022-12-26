import { FC } from 'react'

interface Props {
    title: string;
}

export const TopBar:FC<Props> = ({ title }) => {
    return (
        <div className='w-full h-16 flex items-center fixed px-8 backdrop-blur-lg'>
            <span className='font-bold text-2xl'>{title}</span>
        </div>
    )
}
