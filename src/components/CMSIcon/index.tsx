import type { ComponentProps } from "react";
import { cn } from "@/components/ui";

type CMSIconProps = Omit<
  ComponentProps<"span">,
  "children" | "dangerouslySetInnerHTML"
> & {
  icon: string;
};

const SVG_OPEN_TAG = /<svg\b[^>]*>/iu;
const SIZE_ATTRIBUTE = /\s(?:width|height)=(?:"[^"]*"|'[^']*')/giu;
const ID_ATTRIBUTE = /\sid=(?:"[^"]*"|'[^']*')/giu;
const PAINT_ATTRIBUTE =
  /\s(?<attribute>fill|stroke)=(?:"(?<double>[^"]*)"|'(?<single>[^']*)')/giu;
const PAINT_STYLE = /(?<property>fill|stroke)\s*:\s*(?<value>[^;"']+)/giu;
const DESC_ELEMENT = /<desc>[\s\S]*?<\/desc>/giu;
const TAG_END = />$/u;
const SHORT_HEX = /^#(?<digits>[\da-f]{3})$/u;

interface PaintAttributeGroups {
  attribute: string;
  double?: string;
  single?: string;
}

interface PaintStyleGroups {
  property: string;
  value: string;
}

const KEPT_PAINTS = new Set(["none", "currentcolor", "inherit", "transparent"]);

function sanitizeIconMarkup(icon: string): string {
  return icon
    .replace(/<script[\s\S]*?(?:<\/script>|$)/giu, "")
    .replace(/\son\w+=(?:"[^"]*"|'[^']*')/giu, "")
    .replace(/javascript:/giu, "");
}

function isKeptPaint(paint: string): boolean {
  return KEPT_PAINTS.has(paint.trim().toLowerCase());
}

function toCurrentColor(paint: string): string {
  return isKeptPaint(paint) ? paint : "currentColor";
}

function normalizeColor(paint: string): string {
  const color = paint.trim().toLowerCase();
  const shortHex = SHORT_HEX.exec(color)?.groups;
  if (shortHex) {
    return `#${[...shortHex.digits].map((digit) => digit + digit).join("")}`;
  }
  return color === "white" ? "#ffffff" : color;
}

/** Brand icons with several colors (Spring's green leaf) keep their colors. */
function isMonochrome(icon: string): boolean {
  const colors = new Set<string>();
  for (const match of icon.matchAll(PAINT_ATTRIBUTE)) {
    const { double, single } = match.groups as unknown as PaintAttributeGroups;
    colors.add(normalizeColor(double ?? single ?? ""));
  }
  for (const match of icon.matchAll(PAINT_STYLE)) {
    colors.add(
      normalizeColor((match.groups as unknown as PaintStyleGroups).value)
    );
  }
  return [...colors].filter((color) => !isKeptPaint(color)).length <= 1;
}

function paintWithCurrentColor(icon: string): string {
  return icon
    .replace(PAINT_ATTRIBUTE, (...args) => {
      const { attribute, double, single } = args.at(-1) as PaintAttributeGroups;
      return ` ${attribute}="${toCurrentColor(double ?? single ?? "")}"`;
    })
    .replace(PAINT_STYLE, (...args) => {
      const { property, value } = args.at(-1) as PaintStyleGroups;
      return `${property}:${toCurrentColor(value)}`;
    });
}

/**
 * Icons come from the CMS with mixed markup: fixed colors (`#ffffff` disappears in the light theme)
 * and fixed sizes. Single-color icons follow the text color (`currentColor`); every icon gets `1em`.
 */
function normalizeIconMarkup(icon: string): string {
  const cleaned = icon.replace(DESC_ELEMENT, "").replace(ID_ATTRIBUTE, "");

  return (
    isMonochrome(cleaned) ? paintWithCurrentColor(cleaned) : cleaned
  ).replace(SVG_OPEN_TAG, (tag) =>
    tag
      .replace(SIZE_ATTRIBUTE, "")
      .replace(TAG_END, ' width="1em" height="1em" aria-hidden="true">')
  );
}

export function CMSIcon({ icon, className, ...props }: CMSIconProps) {
  const safeIcon = normalizeIconMarkup(sanitizeIconMarkup(icon));

  return (
    <span
      {...props}
      className={cn("inline-flex shrink-0", className)}
      dangerouslySetInnerHTML={{
        __html: safeIcon,
      }}
    />
  );
}
