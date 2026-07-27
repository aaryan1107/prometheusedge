import type { Env } from "../_shared/types";

interface EnquiryBody {
  name?: string;
  email?: string;
  phone?: string;
  grade?: string;
  message?: string;
  source?: string;
  /** Honeypot — real users never fill this; bots usually do. */
  website?: string;
}

const MAX = { name: 120, email: 200, phone: 40, grade: 60, message: 4000, source: 60 };

function clamp(value: string | undefined, limit: number): string | null {
  const trimmed = (value ?? "").trim();
  return trimmed ? trimmed.slice(0, limit) : null;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/**
 * POST /api/enquiry — stores a contact-form submission in D1.
 *
 * Public endpoint, so it validates and length-caps every field and carries a
 * honeypot. Read back via the admin dashboard.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: EnquiryBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Silently accept honeypot hits so bots don't learn they were caught.
  if (body.website) return json({ ok: true });

  const name = clamp(body.name, MAX.name);
  const email = clamp(body.email, MAX.email);
  const message = clamp(body.message, MAX.message);

  if (!name || !email || !message) {
    return json({ error: "Name, email and message are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "That email address doesn't look valid." }, 400);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO enquiries (name, email, phone, grade, message, source, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        name,
        email,
        clamp(body.phone, MAX.phone),
        clamp(body.grade, MAX.grade),
        message,
        clamp(body.source, MAX.source) ?? "contact",
        Date.now(),
      )
      .run();
  } catch {
    return json({ error: "Could not save your enquiry. Please email us directly." }, 500);
  }

  return json({ ok: true });
};
