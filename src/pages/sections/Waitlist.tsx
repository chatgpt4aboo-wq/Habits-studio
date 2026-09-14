import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { house } from "@/data/collection";

/**
 * The collection is a concept portfolio, so there is nothing to check out —
 * the release list is the call to action.
 */
export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  return (
    <section className="wrap py-24">
      <div className="grid gap-12 border-t border-line-dark pt-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="spec text-amber">Release list</p>
          <h2 className="mt-5 font-display text-mark-md font-extrabold uppercase">
            First look, first pairs
          </h2>
          <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
            The long sleeve collection is a concept portfolio. Leave an address and you will hear
            when pieces are cut for release — nothing else.
          </p>
        </div>

        <div>
          {state === "done" ? (
            <p className="spec text-bone" role="status">
              On the list. Nothing else will arrive until there is something to see.
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
