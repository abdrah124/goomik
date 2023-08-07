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

export const fetchHTML: (url: string) => Promise<string> = async (url) => {
  const htmlResponse = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
    next: { revalidate: 0 },
  });

  if (!htmlResponse.ok) throw new Error("Not found");

  return await htmlResponse.text();
};

export const fetchHTML2: (url: string) => Promise<Response> = async (url) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
    next: { revalidate: 0 },
  });
};
