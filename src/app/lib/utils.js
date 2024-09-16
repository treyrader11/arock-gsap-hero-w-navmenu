import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function splitTextIntoSpans(el) {
  if (el) {
    const text = el.innerText;
    const splitText = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
    el.innerHTML = splitText;
  }
}
