import { Hero } from "./sections/Hero";
import { Statement } from "./sections/Statement";
import { CapsuleSpread } from "./sections/CapsuleSpread";
import { OnBody } from "./sections/OnBody";
import { Waitlist } from "./sections/Waitlist";
import { SleeveTapeBand } from "@/components/layout/SleeveTape";

export default function Home() {
  return (
    <>
      <Hero />
      <SleeveTapeBand tone="bone" />
      <Statement />
      <CapsuleSpread />
      <OnBody />
      <Waitlist />
    </>
  );
}
