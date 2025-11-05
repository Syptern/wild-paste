import { ClipboardPaste } from "lucide-react";

export const HomePageHeader = () => <header className="flex justify-center items-center my-12">
          <a href="/" className="flex items-center justify-center gap-2 ">
            <h1 className="scroll-m-20 text-center text-6xl tracking-tight text-balance">
              Wild
              <b>Paste</b>
            </h1>
            <ClipboardPaste className="inline text-2xl" size={"3.5rem"} />
          </a>
        </header>