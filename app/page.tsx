import Image from "next/image";
import PasteEditor from "./components/PasteEditor";
import { ClipboardPaste } from "lucide-react";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex flex-col min-h-screen max-w-4xl w-full my-20">
        <div className="flex items-center justify-center gap-2 mb-12">
          <h1 className="scroll-m-20 text-center text-7xl tracking-tight text-balance">
            Wild
            <b>Paste</b>
          </h1>

          <ClipboardPaste className="inline text-2xl" size={"4rem"} />
        </div>

        <div>
          <PasteEditor></PasteEditor>
        </div>
      </main>
    </div>
  );
}
