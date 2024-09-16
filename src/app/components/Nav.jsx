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

    // const splitTextIntoSpans = (element) => {
    //   if (element) {
    //     const text = element.innerText;
    //     const splitText = text
    //       .split("")
    //       .map((char) => `<span>${char}</span>`)
    //       .join("");
    //     element.innerHTML = splitText;
    //   }
    // };
    if (headerRef.current) {
      splitTextIntoSpans(headerRef.current.querySelector("h1"));
    }

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
      <nav ref={navRef}>
        <div className="logo">
          <p>Logo</p>
        </div>
        <div className="site-info">
          <p>(Photographer, creative director, filmmaker)</p>
        </div>
        <div className="menu">
          <p>Menu</p>
        </div>
      </nav>
      <div ref={headerRef} className="header">
        <h1>Howard</h1>
      </div>
    </>
  );
}
