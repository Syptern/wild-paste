import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export const HomePageHeader = () => (
  <header className="flex justify-center items-center my-12 font-sans">
    <div className="flex flex-col items-center justify-center gap-10 ">
      <h1 className="text-6xl lg:text-7xl">
        {" "}
        Paste it. Share it. <br /> Forget it existed.{" "}
      </h1>
      <div className="flex gap-2 items-center lg:mt-2  [transform:scaleY(1.30)] font-medium text-2xl">
        <span>Chaos</span>
        <MoveRight strokeWidth={1} />
        <span>Copy</span>
        <MoveRight strokeWidth={1} />
        <span>Peace</span>
      </div>
      <Link href="/new">
        <Button className="cursor-pointer">GET STARTED</Button>
      </Link>
    </div>
  </header>
);
