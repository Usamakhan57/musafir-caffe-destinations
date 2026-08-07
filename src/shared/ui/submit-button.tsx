"use client";

import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "./button";

interface SubmitButtonProps extends Omit<ButtonProps, "type" | "loading"> {
  pendingLabel?: string;
}

export function SubmitButton({
  children,
  pendingLabel = "Please wait…",
  fullWidth = true,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} fullWidth={fullWidth} {...props}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
