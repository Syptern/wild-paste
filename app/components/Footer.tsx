"use client";

import { Sun } from "lucide-react";

export function Footer() {
  const items = [
    "JUST YOUR PASTED TEXT. AND ONLY FOR A WHILE.",
    "NO LOGIN NO DRAMA, NO QUESTIONS ASKED.",
    "WANT MAGIC? WE TRIED OUR BEST",
    "JUST YOUR PASTED TEXT. AND ONLY FOR A WHILE.",
    "NO LOGIN NO DRAMA, NO QUESTIONS ASKED.",
    "WANT MAGIC? WE TRIED OUR BEST",
  ];

  return (
    <footer className="w-full bg-stone-800 text-slate-200  overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center animate-[marquee_60s_linear_infinite] md:animate-[marquee_30s_linear_infinite]"
          >
            {items.map((item, i) => (
              <div className="flex items-center" key={i}>
                <span className="mx-8 text-xs py-3">{item}</span>
                <Sun strokeWidth={1} size="1rem" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Keyframes for Tailwind arbitrary animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
}
