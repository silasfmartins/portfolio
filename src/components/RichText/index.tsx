import { RichText as CMSRichText } from "@graphcms/rich-text-react-renderer";
import type { ComponentProps } from "react";

type RichTextProps = ComponentProps<typeof CMSRichText>;

export function RichText({ ...props }: RichTextProps) {
  return (
    <CMSRichText
      {...props}
      renderers={{
        p: ({ children }) => (
          <p className="text-muted-foreground leading-relaxed">{children}</p>
        ),
        bold: ({ children }) => (
          <b className="font-semibold text-foreground">{children}</b>
        ),
        ul: ({ children }) => (
          <ul className="mt-4 list-inside list-disc space-y-1.5 text-muted-foreground">
            {children}
          </ul>
        ),
        a: ({ children, ...anchorProps }) => (
          <a
            {...anchorProps}
            className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/80"
          >
            {children}
          </a>
        ),
      }}
    />
  );
}
