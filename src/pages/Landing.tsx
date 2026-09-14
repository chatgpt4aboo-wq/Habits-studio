import { Hero } from "./sections/Hero";
import { Marquee } from "./sections/Marquee";
import { Principles } from "./sections/Principles";
import { Method } from "./sections/Method";
import { Features } from "./sections/Features";
import { Closing } from "./sections/Closing";

export default function Landing() {
  return (
    <>
      <Hero />
      <Marquee />
      <Principles />
      <Method />
      <Features />
      <Closing />
    </>
  );
}
