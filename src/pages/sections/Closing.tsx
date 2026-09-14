import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Mark } from "@/brand/Logo";

export function Closing() {
  return (
    <section className="wrap py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-xl border border-line bg-ink px-6 py-16 text-center text-paper sm:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--paper)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--paper)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative">
          <Mark className="mx-auto h-8 w-8" accent="volt" />
          <h2 className="mx-auto mt-8 max-w-2xl font-display text-display-lg">
            One practice, marked tonight, beats a perfect system next Monday.
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-paper/70">
            The studio opens empty and free. Load the demo to look around, or design your first
            practice and start the grid.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink to="/studio" size="lg" variant="volt">
              Open the studio
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              to="/brand"
              size="lg"
              variant="ghost"
              className="text-paper/80 hover:bg-paper/10 hover:text-paper"
            >
              Read the brand book
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
