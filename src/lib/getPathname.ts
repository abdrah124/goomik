export const getPathname: (url: string | undefined) => string[] | null = (
  url = ""
) => {
  if (!url) return null;
  const { pathname } = new URL(url);
  return pathname.split("/");
};
