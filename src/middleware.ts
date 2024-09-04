import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['pt_BR', 'en'],
 
  defaultLocale: 'pt_BR'
});
 
export const config = {
  matcher: ['/', '/(pt_BR|en)/:path*']
};