import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ITweet } from '../interfaces';
import { BubbleSort, ISort, MergeSort } from '../services/sort';
import { Tweet } from "./tweets"
import { Comparer } from '../services/sort/comparers';

interface Props {
  endpoint: string;
  comparerToSort: Comparer<ITweet>;
}

export const Feed:FC<Props> = ({ endpoint, comparerToSort }) => {
  
  const { data, error, isLoading } = useSWR<ITweet[]>(endpoint);
  const [sortedItems, setSortedItems] = useState<ITweet[]>([]);
  
  useEffect(() => {
    if( isLoading || !data ) return;
    setSortedItems( new MergeSort(comparerToSort).sort(data!) )
  }, [isLoading, data, comparerToSort]) 
  
  
  if( isLoading ) return <div>Loading...</div>

  return (
    <div className="w-full min-w-[530px] h-screen px-2">
      
      {
        sortedItems.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))
      }
      
    </div>
  )
}
