import puppeteer, { Browser, Page } from "puppeteer";

export const puppeteerLaunch = async (
  cb: (page: Page, browser: Browser) => Promise<void>
) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  return await cb(page, browser);
};
