"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0F766E] text-white hover:bg-[#0d5f59] shadow-[0_12px_28px_-16px_rgba(15,118,110,0.55)]",
  secondary:
    "bg-[#14B8A6]/12 text-[#0F766E] hover:bg-[#14B8A6]/20",
  outline:
    "border border-[#E5E7EB] bg-white text-[#111827] hover:border-[#0F766E]/40 hover:text-[#0F766E]",
  ghost: "bg-transparent text-[#111827] hover:bg-[#0F766E]/8",
  accent:
    "bg-[#F59E0B] text-[#111827] hover:bg-[#D97706] shadow-[0_12px_28px_-16px_rgba(245,158,11,0.55)]",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs rounded-xl",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-sm rounded-xl sm:h-14 sm:px-8",
  icon: "h-11 w-11 rounded-xl",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "btn-ripple relative inline-flex items-center justify-center gap-2 font-semibold transition duration-300",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]",
          "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          leftIcon
        )}
        {children}
        {!loading ? rightIcon : null}
      </button>
    );
  },
);
