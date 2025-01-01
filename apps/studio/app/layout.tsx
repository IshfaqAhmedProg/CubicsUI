import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Sidebar from "./sidebar";
import styles from "./page.module.scss";
import fiDark from "@/public/webfi-dark.svg";
import fiLight from "@/public/webfi-light.svg";
import Flex from "@/library/ui/Layout/Flex";
import Cursor from "@/library/ui/Cursor/Cursor";
import IconProvider from "@/library/ui/IconProvider";

const inter = Inter({
  variable: "--font-family",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${inter.variable}`}>
        <IconProvider>
          <Flex
            align="stretch"
            style={{ height: "100vh", position: "relative" }}
          >
            <Cursor />
            <Sidebar />
            <main className={styles.main}>{children}</main>
          </Flex>
        </IconProvider>
      </body>
    </html>
  );
}
