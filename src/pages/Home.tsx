import { Hero } from "./sections/Hero";
import { Statement } from "./sections/Statement";
import { CapsuleSpread } from "./sections/CapsuleSpread";
import { Waitlist } from "./sections/Waitlist";
import { SleeveTapeBand } from "@/components/layout/SleeveTape";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <SleeveTapeBand tone="bone" />
      <CapsuleSpread />
      <Waitlist />
    </>
  );
}
