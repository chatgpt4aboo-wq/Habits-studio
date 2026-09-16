import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { house } from "@/data/collection";

/** The one thing the home page asks of anyone who scrolls to the end. */
export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  return (
    <section className="wrap py-24">
      <div className="grid gap-12 border-t border-line-dark pt-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-mark-md font-extrabold uppercase">
            Join the club
          </h2>
        </div>

        <div>
          {state === "done" ? (
            <p className="spec text-bone" role="status">
              You're in. Nothing will arrive until there is something to see.
            </p>
          ) : (
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) setState("done");
              }}
            >
              <label htmlFor="release-email" className="sr-only">
                Email address
              </label>
              <Input
                id="release-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
              />
              <Button type="submit" className="shrink-0">
                Join
              </Button>
            </form>
          )}

          <p className="spec-sm mt-6 text-bone-soft">
            {house.cities.join(" / ")} · {house.kind}
          </p>
        </div>
      </div>
    </section>
  );
}
