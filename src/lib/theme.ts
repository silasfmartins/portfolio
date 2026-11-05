/** Runs before the first paint so the wrong theme never flashes. Kept in sync with `ThemeProvider`. */
export const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.add(dark ? 'dark' : 'light');
  } catch (error) {}
})();
`;
