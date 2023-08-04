export const clean: (str: string) => string = (str) => {
  return str.replaceAll("\n", "").replaceAll("\t", "").trim();
};
