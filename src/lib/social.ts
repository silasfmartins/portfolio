const SOCIAL_NAMES: Record<string, string> = {
  "github.com": "GitHub",
  "linkedin.com": "LinkedIn",
  "wa.me": "WhatsApp",
};

/** The CMS only stores the URL, so the link name comes from its host. */
export function getSocialLabel(url: string) {
  const host = new URL(url).hostname.replace("www.", "");
  return SOCIAL_NAMES[host] ?? host;
}

export const CONTACT_EMAIL = "silas.martins2041@gmail.com";
