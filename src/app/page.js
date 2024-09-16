import Content from "./components/Content";
import Hero from "./components/Hero";
import { cn } from "./lib/utils";

export default function Home() {
  return (
    <main>
      <Hero />
      <Content />
    </main>
  );
}
