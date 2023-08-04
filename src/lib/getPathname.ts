export const getPathname: (ul: string) => string[] = (url) => {
  const { pathname } = new URL(url);
  return pathname.split("/");
};
