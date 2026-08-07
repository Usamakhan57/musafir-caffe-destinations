"use client";

import { Mail, Lock, User, type LucideIcon } from "lucide-react";

import { Input } from "./input";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  autoComplete?: string;
  showIcon?: boolean;
}

const iconByType: Record<string, LucideIcon> = {
  email: Mail,
  password: Lock,
  text: User,
};

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  errors,
  defaultValue,
  required,
  disabled,
  hint,
  autoComplete,
  showIcon = true,
}: FormFieldProps) {
  const Icon = showIcon ? iconByType[type] ?? iconByType.text : undefined;

  return (
    <Input
      id={id}
      name={id}
      label={label}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      disabled={disabled}
      hint={hint}
      autoComplete={autoComplete}
      error={errors}
      leftIcon={Icon ? <Icon className="h-4 w-4" aria-hidden /> : undefined}
    />
  );
}
