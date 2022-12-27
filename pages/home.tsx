import { Feed, LeftPanel, SideMenu, TopBar } from "../components";
import { WriteTweetModal } from '../components/modals/WriteTweet';

function HomePage() {
  return (
    <div className="w-screen h-screen grid grid-cols-twitter">
      <SideMenu />
      <div>
      <TopBar title="Home" />
        <Feed />
      </div>
      <LeftPanel />
    </div>
  )
}


export default HomePage;