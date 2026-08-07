import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "section" | "li";
  children: ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
} as const;

export function Card({
  as: Tag = "div",
  children,
  className,
  hover = true,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(15,118,110,0.28)]",
        hover &&
          "transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,118,110,0.35)]",
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
