export function BrandMark({ className = "tw:h-9 tw:w-9" }: { className?: string }) {
  return (
    <span
      className={`tw:relative tw:block tw:shrink-0 tw:overflow-hidden tw:rounded-full tw:bg-white ${className}`}
      aria-hidden="true"
    >
      <img
        src="/images/brand/edge-way-logo.jpg"
        alt=""
        className="tw:absolute tw:max-w-none"
        style={{ width: "220%", left: "-66%", top: "-24%" }}
      />
    </span>
  );
}
