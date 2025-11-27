import { FlipBook } from "./components/FlipBook";
import { HomePageHeader } from "./components/HomePageHeader";
import { TopBar } from "./components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar></TopBar>

      <HomePageHeader />
      <div className="flex  items-center justify-center font-sans">
        <main className="flex flex-col items-center max-w-4xl h-[700px] md:h-[1000px] w-full">
          <FlipBook />
          <h2 className="text-6xl mt-12 mb-20">PasteBin</h2>
        </main>
      </div>
    </>
  );
}
