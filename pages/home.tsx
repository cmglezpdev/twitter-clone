import { useState } from 'react';
import { Feed } from "../components";
import { AppLayout } from '../layouts';
import { Comparer, TweetFeedComparer } from '../services/sort';
import { ITweet } from '../interfaces/tweet';

function HomePage() {
  const[ comparer, ] = useState<Comparer<ITweet>>(new TweetFeedComparer());
  
  return (

    <AppLayout
      title="Home / Twitter"
      pageDescription="Twitter clone"
    >
      <div className="mt-[70px]">
        <Feed
          endpoint='/api/tweets' 
          comparerToSort={comparer}
        />
      </div>
    </AppLayout>
  )
}


export default HomePage;