import { ClipboardPaste } from "lucide-react";
import Link from "next/link";

export const Header = () => <header className="flex justify-center items-center my-12">
          <Link href="/" className="flex items-center justify-center gap-2 ">
            <h1 className="scroll-m-20 text-center text-6xl tracking-tight text-balance">
              Wild
              <b>Paste</b>
            </h1>
            <ClipboardPaste className="inline text-2xl" size={"3.5rem"} />
          </Link>
        </header>