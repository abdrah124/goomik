import { Inter, Quicksand, Poppins, Cabin, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--quicksand",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--poppins",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--cabin",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--roboto",
});

export const fonts = [
  inter.className,
  cabin.variable,
  poppins.variable,
  quickSand.variable,
  roboto.variable,
].join(" ");
