import type { ComponentProps } from "react";
import { Input } from "./input";

export type SearchInputProps = Omit<
  ComponentProps<"input">,
  "onChange" | "type" | "value"
> & {
  label: string;
  /** Receives `null` when the field is empty, to clear the URL parameter (nuqs). */
  onSearch: (value: string | null) => void;
  value: string;
};

/** Standard search field for lists. Use it with nuqs to keep the search in the URL. */
export function SearchInput({
  label,
  onSearch,
  value,
  ...props
}: SearchInputProps) {
  return (
    <Input
      {...props}
      aria-label={label}
      onChange={(event) => onSearch(event.target.value || null)}
      type="search"
      value={value}
    />
  );
}
