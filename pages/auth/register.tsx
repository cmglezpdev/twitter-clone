
import { useContext, useState } from 'react';
import Link from 'next/link';
import { BsTwitter } from 'react-icons/bs'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { useForm } from '../../hooks';
import { validations as vdts } from '../../services';
import { AuthLayout } from '../../layouts';
import { AuthContext } from '../../context/auth';
import { toast } from 'react-toastify';

interface FormData {
    name?: string;
    email?: string;
    brithday?: string;
    password?: string;
}
 
const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { signUpUser } = useContext(AuthContext);

    const { handlerChange, values, errors } = useForm<FormData>({}, {
        name: { 
            required: true,
            validate: (value: string) => (value.trim().length > 2),
            messageError: 'The length name must be greater than 2 characters'
        },
        email: {
            required: true,
            validate: (value: string) => vdts.isValidEmail(value),
            messageError: 'The email is not valid'
        },
        password: {
            required: true,
            validate: (value: string) => vdts.isValidPassword(value),
            messageError: 'The password is not valid'
        },
        brithday: {
            required: true,
            validate: (value: string) => vdts.isValidBirthday(value),
            messageError: 'The brithday is not valid'
        }
    });

    const onSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await signUpUser(values);
        } catch (error: any) {
            toast.error( error.response.data.message )
        }
    }

    return (
        <AuthLayout
            title='Register / Twitter'
            pageDescription='Join Twitter today'
        >
            <div className='w-1/3 mx-auto mt-10 flex flex-col items-center'>
                <BsTwitter 
                    className='text-twitter-blue text-6xl' 
                />
                <h1 className='text-3xl font-bold mt-6'>Join Twitter today</h1>
                <form
                    className='w-full mt-5 flex flex-col'
                >
                    <div className='w-full'>
                        <input 
                            className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                            type='text' 
                            name='name' 
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
                        <input 
                            className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                            type='text' 
                            name='email' 
                            placeholder='Email'
                            onChange={handlerChange}
                            style={ errors.email ? { borderColor: 'red' } : {} }
                        />
                        <span
                            className='text-red-600 text-sm'
                            style={{ display: errors.email ? 'block' : 'none' }}
                        >{ errors.email }</span>
                    </div>

                    <div className='w-full relative'>
                        <input 
                            className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                            type={ showPassword ? 'text' : 'password' }
                            name='password' 
                            placeholder='Password'
                            onChange={handlerChange}
                            style={ errors.password ? { borderColor: 'red' } : {} }
                        />
                        <AiOutlineEye
                            style={{ 
                                display: showPassword ? 'none' : 'block',
                                color: errors.password ? 'red' : ''
                            }}
                            className='absolute right-2 top-7 text-xl cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <AiOutlineEyeInvisible 
                            style={{ 
                                display: showPassword ? 'block' : 'none',
                                color: errors.password ? 'red' : ''
                            }}
                            className='absolute right-2 top-7 text-xl cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)} 
                        />
                        

                        <span
                            className='text-red-600 text-sm'
                            style={{ display: errors.password ? 'block' : 'none' }}
                        >{ errors.password }</span>
                    </div>

                    <div className='mt-2'>
                        <h3 className='font-bold text-lg'>Date of birth</h3>
                        <input 
                            className='w-full border-4 border-gray-300 rounded-md p-3 my-2 text-xl outline-none focus:border-twitter-blue'
                            type='date' 
                            name='brithday'
                            onChange={handlerChange}
                            style={ errors.brithday ? { borderColor: 'red' } : {} }
                        />
                        <span
                            className='text-red-600 text-sm'
                            style={{ display: errors.brithday ? 'block' : 'none' }}
                        >{ errors.brithday }</span>
                    </div>

                    <button
                        className='bg-twitter-blue disabled:bg-blue-300 hover:bg-blue-500 transition-colors py-4 px-10 font-bold text-white rounded-full w-full mt-5 text-xl outline-none'
                        onClick={onSubmit}
                        disabled={ Object.keys(errors).length > 0 || Object.keys(values).length === 0 }
                    >
                        Sign up
                    </button>
                </form>

                <span className='mt-3 text-lg'>
                    {`Have an account already?`} 
                    <Link href='/auth/login' className='inline-block ml-2 text-twitter-blue'>
                        Log in
                    </Link>
                </span>
            </div>
        </AuthLayout>
    )
}

export default RegisterPage;