import { FC, MouseEvent, useRef, useContext, useEffect } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';

import { useForm } from '../../hooks';
import { validations } from '../../services';
import { UserContext } from '../../context/user';
import { twitterApi } from '../../api';

import img from '../../public/avatar.png'

interface Props {
    open: boolean;
    closeModal: () => void;
}

interface INITIAL_VALUES {
    name     : string;
    bio      : string;
    location : string;
    website  : string;
    birth    : string;
}

export const ProfileSettingsModal:FC<Props> = ({ open, closeModal }) => {

    const { setProfileUser, setUser, user } = useContext(UserContext);
    const { handlerChange, values, errors, setInitialValues } = useForm<INITIAL_VALUES>({
        name: user?.name || '', 
        bio: user?.bio || '', 
        location: user?.location || '', 
        website: user?.website || '', 
        birth: user?.birth || '',
    }, {
        name: { 
            required: true,
            validate: (value: string) => validations.isValidName(value),
            messageError: 'The length name must be greater than 2 characters'
        },
        bio: {
            validate: (value: string) => value.length === 0 || validations.isValidBio(value),
            messageError: 'The bio is not valid'
        },
        location: { 
            validate: (value: string) => value.length === 0 || validations.isValidLocation(value),
            messageError: 'The location is not valid'
        },
        website: {
            validate: (value: string) => value.length === 0 || validations.isValidWebsite(value),
            messageError: 'The website is not valid'
        },
        birth: {
            required: true,
            validate: (value: string) => validations.isValidBirthday(value),
            messageError: 'The birth is not valid'
        },        
    });

    useEffect(() => {
        if( user )
            setInitialValues({
                name: user?.name || '', 
                bio: user?.bio || '', 
                location: user?.location || '', 
                website: user?.website || '', 
                birth: user?.birth || '',
            });
    }, [setInitialValues, user])


    const bgModal = useRef<HTMLDivElement>(null);
    if (!open) return null;

    const handleModal = ( e:MouseEvent<HTMLDivElement> ) => {
        if( bgModal.current === e.target ) closeModal()
    }

    const onSaveSettings = async (e:any) => {
        e.preventDefault();
        await twitterApi.put(`/users/${user!._id}`, values);
        setProfileUser(user!._id);
        setUser(user!._id);
        closeModal();
        toast.success('Profile edited successfully!')
    }

    return (
        <div ref={bgModal} className='fixed inset-0 flex bg-modal z-inf' onClick={(e) => handleModal(e)}>
            <div className='flex w-[50%] flex-wrap m-auto bg-white p-3 rounded-lg max-h-[500px] overflow-scroll'>
                <div className='w-full mb-3 flex justify-between'>
                    <div
                        className='hover:bg-gray-300 p-2 inline-block transition-colors rounded-full'
                        onClick={closeModal}
                    >
                        <IoMdClose className='cursor-pointer font-bold text-2xl' />
                    </div>

                    <button 
                        className='px-5 py-1 font-bold text-xl bg-black hover:bg-gray-900 text-white rounded-full transition-colors'
                        onClick={onSaveSettings}
                    >
                        Save
                    </button>
                </div>

                <form className='w-full'>
                    <div className='relative'>
                        <div className='w-full h-[200px] bg-gray-500'>
                            {/* image without banner */}
                        </div>
                        <div className='absolute w-24 h-24 rounded-full p-1 bg-white left-4 -bottom-10'>
                            {/* Change by images */}
                            <Image src={img} alt='avatar' className='rounded-full w-full h-full' />
                        </div>
                    </div>

                    <div className='mt-14 flex flex-col gap-4'>
                        <div className='w-full'>
                            <input 
                                className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                                type='text' 
                                name='name'
                                defaultValue={values.name}
                                placeholder='Name'
                                onChange={handlerChange}
                                style={ errors.name ? { borderColor: 'red' } : {} }
                            />
                            <span
                                className='text-red-600 text-sm'
                                style={{ display: errors.name ? 'block' : 'none' }}
                            >{ errors.name }</span>
                        </div>

                        <div className='w-full'>
                            <textarea 
                                className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue resize-none'
                                name='bio'
                                placeholder='Bio'
                                defaultValue={values.bio}
                                onChange={handlerChange}
                                style={ errors.bio ? { borderColor: 'red' } : {} }
                            />
                            <span
                                className='text-red-600 text-sm'
                                style={{ display: errors.bio ? 'block' : 'none' }}
                            >{ errors.bio }</span>
                        </div>

        
                        <div className='w-full'>
                            <input 
                                className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                                type='text' 
                                name='location' 
                                placeholder='Location'
                                defaultValue={values.location}
                                onChange={handlerChange}
                                style={ errors.location ? { borderColor: 'red' } : {} }
                            />
                            <span
                                className='text-red-600 text-sm'
                                style={{ display: errors.location ? 'block' : 'none' }}
                            >{ errors.location }</span>
                        </div>


                        <div className='w-full'>
                            <input 
                                className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                                type='text' 
                                name='website'
                                placeholder='Website'
                                onChange={handlerChange}
                                defaultValue={values.website}
                                style={ errors.website ? { borderColor: 'red' } : {} }
                            />
                            <span
                                className='text-red-600 text-sm'
                                style={{ display: errors.website ? 'block' : 'none' }}
                            >{ errors.website }</span>
                        </div>

                        <div className='mt-2'>
                            <h3 className='font-bold text-lg'>Date of birth</h3>
                            <input 
                                className='w-full border-4 border-gray-300 rounded-md p-3 my-2 text-xl outline-none focus:border-twitter-blue'
                                type='date' 
                                name='birth'
                                defaultValue={values.birth}
                                onChange={handlerChange}
                                style={ errors.birth ? { borderColor: 'red' } : {} }
                            />
                            <span
                                className='text-red-600 text-sm'
                                style={{ display: errors.birth ? 'block' : 'none' }}
                            >{ errors.birth }</span>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    )
}
