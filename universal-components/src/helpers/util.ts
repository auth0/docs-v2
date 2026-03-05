/**
 * Detect Mintlify theme mode i.e. light or dark
 * @returns colorScheme
 */
export function detectColorScheme(): string {
  const htmlElement = document.documentElement;
  const colorScheme =
    htmlElement.style.colorScheme ||
    getComputedStyle(htmlElement).colorScheme ||
    "light";
  return colorScheme === "dark" ? "dark" : "light";
}
