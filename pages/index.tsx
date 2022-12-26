import { Feed, SideMenu } from "../components";

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <SideMenu />
      <Feed />
    </div>
  )
}
