import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}

const sizeClasses = {
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
} as const;

/** Consistent page container with premium responsive padding. */
export function Container({
  children,
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: "default" | "muted" | "white";
}

const toneClasses = {
  default: "bg-[#FAFAF9]",
  muted: "bg-[#F5F5F4]",
  white: "bg-white",
} as const;

export function Section({
  children,
  className,
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
