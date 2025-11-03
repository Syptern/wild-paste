import Image from "next/image";
import PasteEditor from "./components/PasteEditor";
import { ClipboardPaste } from "lucide-react";
export default function Home() {
  return (
    <div className="flex  items-center justify-center font-sans">
      <main className="flex flex-col  max-w-4xl w-full ">
        <div>
          <PasteEditor></PasteEditor>
        </div>
      </main>
    </div>
  );
}
