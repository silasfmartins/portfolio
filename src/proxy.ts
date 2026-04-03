import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/pt_BR" || pathname.startsWith("/pt_BR/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname.replace("/pt_BR", "/pt-BR");
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(pt-BR|pt_BR|en)/:path*"],
};
