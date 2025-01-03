import type { Metadata } from "next";
import { Outfit, Titillium_Web } from "next/font/google";
import "./globals.scss";
import fiDark from "@/public/webfi-dark.svg";
import fiLight from "@/public/webfi-light.svg";
import Providers from "./providers";
import AppContainer from "@/library/ui/Layout/AppContainer";

const outfit = Outfit({
  variable: "--font-h",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});
const titiliumWeb = Titillium_Web({
  variable: "--font-p",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CubicsUI Studio",
  description: "Compose and manage components using CubicsUI Studio",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: fiDark.src,
      type: "image/svg+xml",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: fiLight.src,
      type: "image/svg+xml",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${outfit.variable} ${titiliumWeb.variable}`}>
        <Providers>
          <AppContainer>{children}</AppContainer>
        </Providers>
      </body>
    </html>
  );
}
