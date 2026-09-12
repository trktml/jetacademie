const themeScript = `(() => {
  try {
    const stored = JSON.parse(localStorage.getItem("jetacademie-theme") || "{}");
    const preference = stored?.state?.preference || "system";
    const theme = preference === "system"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
