// Kept apart from the PDF code, so the download menu (browser) does not load @react-pdf.

/** `modern`: two columns with photo (designed). `simple`: one column, plain CV. */
export const RESUME_STYLES = ["modern", "simple"] as const;
export type ResumeStyle = (typeof RESUME_STYLES)[number];

export function isResumeStyle(value: string | null): value is ResumeStyle {
  return RESUME_STYLES.includes(value as ResumeStyle);
}
