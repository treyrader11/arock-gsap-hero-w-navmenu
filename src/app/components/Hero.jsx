import React from "react";
import { cn } from "../lib/utils";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className={cn(
        "hero",
        "absolute",
        "top-0",
        "w-screen",
        "h-screen",
        "overflow-hidden"
      )}
    >
      <BackgroundImage src="/hero.jpg" />
      <div
        className={cn(
          "header",
          "absolute",
          "top-1/2",
          "left-1/2",
          "-translate-y-1/2",
          "-translate-x-1/2",
          "flex",
          "gap-2"
        )}
      >
        <h1
          className={cn(
            "text-white",
            "text-9xl",
            "font-black",
            "uppercase",
            "tracking-[-0.024em]",
            "leading-[100%]"
          )}
        >
          Break
        </h1>
        <sup className="relative top-[0.25em] text-white text-3xl">&copy;</sup>
      </div>
    </section>
  );
}

function BackgroundImage({ src }) {
  return (
    <div className={cn("sticky", "fixed", "top-0", "h-screen", "w-full")}>
      <Image
        priority
        alt="Image of Marcella"
        src={src}
        fill
        className={cn("object-cover", "size-full")}
      />
    </div>
  );
}
