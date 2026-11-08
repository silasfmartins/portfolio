import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const LEGACY_LOCALES = [
  ["/pt_BR", "/pt-BR"],
  ["/es", "/en"],
] as const;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy and removed locales: /pt_BR became /pt-BR; /es (Spanish, removed in November 2026) goes to /en.
  for (const [from, to] of LEGACY_LOCALES) {
    if (pathname === from || pathname.startsWith(`${from}/`)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = pathname.replace(from, to);
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
