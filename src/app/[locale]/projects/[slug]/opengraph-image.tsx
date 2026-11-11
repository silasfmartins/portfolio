import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { hygraphTransform } from "@/lib/hygraph-image";
import { getProjectDetailsForRequest } from "@/lib/project-detail-data";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Preview shown when a project link is shared (WhatsApp, LinkedIn, X...).
export const alt = "Silas Martins";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

// Images are not themed screens: fixed colors, taken from the dark theme tokens.
const COLORS = {
  background: "#0f131a",
  border: "#2b3341",
  card: "#151b25",
  foreground: "#f5f7fa",
  muted: "#a3adbd",
  primary: "#1eb89c",
};

const MAX_DESCRIPTION = 120;
const MAX_TECHNOLOGIES = 6;
const TRAILING_PUNCTUATION = /[\s,;:.]+$/u;

interface ImageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function toDataUrl(bytes: ArrayBuffer | Uint8Array, type: string) {
  return `data:${type};base64,${Buffer.from(new Uint8Array(bytes)).toString("base64")}`;
}

/**
 * The thumbnail is downloaded here (Hygraph resizes it to a small PNG), so a failure only
 * leaves the picture out. Sample content uses local images from `public/`.
 */
async function getThumbnail(url: string | undefined) {
  if (!url) {
    return null;
  }

  try {
    if (url.startsWith("/")) {
      const file = await readFile(join(process.cwd(), "public", url));
      return toDataUrl(file, "image/png");
    }

    const response = await fetch(
      hygraphTransform(url, "resize=fit:max,width:900/output=format:png") ??
        url,
      { next: { revalidate: 60 * 60 * 24 } }
    );
    return response.ok
      ? toDataUrl(await response.arrayBuffer(), "image/png")
      : null;
  } catch {
    return null;
  }
}

/** Cuts at the last whole word that fits, so a word is never split. */
function truncate(text: string, max: number) {
  if (text.length <= max) {
    return text;
  }

  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(TRAILING_PUNCTUATION, "")}…`;
}

export default async function Image({ params }: ImageProps) {
  const { locale, slug } = await params;
  const [{ project }, t, logo] = await Promise.all([
    getProjectDetailsForRequest(slug, locale),
    getTranslations({ locale, namespace: "Metadata" }),
    readFile(join(process.cwd(), "src/assets/logo.png")),
  ]);
  const thumbnail = await getThumbnail(
    project?.thumbnail?.url ?? project?.pageThumbnail?.url
  );
  const technologies = project?.technologies ?? [];

  return new ImageResponse(
    <div
      style={{
        background: `radial-gradient(circle at 85% 10%, ${COLORS.primary}33, transparent 45%), ${COLORS.background}`,
        color: COLORS.foreground,
        display: "flex",
        height: "100%",
        padding: 64,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: thumbnail ? 48 : 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: COLORS.primary,
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {t("projectImageKicker")}
          </div>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.1 }}>
            {truncate(project?.title || SITE_NAME, 60)}
          </div>
          {project?.shortDescription && (
            <div style={{ color: COLORS.muted, fontSize: 26, lineHeight: 1.4 }}>
              {truncate(project.shortDescription, MAX_DESCRIPTION)}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {technologies.slice(0, MAX_TECHNOLOGIES).map((technology) => (
              <div
                key={technology.name}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 999,
                  color: COLORS.foreground,
                  fontSize: 20,
                  padding: "6px 16px",
                }}
              >
                {technology.name}
              </div>
            ))}
          </div>
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
          {/* biome-ignore lint/performance/noImgElement: Open Graph images are drawn by Satori, not React DOM */}
          <img
            alt=""
            height={52}
            src={toDataUrl(logo, "image/png")}
            style={{ borderRadius: 12 }}
            width={52}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{SITE_NAME}</div>
            <div style={{ color: COLORS.muted, fontSize: 20 }}>
              {new URL(SITE_URL).host}
            </div>
          </div>
        </div>
      </div>

      {thumbnail && (
        <div
          style={{
            alignItems: "center",
            alignSelf: "center",
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 24,
            display: "flex",
            height: 300,
            justifyContent: "center",
            padding: 20,
            width: 460,
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: Open Graph images are drawn by Satori, not React DOM */}
          <img
            alt=""
            height={260}
            src={thumbnail}
            style={{ objectFit: "contain" }}
            width={420}
          />
        </div>
      )}
    </div>,
    size
  );
}
