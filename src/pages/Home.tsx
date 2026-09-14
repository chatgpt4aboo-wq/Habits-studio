import { Hero } from "./sections/Hero";
import { Statement } from "./sections/Statement";
import { CapsuleIndex } from "./sections/CapsuleIndex";
import { Waitlist } from "./sections/Waitlist";
import { SleeveTapeBand } from "@/components/layout/SleeveTape";
import { CoreRow } from "./sections/CoreRow";

export default function Home() {
  return (
    <>
      <Hero />
      <SleeveTapeBand tone="bone" />
      <Statement />
      <CoreRow />
      <CapsuleIndex />
      <Waitlist />
    </>
  );
}
