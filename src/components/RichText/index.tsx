import { RichText as CMSRichText } from "@graphcms/rich-text-react-renderer";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const richTextVariants = tv({
  defaultVariants: { tone: "default" },
  slots: {
    bold: "text-foreground font-semibold",
    link: "text-primary decoration-primary/40 hover:text-primary/80 font-medium underline underline-offset-4 transition-colors",
    list: "text-muted-foreground mt-4 list-inside list-disc space-y-1.5",
    paragraph: "text-muted-foreground leading-relaxed",
  },
  variants: {
    // Over photos (project detail hero): stays light in both themes.
    tone: {
      default: {},
      overlay: {
        bold: "text-white",
        list: "text-white/80",
        paragraph: "text-white/80",
      },
    },
  },
});

type RichTextProps = ComponentProps<typeof CMSRichText> &
  VariantProps<typeof richTextVariants>;

export function RichText({ tone, ...props }: RichTextProps) {
  const styles = richTextVariants({ tone });

  return (
    <CMSRichText
      {...props}
      renderers={{
        a: ({ children, ...anchorProps }) => (
          <a {...anchorProps} className={styles.link()}>
            {children}
          </a>
        ),
        bold: ({ children }) => <b className={styles.bold()}>{children}</b>,
        p: ({ children }) => <p className={styles.paragraph()}>{children}</p>,
        ul: ({ children }) => <ul className={styles.list()}>{children}</ul>,
      }}
    />
  );
}
