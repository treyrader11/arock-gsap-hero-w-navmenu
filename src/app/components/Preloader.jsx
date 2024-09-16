"use client";

import React, { useRef, forwardRef } from "react";
import { cn } from "../lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Digit = forwardRef(({ range }, ref) => (
  <div ref={ref} className={cn("digit", "relative", "top-[-15px]")}>
    {range.map((num) => (
      <div key={num} className="num">
        {num}
      </div>
    ))}
  </div>
));

Digit.displayName = "Digit";

export default function Preloader() {
  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const digit3Ref = useRef(null);
  const progressBarRef = useRef(null);
  const preLoaderRef = useRef(null);

  useGSAP(() => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        digit3Ref.current.appendChild(div);
      }
    }
    const finalDigit = document.createElement("div");
    finalDigit.className = "num";
    finalDigit.textContent = "0";
    digit3Ref.current.appendChild(finalDigit);

    // Animation function
    const animate = (digit, duration, delay = 1) => {
      const numHeight = digit.querySelector(".num").clientHeight;
      const totalDistance =
        (digit.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(digit, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    };

    // Start animations for digits and progress bar
    animate(digit3Ref.current, 5);
    animate(digit2Ref.current, 6);
    animate(digit1Ref.current, 2, 5);

    gsap.to(progressBarRef.current, {
      width: "30%",
      duration: 2,
      ease: "power4.inOut",
      delay: 7,
    });

    gsap.to(progressBarRef.current, {
      width: "100%",
      opacity: 0,
      duration: 2,
      delay: 8.5,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(preLoaderRef.current, { display: "none" });
      },
    });
  }, []);

  return (
    <div
      ref={preLoaderRef}
      className={cn(
        "pre-loader",
        "w-[200%]",
        "h-full",
        "flex",
        "justify-end",
        "items-end",
        "fixed",
        "top-0",
        "right-0",
        "gap-2",
        "overflow-hidden",
        "p-[2em]"
      )}
    >
      <p className={cn("w-max", "uppercase", "text-6xl", "leading-[60px]")}>
        Loading
      </p>
      <div
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100px, 0 100px)" }}
        className={cn(
          "counter",
          "h-[100px]",
          "flex",
          "text-8xl",
          "leading-[150px]"
        )}
      >
        <Digit ref={digit1Ref} range={[0, 1]} />
        <Digit ref={digit2Ref} range={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} />
        <Digit ref={digit3Ref} range={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
        <div className="digit-4">%</div>
      </div>
      <ProgressBar ref={progressBarRef} />
    </div>
  );
}

const ProgressBar = forwardRef((_, ref) => (
  <div
    ref={ref}
    className={cn(
      "progress-bar",
      "relative",
      "top-[-15px]",
      "w-0",
      "h-1",
      "bg-black"
    )}
  />
));

ProgressBar.displayName = "ProgressBar";
