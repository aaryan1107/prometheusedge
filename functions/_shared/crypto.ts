const MAX_SIGNATURE_AGE_MS = 5 * 60 * 1000;

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verifies Calendly's `Calendly-Webhook-Signature` header, formatted as
 * `t=<unix seconds>,v1=<hex hmac-sha256 of "${t}.${rawBody}">`.
 * Rejects stale timestamps (replay protection) as well as bad signatures.
 */
export async function verifyCalendlySignature(
  rawBody: string,
  signatureHeader: string | null,
  signingKey: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!signatureHeader) return { ok: false, reason: "missing signature header" };

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key?.trim(), value?.trim()];
    }),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return { ok: false, reason: "malformed signature header" };

  const ageMs = Date.now() - Number(timestamp) * 1000;
  if (!Number.isFinite(ageMs) || ageMs > MAX_SIGNATURE_AGE_MS || ageMs < -MAX_SIGNATURE_AGE_MS) {
    return { ok: false, reason: "signature timestamp too old or invalid" };
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = toHex(mac);

  if (!timingSafeEqual(expected, signature)) {
    return { ok: false, reason: "signature mismatch" };
  }
  return { ok: true };
}
