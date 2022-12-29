import Link from "next/link"

export const FooterAccount = () => {
    return (
        <footer className='fixed bottom-0 w-full bg-twitter-blue flex py-5 z-inf'>
            <div className='w-1/2'>
                <div className='float-right flex flex-col'>
                    <span className='text-3xl font-bold text-white'>Don’t miss what’s happening</span>
                    <span className='text-xl text-white'>People on Twitter are the first to know.</span>
                </div>
            </div>

            <div className='w-1/2 flex items-center justify-end'>
                <div className='mr-16'>
                    <Link href={'/auth/login'}>
                        <button
                            className='py-1 px-4 text-lg font-bold text-white bg-twitter-blue border-2 border-white rounded-full outline-none hover:bg-blue-400 transition-colors'
                        >
                            Log in
                        </button>
                    </Link>
                    
                    <Link href={'/auth/register'}>
                        <button
                            className='py-1 px-4 text-lg font-bold bg-white rounded-full outline-none ml-4 border-2 border-white hover:bg-gray-200 transition-colors'
                        >
                            Sign up
                        </button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
