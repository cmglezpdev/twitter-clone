
import { BsTwitter } from 'react-icons/bs'
import { useForm } from '../../hooks';
import { validations as vdts } from '../../services';

interface FormData {
    name?: string;
    email?: string;
    brithday?: string;
    password?: string;
}
 
const Register = () => {

    const { handlerChange, values, errors } = useForm<FormData>({}, {
        name: { 
            required: true,
            validate: (value: string) => (value.trim().length > 2),
            messageError: "The length name must be greater than 2 characters"
        },
        email: {
            required: true,
            validate: (value: string) => vdts.isValidEmail(value),
            messageError: "The email is not valid"
        },
        password: {
            required: true,
            validate: (value: string) => vdts.isValidPassword(value),
            messageError: "The password is not valid"
        },
        brithday: {
            required: true,
            validate: (value: string) => vdts.isValidBirthday(value),
            messageError: "The brithday is not valid"
        }
    });

    const onSubmit = (e:any) => {
        e.preventDefault();
        console.log(values);
    }

    return (
        <div className="w-1/3 mx-auto mt-10 flex flex-col items-center">
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
                        type="text" 
                        name="name" 
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
                        type="text" 
                        name="email" 
                        placeholder='Email'
                        onChange={handlerChange}
                        style={ errors.email ? { borderColor: 'red' } : {} }
                    />
                    <span
                        className='text-red-600 text-sm'
                        style={{ display: errors.email ? 'block' : 'none' }}
                    >{ errors.email }</span>
                </div>

                <div className='w-full'>
                    <input 
                        className='w-full border-2 border-gray-300 rounded-md p-3 mt-2 text-xl outline-none focus:border-twitter-blue'
                        type="text" 
                        name="password" 
                        placeholder='Password'
                        onChange={handlerChange}
                        style={ errors.password ? { borderColor: 'red' } : {} }
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
                        type="date" 
                        name="brithday"
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

        </div>
    )
}

export default Register;