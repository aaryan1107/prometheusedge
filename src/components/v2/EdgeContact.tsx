import { useState, type FormEvent } from "react";
import { ArrowUpRight, Calendar, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { AvailabilityPicker } from "./AvailabilityPicker";
import { openCalendlyPopup } from "@/lib/calendlyEmbed";
import { CONTACT } from "@/data/contactDetails";

type FormValues = {
  name: string;
  grade: string;
  phone: string;
  email: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof Omit<FormValues, "website">, string>>;

const initialValues: FormValues = {
  name: "",
  grade: "",
  phone: "",
  email: "",
  message: "",
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (!values.name.trim()) errors.name = "Please add a parent or student name.";
  if (!values.grade.trim()) errors.grade = "Please add the current grade.";
  if (!values.phone.trim()) errors.phone = "Please add a phone number.";
  else if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = "Please enter a valid phone number.";
  if (!values.email.trim()) errors.email = "Please add an email address.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please share a little context.";
  else if (values.message.trim().length < 12) errors.message = "Please add a few more details.";

  return errors;
}

export function EdgeContact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field as keyof FieldErrors]) return current;
      const next = { ...current };
      delete next[field as keyof FieldErrors];
      return next;
    });
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const nextErrors = validate(values);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          grade: values.grade.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: values.website,
          source: "homepage-contact",
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Request failed");
      }

      setSent(true);
      setValues(initialValues);
      setFieldErrors({});
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : "We couldn't send that just now. Please email us directly.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="tw:bg-parchment-deep tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
              Book a Free Consultation
            </span>
            <h2 className="tw:mt-4 tw:font-display tw:text-4xl tw:leading-[1.08] tw:text-espresso tw:md:text-[2.9rem]">
              Start building your roadmap.
            </h2>
            <p className="tw:mt-6 tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/75">
              Use the first conversation to understand fit, timelines, scholarship possibilities, country
              choices and what your child should focus on next.
            </p>

            <button
              type="button"
              onClick={() => openCalendlyPopup()}
              className="tw:group tw:mt-8 tw:flex tw:items-center tw:gap-3 tw:rounded-full tw:bg-espresso tw:py-2 tw:pl-6 tw:pr-2 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-clay tw:active:scale-[0.98]"
            >
              <Calendar className="tw:h-4 tw:w-4" strokeWidth={1.5} />
              Pick a time on Calendly
              <span className="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5">
                <ArrowUpRight className="tw:h-4 tw:w-4" strokeWidth={1.5} />
              </span>
            </button>

            {/* Additive: real live slots when the Calendly API connection is set up.
                Renders nothing if unavailable, so the button above always works. */}
            <AvailabilityPicker />

            <ul className="tw:mt-10 tw:flex tw:flex-col tw:gap-3 tw:font-sans tw:text-[14px] tw:text-espresso-soft/80">
              <li><b className="tw:text-espresso">Email:</b> {CONTACT.email}</li>
              <li><b className="tw:text-espresso">Phone:</b> {CONTACT.phoneDisplay}</li>
              <li><b className="tw:text-espresso">Location:</b> {CONTACT.address.full}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="tw:rounded-[2rem] tw:bg-espresso/[0.05] tw:p-2 tw:ring-1 tw:ring-ink-line">
              <form
                onSubmit={submit}
                noValidate
                className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment tw:p-7 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] tw:md:p-9"
              >
                {sent ? (
                  <div className="tw:flex tw:min-h-[360px] tw:flex-col tw:items-center tw:justify-center tw:text-center">
                    <span className="tw:flex tw:h-14 tw:w-14 tw:items-center tw:justify-center tw:rounded-full tw:bg-clay tw:text-parchment">
                      <Check className="tw:h-6 tw:w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="tw:mt-5 tw:font-display tw:text-2xl tw:text-espresso">Thank you.</h3>
                    <p className="tw:mt-2 tw:max-w-xs tw:font-sans tw:text-[14px] tw:text-espresso-soft/70">
                      We've received your details and will be in touch shortly to schedule your free consultation.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setError("");
                      }}
                      className="tw:mt-6 tw:font-sans tw:text-[12px] tw:font-semibold tw:text-clay tw:underline-offset-4 tw:transition-colors tw:hover:text-espresso tw:hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    <div className="tw:grid tw:gap-3 tw:sm:grid-cols-2">
                      <FormField
                        name="name"
                        placeholder="Parent / Student Name"
                        value={values.name}
                        error={fieldErrors.name}
                        onChange={(value) => updateField("name", value)}
                      />
                      <FormField
                        name="grade"
                        placeholder="Current Grade"
                        value={values.grade}
                        error={fieldErrors.grade}
                        onChange={(value) => updateField("grade", value)}
                      />
                      <FormField
                        name="phone"
                        placeholder="Phone"
                        type="tel"
                        value={values.phone}
                        error={fieldErrors.phone}
                        onChange={(value) => updateField("phone", value)}
                      />
                      <FormField
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={values.email}
                        error={fieldErrors.email}
                        onChange={(value) => updateField("email", value)}
                      />
                    </div>
                    <div>
                      <textarea
                        id="edge-contact-message"
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        placeholder="Share the student's grade, interests, target countries or biggest question."
                        aria-invalid={fieldErrors.message ? "true" : "false"}
                        aria-describedby={fieldErrors.message ? "edge-contact-message-error" : undefined}
                        className={`tw:w-full tw:rounded-2xl tw:bg-espresso/[0.04] tw:px-4 tw:py-3 tw:font-sans tw:text-[14px] tw:text-espresso tw:outline-none tw:ring-1 tw:transition-shadow tw:duration-300 tw:placeholder:text-espresso-soft/45 tw:focus:ring-clay/50 ${
                          fieldErrors.message ? "tw:ring-clay/70" : "tw:ring-ink-line"
                        }`}
                      />
                      {fieldErrors.message ? (
                        <p id="edge-contact-message-error" className="tw:mt-1.5 tw:font-sans tw:text-[11px] tw:font-medium tw:text-clay">
                          {fieldErrors.message}
                        </p>
                      ) : null}
                    </div>
                    <input
                      name="website"
                      value={values.website}
                      onChange={(event) => updateField("website", event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="tw:hidden"
                    />
                    {error ? (
                      <div role="alert" className="tw:rounded-2xl tw:bg-clay/[0.08] tw:px-4 tw:py-3 tw:font-sans tw:text-[12px] tw:leading-relaxed tw:text-clay">
                        {error}{" "}
                        <a className="tw:font-semibold tw:underline tw:underline-offset-4" href={`mailto:${CONTACT.email}`}>
                          {CONTACT.email}
                        </a>
                      </div>
                    ) : (
                      <p className="tw:px-1 tw:font-sans tw:text-[12px] tw:text-espresso-soft/55">
                        Prefer email?{" "}
                        <a className="tw:font-semibold tw:text-clay tw:underline-offset-4 tw:hover:underline" href={`mailto:${CONTACT.email}`}>
                          Write to {CONTACT.email}
                        </a>
                        .
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={busy}
                      className="tw:group tw:mt-1 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-full tw:bg-espresso tw:py-3.5 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-clay tw:active:scale-[0.98] tw:disabled:cursor-wait tw:disabled:opacity-65"
                    >
                      {busy ? "Sending your question..." : "Send My Question"}
                      <ArrowUpRight className="tw:h-4 tw:w-4 tw:transition-transform tw:duration-700 tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({
  error,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  error?: string;
  name: keyof Omit<FormValues, "message" | "website">;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  const id = `edge-contact-${name}`;

  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`tw:w-full tw:rounded-2xl tw:bg-espresso/[0.04] tw:px-4 tw:py-3 tw:font-sans tw:text-[14px] tw:text-espresso tw:outline-none tw:ring-1 tw:transition-shadow tw:duration-300 tw:placeholder:text-espresso-soft/45 tw:focus:ring-clay/50 ${
          error ? "tw:ring-clay/70" : "tw:ring-ink-line"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="tw:mt-1.5 tw:font-sans tw:text-[11px] tw:font-medium tw:text-clay">
          {error}
        </p>
      ) : null}
    </div>
  );
}
