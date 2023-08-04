export interface FetcherOptions {
  revalidate?: false | 0 | number;
}

export const fetcher = async (
  url: string,
  options: FetcherOptions = { revalidate: false }
) => {
  const responseData = await fetch(url, {
    next: { revalidate: options.revalidate },
  });
  return responseData.json();
};

export const fetchHTML: (
  url: string,
  options?: any
) => Promise<string> = async (url, options) => {
  const htmlResponse = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
    ...options,
  });

  if (!htmlResponse.ok) throw new Error("Not found");

  return await htmlResponse.text();
};
