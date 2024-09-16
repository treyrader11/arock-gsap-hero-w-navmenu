"use client";

import { cn, splitTextIntoSpans } from "../lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Nav() {
  const navRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.set(navRef.current, { y: -150 });

    // Reveal navigation and header
    gsap.to(navRef.current, {
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 11,
    });

    if (headerRef.current)
      splitTextIntoSpans(headerRef.current.querySelector("h1"));

    gsap.to(headerRef.current.querySelectorAll("h1 span"), {
      top: "0px",
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 11,
    });
  });

  return (
    <>
      <nav
        className={cn(
          "fixed",
          "top-0",
          "w-full",
          "z-10",
          "flex",
          "uppercase",
          "text-[#ebdc0b]",
          // "font-light",
          "text-4xl"
        )}
        ref={navRef}
      >
        <div className="flex-1 logo">
          <p>Logo</p>
        </div>
        <div className={cn("site-info", "text-center", "flex-1")}>
          <p>(Photographer, creative director, filmmaker)</p>
        </div>
        <div className="flex-1 text-right">
          <p>Menu</p>
        </div>
      </nav>
      <div
        ref={headerRef}
        className={cn(
          "header",
          "absolute",
          "top-1/2",
          "left-1/2",
          "-translate-y-1/2",
          "-translate-x-1/2"
        )}
      >
        <Headline />
      </div>
    </>
  );
}

function Headline() {
  return (
    <h1
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className={cn(
        "text-[20vw]",
        "font-light",
        "text-yellow-400",
        "uppercase"
      )}
    >
      Howard
    </h1>
  );
}
