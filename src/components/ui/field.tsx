import type { ReactNode } from "react";

interface FieldProps {
  children: ReactNode;
  error?: string;
  label: string;
}

/** Label with the control inside: the text becomes the control's accessible name. */
export function Field({ children, error, label }: FieldProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control arrives through `children`
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-foreground font-medium">{label}</span>
      {children}
      {error && <span className="text-error text-xs">{error}</span>}
    </label>
  );
}
