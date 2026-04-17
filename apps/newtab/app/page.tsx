import { Drafts } from "./components/drafts";
import { Tasks } from "./components/tasks";
import { Today } from "./components/today";

const Home = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="grid gap-4 p-4 xl:grid-cols-2">
      <div className="relative grid gap-4 xl:w-xl">
        <Tasks />
      </div>
      <div className="grid gap-4 xl:w-xl">
        <Drafts />
        <Today />
      </div>
    </div>
  </div>
);

export default Home;
