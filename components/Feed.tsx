import useSWR from 'swr';
import { ITweet } from '../interfaces';
import { Tweet } from "./Tweet"


export const Feed = () => {
  
  const { data, error, isLoading } = useSWR<ITweet[]>('/api/tweets');

  if( isLoading ) return <div>Loading...</div>

  return (
    <div className="w-full min-w-[530px] h-screen px-2 mt-[70px]">
      
      {
        data!.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))
      }
      
    </div>
  )
}
