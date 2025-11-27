"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { ExpiryDatePicker } from "../components/ExpiryDatePicker";
import Link from "next/link";

export default function Home() {
  const [pin, setPin] = useState("");

  return (
    <div className="flex items-center justify-center font-sans">
      <main className="flex flex-col gap-4 items-center w-2xl p-4 mb-20">
        <Link href="/">
          <Button variant="secondary" className="mt-20 mb-8 cursor-pointer">
            GO BACK
          </Button>
        </Link>

        <h1 className="text-7xl">PasteBin</h1>
        <h2 className="text-4xl font-normal my-4 leading-7 text-center">
          Share code and text snippets instantly!
        </h2>

        <div className="w-full">
          <Label htmlFor="text" className="text-xl md:text-2xl font-normal">
            <p className="mb-1 mt-2">Paste the content here</p>
          </Label>
          <Textarea
            name="text"
            id="text"
            placeholder="Paste your text here"
            className="h-[300px]"
          />
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="text" className="text-xl md:text-2xl font-normal">
              Expiration
            </Label>
            <ExpiryDatePicker />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="pin" className="text-xl md:text-2xl font-normal">
                PIN
              </Label>

              <label className="inline-flex items-center">
                <input
                  disabled
                  type="checkbox"
                  className="sr-only peer"
                  checked={pin.length > 0}
                  readOnly
                />
                <div className="relative w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-600 rounded-full peer-checked:bg-stone-400 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-stone-800 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            <Input
              type="password"
              placeholder="ENTER PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full cursor-pointer" size="lg">
          CREATE PASTE
        </Button>
      </main>
    </div>
  );
}
