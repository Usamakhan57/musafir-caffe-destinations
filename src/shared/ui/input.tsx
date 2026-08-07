"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string | string[];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    hint,
    error,
    leftIcon,
    rightIcon,
    className,
    containerClassName,
    type = "text",
    disabled,
    ...props
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;
  const errors = Array.isArray(error) ? error : error ? [error] : [];
  const hasError = errors.length > 0;
  const describedBy = [
    hint ? `${id}-hint` : null,
    hasError ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-[#111827]">
          {label}
          {props.required ? (
            <span className="ml-0.5 text-[#0F766E]" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {leftIcon}
          </span>
        ) : null}

        <input
          ref={ref}
          id={id}
          type={resolvedType}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#111827] outline-none transition",
            "placeholder:text-[#6B7280]/80",
            "focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20",
            "disabled:cursor-not-allowed disabled:bg-[#FAFAF9] disabled:opacity-60",
            hasError
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-[#E5E7EB]",
            leftIcon ? "pl-11" : undefined,
            isPassword || rightIcon ? "pr-11" : undefined,
            className,
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FAFAF9] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        ) : rightIcon ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {hint && !hasError ? (
        <p id={`${id}-hint`} className="text-xs text-[#6B7280]">
          {hint}
        </p>
      ) : null}

      {hasError
        ? errors.map((err) => (
            <p key={err} id={`${id}-error`} className="text-xs text-red-600" role="alert">
              {err}
            </p>
          ))
        : null}
    </div>
  );
});
