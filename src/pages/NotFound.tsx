import { Monogram } from "@/brand/Marks";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Monogram light className="h-12 w-12 opacity-80" />
      <p className="spec mt-10 text-signal">Error 404</p>
      <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase">Not in the archive</h1>
      <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
        This page is not part of the collection. The twenty that are, are one click away.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/collection">View the collection</ButtonLink>
        <ButtonLink to="/" variant="outline">
          Back to the cover
        </ButtonLink>
      </div>
    </div>
  );
}
