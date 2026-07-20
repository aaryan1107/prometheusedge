// TODO: replace with the real WhatsApp business number (international format, no +).
const WHATSAPP_NUMBER = "919667745811";
const MESSAGE = "Hi The Edge Way, I'd like to book a free consultation.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="tw:group tw:fixed tw:bottom-6 tw:right-6 tw:z-30 tw:flex tw:items-center tw:gap-0 tw:rounded-full tw:bg-[#25D366] tw:p-4 tw:shadow-[0_18px_40px_-12px_rgba(37,211,102,0.6)] tw:transition-all tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:pr-6 tw:active:scale-95"
    >
      <svg viewBox="0 0 32 32" className="tw:h-6 tw:w-6 tw:fill-white" aria-hidden="true">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.7a12.75 12.75 0 006.23 1.62h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06A12.7 12.7 0 0016.004 3.2zm0 23.36h-.01a10.6 10.6 0 01-5.4-1.48l-.39-.23-4 1.05 1.07-3.9-.25-.4a10.56 10.56 0 01-1.62-5.6c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.1 7.51 3.12a10.56 10.56 0 013.11 7.52c0 5.86-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.98.13.6-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
      </svg>
      <span className="tw:max-w-0 tw:overflow-hidden tw:whitespace-nowrap tw:font-sans tw:text-sm tw:font-semibold tw:text-white tw:transition-all tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:ml-2.5 tw:group-hover:max-w-[140px]">
        Chat with us
      </span>
    </a>
  );
}
