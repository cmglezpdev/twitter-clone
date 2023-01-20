import { Feed } from "../components";
import { AppLayout } from '../layouts';

function HomePage() {
  return (
    <AppLayout
      title="Home / Twitter"
      pageDescription="Twitter clone"
    >
      <div className="mt-[70px]">
        <Feed endpoint='/api/tweets' />
      </div>
    </AppLayout>
  )
}


export default HomePage;