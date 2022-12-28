import { FC, MouseEvent, useRef, useState, useContext } from 'react';
import Image from 'next/image';

import { IoMdClose } from 'react-icons/io'
import { GoFileMedia } from 'react-icons/go'
import { BsEmojiSmile } from 'react-icons/bs'
import { AiOutlineFileGif } from 'react-icons/ai'

import { twitterApi } from '../../api';
import { AuthContext } from '../../context/auth';

import img from '../../public/avatar.png'

interface Props {
    open: boolean;
    closeModal: () => void;
}

export const WriteTweetModal:FC<Props> = ({ open, closeModal }) => {

    const [tweetContent, setTweetContent] = useState('');
    const { user } = useContext(AuthContext);
    const bgModal = useRef<HTMLDivElement>(null);
    if (!open) return null;

    const handleModal = ( e:MouseEvent<HTMLDivElement> ) => {
        if( bgModal.current === e.target ) closeModal()
    }

    const onTwitear = async (e:any) => {
        e.preventDefault();
        await twitterApi.post('/tweets/create', { text: tweetContent, userId: user?._id });
        closeModal();
    }

    return (
        <div ref={bgModal} className='fixed inset-0 flex bg-modal z-inf' onClick={(e) => handleModal(e)}>
            <div className='flex w-[50%] flex-wrap m-auto bg-white p-3 rounded-lg'>
                <div className='w-full mb-3'>
                    <div
                        className='hover:bg-gray-300 p-2 inline-block transition-colors rounded-full'
                        onClick={closeModal}
                    >
                        <IoMdClose className='cursor-pointer font-bold text-2xl' />
                    </div>
                </div>
                
                <div className='w-[15%]'>
                    <Image 
                        src={img} alt='avatar' 
                        width={70} height={70} 
                        className='rounded-full' 
                        style={{ minWidth: 70, minHeight: 70 }}
                    />
                </div>
                <div className='w-[85%]'>
                    <textarea
                        rows={5}
                        placeholder="What's happening?" 
                        className='outline-none w-full resize-none text-2xl border-b-2 border-gray-300'
                        onChange={(e) => setTweetContent(e.target.value)}
                    />
                    <div className='w-full flex justify-between'>
                        <div>
                            <div className='hover:bg-blue-300 p-2 inline-block transition-colors rounded-full'>
                                <GoFileMedia className='cursor-pointer font-bold text-2xl text-blue-500' />
                            </div>
                            <div className='hover:bg-blue-300 p-2 inline-block transition-colors rounded-full'>
                                <AiOutlineFileGif className='cursor-pointer font-bold text-2xl text-blue-500' />
                            </div>
                            <div className='hover:bg-blue-300 p-2 inline-block transition-colors rounded-full'>
                                <BsEmojiSmile className='cursor-pointer font-bold text-2xl text-blue-500' />
                            </div>
                        </div>
                        
                        <button 
                            className='px-5 py-1 font-bold text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors outline-none'
                            onClick={onTwitear}
                        >
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
