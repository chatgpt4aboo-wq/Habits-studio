import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { house } from "@/data/collection";
import { policies } from "@/data/policies";

const topics = ["General", ...policies.contact.lines.map((line) => line.label)];

/** The Input is cut for the void; on the sheet it takes ink and the light rule. */
const onSheet =
  "border-line-light text-ink placeholder:text-ink-faint focus:border-ink-soft text-[0.9375rem] font-normal normal-case tracking-normal";

/**
 * Plain page, plainly set. Somewhere to write to, and what to write about.
 *
 * There is no mail backend, so the form does not pretend to send: it opens the
 * visitor's own mail app with the message already written, addressed to the
 * studio. Swap `onSubmit` for a real endpoint when there is one.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="sheet min-h-[70vh] bg-bone">
      <div className="wrap py-16 lg:py-24">
        <h1 className="font-body text-[clamp(2.25rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
          Contact
        </h1>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
          Write to the studio. Someone reads every message and replies within two working days.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <dl className="divide-y divide-line-light self-start border-y border-line-light">
            <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="spec text-ink-faint">Email</dt>
              <dd>
                <a
                  href={`mailto:${policies.contact.email}`}
                  className="text-[1.0625rem] text-ink underline underline-offset-4 transition-colors hover:text-navy"
                >
                  {policies.contact.email}
                </a>
              </dd>
            </div>

            <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="spec text-ink-faint">Instagram</dt>
              <dd className="text-[1.0625rem] text-ink">{policies.contact.instagram}</dd>
            </div>

            <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="spec text-ink-faint">Studio</dt>
              <dd className="text-[1.0625rem] text-ink">{house.cities.join(" / ")}</dd>
            </div>

            <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="spec text-ink-faint">Hours</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-ink-soft">
                {policies.contact.hours}
              </dd>
            </div>

            {policies.contact.lines.map((line) => (
              <div key={line.label} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="spec text-ink-faint">{line.label}</dt>
                <dd className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
                  {line.detail}
                </dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="contact-form">
            <h2 id="contact-form" className="spec text-navy">
              Send a message
            </h2>

            {sent ? (
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink" role="status">
                Your mail app should have opened with the message written. If it did not, write to{" "}
                {policies.contact.email} directly.
              </p>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  const subject = `${topic}${order.trim() ? `, order ${order.trim()}` : ""}`;
                  const body = `${message.trim()}\n\n${name.trim()}\n${email.trim()}`;
                  window.location.href =
                    `mailto:${policies.contact.email}` +
                    `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="spec text-ink-faint">Name</span>
                    <Input
                      className={`mt-2 ${onSheet}`}
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="spec text-ink-faint">Email</span>
                    <Input
                      className={`mt-2 ${onSheet}`}
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="spec text-ink-faint">About</span>
                    <select
                      className="mt-2 h-11 w-full border border-line-light bg-transparent px-4 text-ink focus:border-ink-soft"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                    >
                      {topics.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="spec text-ink-faint">Order number (optional)</span>
                    <Input
                      className={`mt-2 ${onSheet}`}
                      value={order}
                      onChange={(event) => setOrder(event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="spec text-ink-faint">Message</span>
                  <textarea
                    className="mt-2 min-h-40 w-full border border-line-light bg-transparent px-4 py-3 text-[0.9375rem] leading-relaxed text-ink focus:border-ink-soft"
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </label>

                <Button type="submit" variant="ink">
                  Send
                </Button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
