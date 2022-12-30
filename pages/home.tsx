import { Feed } from "../components";
import { AppLayout } from '../layouts';

function HomePage() {
  return (
    <AppLayout
      title="Home / Twitter"
      pageDescription="Twitter clone"
    >
      <Feed endpoint='/api/tweets' />
    </AppLayout>
  )
}


export default HomePage;