"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, forwardRef } from "react";
import { cn } from "../lib/utils";
import Image from "next/image";
import Preloader from "./Preloader";

const IMAGES = ["img1", "img2", "img3", "img4", "img5", "img6", "img7"];

export default function Hero() {
  const heroImgsRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    // Animate hero images and hero section
    gsap.to(heroImgsRef.current.querySelectorAll("img"), {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.25,
      delay: 9,
    });

    gsap.to(heroRef.current, {
      scale: 1.3,
      duration: 3,
      ease: "power3.inOut",
      delay: 9,
    });
  });

  return (
    <section ref={heroRef} className={cn("hero w-screen h-screen p-[3em]")}>
      <Preloader />
      <Images ref={heroImgsRef} />
    </section>
  );
}

const Images = forwardRef((_, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "hero-imgs",
        "relative",
        "size-full",
        "overflow-hidden",
        "z-0"
      )}
    >
      {IMAGES.map((img, i) => (
        <Image
          style={{
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          }}
          key={i}
          src={`/${img}.jpg`}
          alt=""
          fill
          className={cn("absolute size-full object-cover")}
        />
      ))}
    </div>
  );
});

Images.displayName = "Images";
