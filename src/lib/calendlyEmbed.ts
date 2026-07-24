export const CALENDLY_URL = "https://calendly.com/aaryan-kansal-prometheusschool/prometheusedge";

type CalendlyGlobal = { Calendly?: { initPopupWidget: (o: { url: string }) => void } };

function loadCalendlyAssets(onReady: () => void) {
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.appendChild(css);

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = onReady;
  document.body.appendChild(script);
}

/** Opens the Calendly popup widget, loading its assets on demand if needed. */
export function openCalendlyPopup(url: string = CALENDLY_URL) {
  const w = window as unknown as CalendlyGlobal;
  if (w.Calendly) {
    w.Calendly.initPopupWidget({ url });
    return;
  }
  loadCalendlyAssets(() => {
    (window as unknown as CalendlyGlobal).Calendly?.initPopupWidget({ url });
  });
}
