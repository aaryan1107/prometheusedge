/**
 * Single source of truth for contact details, so the nav, footer, contact page
 * and WhatsApp button can never drift apart.
 *
 * NOTE: the address below is taken from prometheusedge.com/contact. The older
 * copy elsewhere on this site said "Sector 122, Noida 201301" — worth
 * confirming which is current before launch.
 */
export const CONTACT = {
  email: "info@theedgeway.com",
  phoneDisplay: "+91 926-612-0527",
  phoneHref: "+919266120527",
  whatsapp: "919266120527",
  address: {
    line1: "Jaypee Wishtown, I-7, Asgerpur",
    line2: "Sector 131, Noida, Uttar Pradesh 201304",
    full: "Jaypee Wishtown, I-7, Asgerpur, Sector 131, Noida, Uttar Pradesh 201304",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 – 16:00" },
    { days: "Saturday", time: "11:00 - 16:00"}, 
    { days: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://www.instagram.com/prometheus.edge/",
    linkedin: "https://www.linkedin.com/company/prometheus-edge/",
    facebook: "https://www.facebook.com/",
  },
} as const;

const encodedAddress = encodeURIComponent(CONTACT.address.full);

/** Keyless Google Maps embed — no API key or billing account required. */
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
