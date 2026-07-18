import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LiquidButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function LiquidButton({ className, children, ...props }: LiquidButtonProps) {
  return (
    <button className={cn("liquid-button", className)} {...props}>
      <span className="liquid-button__shine" aria-hidden="true" />
      <span className="liquid-button__label">{children}</span>
    </button>
  );
}
