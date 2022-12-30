import { useState, MouseEvent, useContext } from 'react';
import { UserContext } from '../../context/user';
import { Feed } from '../Feed';

type Section = 'Tweets' | 'Tweets & replies' | 'Media' | 'Likes';


export const Actions = () => {
    
    const [section, setSection] = useState<Section>('Tweets')
    const { user } = useContext(UserContext);

    const handleSection = (e: MouseEvent<HTMLButtonElement>) => {
        const section = e.currentTarget.textContent as Section;
        setSection(section);
    }

    return (
        <>
            <div className="w-full mt-5 grid grid-cols-5">
                <button
                    className='font-bold text-lg hover:bg-gray-300 py-3 pb-0 flex flex-wrap justify-center'
                    onClick={handleSection}
                >
                    <span className="pb-1" style={section === 'Tweets' ? {color:'black'} : {color:'rgb(75 85 99)'}}>Tweets</span>
                    <div style={{ display: section === 'Tweets' ? 'block' : 'none' }} className="w-[70%] h-1 bg-twitter-blue rounded-full"></div>
                </button>

                <button
                    className='font-bold text-lg hover:bg-gray-300 py-3 pb-0 flex flex-wrap justify-center col-start-2 col-end-4'
                    onClick={handleSection}
                >
                    <span className="pb-1" style={section === 'Tweets & replies' ? {color:'black'} : {color:'rgb(75 85 99)'}}>Tweets & replies</span>
                    <div style={{ display: section === 'Tweets & replies' ? 'block' : 'none' }} className="w-[70%] h-1 bg-twitter-blue rounded-full"></div>    
                </button>

                <button
                    className='font-bold text-lg hover:bg-gray-300 py-3 pb-0 flex flex-wrap justify-center'
                    onClick={handleSection}
                >
                    <span className="pb-1" style={section === 'Media' ? {color:'black'} : {color:'rgb(75 85 99)'}}>Media</span>
                    <div style={{ display: section === 'Media' ? 'block' : 'none' }} className="w-[70%] h-1 bg-twitter-blue rounded-full"></div>
                </button>

                <button
                    className='font-bold text-lg hover:bg-gray-300 py-3 pb-0 flex flex-wrap justify-center'
                    onClick={handleSection}
                >
                    <span className="pb-1" style={section === 'Likes' ? {color:'black'} : {color:'rgb(75 85 99)'}}>Likes</span>
                    <div style={{ display: section === 'Likes' ? 'block' : 'none' }} className="w-[70%] h-1 bg-twitter-blue rounded-full"></div>
                </button>
            </div>
        
            {
                user &&
                <Feed endpoint={`/api/users/${user._id}/tweets?type=${section}`} />
            }

        </>
    )
}
