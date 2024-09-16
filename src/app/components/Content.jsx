import React from "react";
import { cn } from "../lib/utils";
import Nav from "./Nav";

export default function Content() {
  return (
    <div
      className={cn(
        // "website-content",
        "absolute",
        "top-0",
        "left-0",
        "size-full",
        "z-10"
      )}
    >
      <Nav />
    </div>
  );
}
