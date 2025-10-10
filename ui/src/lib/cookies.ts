export function getCookies(name: string): string | undefined {
  const cookieParts = document.cookie.split('; ');
  return cookieParts.find((s) => s.includes(`${name}=`));
}
