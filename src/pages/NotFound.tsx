import { ButtonLink } from "@/components/ui/Button";
import { Mark } from "@/brand/Logo";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Mark className="h-10 w-10" />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-4 font-display text-display-lg">Nothing is kept here.</h1>
      <p className="mt-3 max-w-prose text-ink-soft">
        This page isn't part of the studio. The grid you're after is one click away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/studio">Open the studio</ButtonLink>
        <ButtonLink to="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
