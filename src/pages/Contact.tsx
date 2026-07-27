import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Calendar, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { PageShell, ResourceHero } from "@/components/v2/PageShell";
import { AvailabilityPicker } from "@/components/v2/AvailabilityPicker";
import { CONTACT, MAP_DIRECTIONS_URL, MAP_EMBED_URL } from "@/data/contactDetails";
import { openCalendlyPopup } from "@/lib/calendlyEmbed";

const inputClass =
  "tw:w-full tw:rounded-2xl tw:bg-espresso/[0.04] tw:px-4 tw:py-3 tw:font-sans tw:text-[14px] tw:text-espresso tw:outline-none tw:ring-1 tw:ring-ink-line tw:transition-shadow tw:duration-300 tw:placeholder:text-espresso-soft/45 tw:focus:ring-clay/50";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact-page" }),
      });
      if (!response.ok) throw new Error("Request failed");
      setSent(true);
      form.reset();
    } catch {
      setError(`We couldn't send that just now. Please email ${CONTACT.email} or call ${CONTACT.phoneDisplay}.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <ResourceHero
        index="06"
        title="Let's talk about the next right step."
        intro="Tell us where the student is today, what they are curious about, and where they want to go. We will help you see the path more clearly."
      />

      <section className="tw:bg-parchment tw:px-6 tw:pb-24 tw:md:pb-36">
        <div className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-12 tw:lg:grid-cols-[0.8fr_1.2fr]">
          <div className="tw:space-y-4">
            <ContactCard icon={<Mail />} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            <ContactCard icon={<Phone />} label="Call or WhatsApp" value={CONTACT.phoneDisplay} href={`tel:${CONTACT.phoneHref}`} />
            <ContactCard icon={<MapPin />} label="Studio" value={`${CONTACT.address.line1}, ${CONTACT.address.line2}`} href={MAP_DIRECTIONS_URL} />

            <div className="tw:rounded-[1.5rem] tw:bg-espresso tw:p-6 tw:text-parchment">
              <div className="tw:flex tw:items-center tw:gap-3">
                <Clock3 className="tw:h-4 tw:w-4 tw:text-gold" strokeWidth={1.5} />
                <span className="tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-parchment/55">Office hours</span>
              </div>
              <dl className="tw:mt-5 tw:space-y-3 tw:font-sans tw:text-[13px]">
                {CONTACT.hours.map((item) => (
                  <div key={item.days} className="tw:flex tw:justify-between tw:gap-5 tw:border-b tw:border-parchment/10 tw:pb-3 last:border-0 last:pb-0">
                    <dt className="tw:text-parchment/60">{item.days}</dt>
                    <dd className="tw:text-right tw:text-parchment/90">{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="tw:flex tw:items-center tw:gap-4 tw:px-2 tw:pt-2">
              <a href={CONTACT.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="tw:font-sans tw:text-[11px] tw:font-bold tw:text-espresso-soft/55 tw:transition-colors tw:hover:text-clay">ig</a>
              <a href={CONTACT.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="tw:font-sans tw:text-[11px] tw:font-bold tw:text-espresso-soft/55 tw:transition-colors tw:hover:text-clay">in</a>
              <span className="tw:font-sans tw:text-[11px] tw:text-espresso-soft/45">Noida · India</span>
            </div>
          </div>

          <div className="tw:space-y-6">
            <div className="tw:rounded-[2rem] tw:bg-espresso/[0.05] tw:p-2 tw:ring-1 tw:ring-ink-line">
              <form onSubmit={submit} className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment tw:p-7 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] tw:md:p-9">
                {sent ? (
                  <div className="tw:flex tw:min-h-[360px] tw:flex-col tw:items-center tw:justify-center tw:text-center">
                    <span className="tw:flex tw:h-14 tw:w-14 tw:items-center tw:justify-center tw:rounded-full tw:bg-clay tw:text-2xl tw:text-parchment">✓</span>
                    <h2 className="tw:mt-5 tw:font-display tw:text-3xl tw:text-espresso">We have your note.</h2>
                    <p className="tw:mt-3 tw:max-w-sm tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-espresso-soft/70">We will be in touch shortly. You can also choose a time directly below.</p>
                  </div>
                ) : (
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    <div className="tw:mb-3">
                      <span className="tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-clay">Start here</span>
                      <h2 className="tw:mt-3 tw:font-display tw:text-3xl tw:leading-tight tw:text-espresso">Tell us what you are figuring out.</h2>
                    </div>
                    <div className="tw:grid tw:gap-3 tw:sm:grid-cols-2">
                      <input name="name" required placeholder="Parent / Student Name" className={inputClass} />
                      <input name="grade" placeholder="Current Grade" className={inputClass} />
                      <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
                      <input name="email" type="email" required placeholder="Email" className={inputClass} />
                    </div>
                    <textarea name="message" required rows={5} placeholder="Share the student's interests, target countries or biggest question." className={inputClass} />
                    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="tw:hidden" />
                    {error ? <p role="alert" className="tw:font-sans tw:text-[12px] tw:text-clay">{error}</p> : null}
                    <button type="submit" disabled={busy} className="tw:group tw:mt-1 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-full tw:bg-espresso tw:py-3.5 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-500 tw:hover:bg-clay tw:disabled:cursor-wait tw:disabled:opacity-60">
                      {busy ? "Sending…" : "Send My Question"}
                      <ArrowUpRight className="tw:h-4 tw:w-4 tw:transition-transform tw:duration-500 tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4 tw:rounded-[1.5rem] tw:bg-gold-soft/35 tw:p-5">
              <div>
                <p className="tw:font-display tw:text-xl tw:text-espresso">Prefer a calendar?</p>
                <p className="tw:mt-1 tw:font-sans tw:text-[12px] tw:text-espresso-soft/65">Pick a consultation time that works for you.</p>
              </div>
              <button type="button" onClick={() => openCalendlyPopup()} className="tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-espresso tw:px-4 tw:py-2.5 tw:font-sans tw:text-xs tw:font-semibold tw:text-parchment tw:transition-colors tw:hover:bg-clay">
                <Calendar className="tw:h-3.5 tw:w-3.5" strokeWidth={1.5} /> Pick a time
              </button>
              <AvailabilityPicker />
            </div>
          </div>
        </div>

        <div className="tw:mx-auto tw:mt-16 tw:max-w-6xl tw:overflow-hidden tw:rounded-[2rem] tw:bg-espresso/[0.05] tw:p-2 tw:ring-1 tw:ring-ink-line">
          <div className="tw:relative tw:overflow-hidden tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment">
            <iframe title="The Edge Way location in Noida" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="tw:h-[340px] tw:w-full tw:border-0 tw:grayscale tw:transition-[filter] tw:duration-500 tw:hover:grayscale-0 tw:md:h-[430px]" />
            <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noreferrer" className="tw:absolute tw:bottom-5 tw:left-5 tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-parchment/95 tw:px-4 tw:py-2.5 tw:font-sans tw:text-xs tw:font-semibold tw:text-espresso tw:shadow-lg tw:backdrop-blur-md tw:hover:bg-white">
              <MapPin className="tw:h-3.5 tw:w-3.5 tw:text-clay" /> Get directions <ArrowUpRight className="tw:h-3.5 tw:w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ContactCard({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="tw:group tw:flex tw:items-start tw:gap-4 tw:rounded-[1.5rem] tw:bg-espresso/[0.04] tw:p-5 tw:ring-1 tw:ring-ink-line tw:transition-colors tw:hover:bg-clay/[0.08]">
      <span className="tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-xl tw:bg-parchment tw:text-clay tw:shadow-sm"><span className="tw:h-4 tw:w-4">{icon}</span></span>
      <span className="tw:min-w-0">
        <span className="tw:block tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/45">{label}</span>
        <span className="tw:mt-1 block tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-espresso">{value}</span>
      </span>
      <ArrowUpRight className="tw:ml-auto tw:h-4 tw:w-4 tw:shrink-0 tw:text-espresso-soft/35 tw:transition-transform tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5" strokeWidth={1.5} />
    </a>
  );
}
