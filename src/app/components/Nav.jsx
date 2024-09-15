"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { cn } from "../lib/utils";

gsap.registerPlugin(useGSAP);

const MENU_SUB_ITEMS = [
  {
    title: "Connect",
    links: ["Break", "Explore", "Break", "Contact Us"],
    address: {
      city: "Ocean City",
      business: "Rhythmic Sound",
      street: "2000 Coastal Hwy",
      location: "Ocean City, MD 21842",
    },
  },
  {
    title: "Instagram",
    links: ["Youtube", "Spotify", "Mixcloud", "Email"],
    address: {
      city: "Vice City",
      business: "Echo Beats",
      street: "933 South View Ave",
      location: "Vice City, VC 3270",
    },
  },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuLogoImgRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuSubItemsRef = useRef([]);
  const heroRef = useRef(null);
  const imageRefs = useRef([]);
  const defaultEase = "power4.inOut";
  const mouse = useRef({ x: 0, y: 0 });
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  const scales = [0.81, 0.84, 0.87, 0.9];

  // Mouse movement and parallax effect
  useGSAP(() => {
    const updateParallaxEffect = () => {
      let dx = mouse.current.x - cx;
      let dy = mouse.current.y - cy;
      let tiltx = (dy / cy) * 20;
      let tilty = (dx / cx) * 20;

      gsap.to(menuRef.current, {
        duration: 2,
        transform: `rotate3d(${tiltx}, ${tilty}, 0, 15deg)`,
        ease: "power3.out",
      });

      imageRefs.current.forEach((img, index) => {
        let parallaxX = -(dx * (index + 1)) / 100;
        let parallaxY = -(dy * (index + 1)) / 100;

        let transformStyles = `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY}px)) scale(${scales[index]})`;
        gsap.to(img, {
          duration: 2,
          transform: transformStyles,
          ease: "power3.out",
        });
      });
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      updateParallaxEffect();
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    };
    window.addEventListener("resize", handleResize);
  }, [scales]);

  useGSAP(() => {
    gsap.set(menuLogoImgRef.current, { y: 50 });
    gsap.set(menuLinksRef.current, { y: 40 });
    gsap.set(menuSubItemsRef.current, { y: 12 });
    gsap.set(imageRefs.current.slice(1), { top: "150%" });
  }, []);

  const openMenu = () => {
    gsap.to(menuRef.current, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      pointerEvents: "all",
      duration: 1.25,
      ease: defaultEase,
    });

    gsap.to(heroRef.current, {
      top: "-50%",
      opacity: 0,
      duration: 1.25,
      ease: defaultEase,
    });

    gsap.to(menuLogoImgRef.current, {
      y: 0,
      duration: 1,
      delay: 0.75,
      ease: "power3.out",
    });

    gsap.to(menuLinksRef.current, {
      y: 0,
      duration: 1,
      stagger: 0.075,
      delay: 1,
      ease: "power3.out",
    });

    gsap.to(menuSubItemsRef.current, {
      y: 0,
      duration: 0.75,
      stagger: 0.05,
      delay: 1,
      ease: "power3.out",
    });

    gsap.to(imageRefs.current.slice(1), {
      top: "50%",
      duration: 1.25,
      ease: defaultEase,
      stagger: 0.1,
      delay: 0.25,
      onComplete: () => {
        gsap.set(heroRef.current, { top: "50%" });
        setIsOpen(true);
      },
    });
  };

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      pointerEvents: "none",
      duration: 1.25,
      ease: defaultEase,
    });

    gsap.to(heroRef.current, {
      top: "0%",
      opacity: 1,
      duration: 1.25,
      ease: defaultEase,
      onComplete: () => {
        gsap.set(menuRef.current, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        gsap.set(menuLogoImgRef.current, { y: 50 });
        gsap.set(menuLinksRef.current, { y: 40 });
        gsap.set(menuSubItemsRef.current, { y: 12 });
        gsap.set(imageRefs.current.slice(1), { top: "150%" });
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed",
          "top-0",
          "w-full",
          "flex",
          "justify-between",
          "items-center",
          "z-30",
          "py-6",
          "px-8"
        )}
      >
        <div className={cn("logo", "w-6")}>
          <Image
            width={40}
            height={40}
            className={cn({ hidden: isOpen })} // needs work
            src="/logo.png"
            alt="logo"
          />
        </div>

        <button
          className={cn("text-white", "menu-open", "cursor-pointer")}
          onClick={isOpen ? closeMenu : openMenu}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        }}
        ref={menuRef}
        className={cn(
          "fixed",
          "inset-0",
          "p-6",
          "bg-[#101010]",
          "text-white",
          "flex",
          "gap-6",
          "overflow-hidden",
          "z-20",
          "pointer-events-none"
        )}
      >
        <MenuLogo ref={menuLogoImgRef} />
        <div className={cn("size-full", "relative", "hidden", "md:grid")}>
          {[...Array(4)].map((_, i) => (
            <BackgroundImage key={i} imageRefs={imageRefs} index={i} />
          ))}
        </div>

        <div className={cn("py-10", "flex", "flex-col", "gap-10")}>
          <MenuLogo ref={menuLogoImgRef} />
          <MenuLinks menuLinksRef={menuLinksRef} />
          <MenuSubItems menuSubItemsRef={menuSubItemsRef} />
        </div>
      </div>
    </>
  );
}

function BackgroundImage({ imageRefs, index }) {
  const opacityValues = [0.9, 0.7, 0.5, 0.3];
  const opacity = opacityValues[index];
  return (
    <div
      ref={(el) => {
        if (el) imageRefs.current[index] = el;
      }}
      id={`img-${index + 1}`}
      style={{ opacity }}
      className={cn(
        `img-${index + 1}`,
        "absolute", // try doing it with grid
        "top-1/2",
        "left-1/2",
        "size-full"
      )}
    >
      <Image
        fill
        src={`/hero.jpg`}
        alt={`Background ${index + 1}`}
        className={cn("object-cover", "size-full")}
      />
    </div>
  );
}

function MenuLinks({ menuLinksRef }) {
  return (
    <div className={cn("")}>
      {["about", "story", "projects", "releases"].map((link, i) => (
        <p
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          ref={(el) => {
            if (el) menuLinksRef.current[i] = el;
          }}
          key={i}
          className={cn("relative", "text-4xl", "font-extrabold")}
        >
          {link}
        </p>
      ))}
    </div>
  );
}

function MenuLogo({ ref }) {
  return (
    <div
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      className={cn("menu-logo", "w-12")}
    >
      <Image
        width={100}
        height={100}
        ref={ref}
        src="/logo.png"
        alt="Logo"
        className="relative"
      />
    </div>
  );
}

function MenuSubItems({ menuSubItemsRef }) {
  return (
    <div className={cn("flex w-full")}>
      {MENU_SUB_ITEMS.map((section, i) => (
        <div
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          ref={(el) => {
            if (el) menuSubItemsRef.current[i] = el;
          }}
          key={i}
          className={cn("menu-sub-item", "relative", "menu-sub-col")}
        >
          <div className="menu-sub-item">
            <p>{section.title}</p>
          </div>
          {section.links.map((link, i) => (
            <div
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              ref={(el) => {
                if (el) menuSubItemsRef.current[i] = el;
              }}
              key={i}
              className="menu-sub-item"
            >
              <p>{link}</p>
            </div>
          ))}
          <br />
          <div className="menu-sub-item">
            <p>{section.address.city}</p>
          </div>
          <div className="menu-sub-item">
            <p>{section.address.business}</p>
          </div>
          <div className="menu-sub-item">
            <p>{section.address.street}</p>
          </div>
          <div className="menu-sub-item">
            <p>{section.address.location}</p>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}
