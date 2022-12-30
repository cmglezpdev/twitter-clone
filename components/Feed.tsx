import { FC } from 'react';
import useSWR from 'swr';
import { ITweet } from '../interfaces';
import { Tweet } from "./Tweet"

interface Props {
  endpoint: string;
}

export const Feed:FC<Props> = ({ endpoint }) => {
  
  const { data, error, isLoading } = useSWR<ITweet[]>(endpoint);

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
