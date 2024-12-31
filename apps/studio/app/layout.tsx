import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./sidebar";
import styles from "./page.module.scss";
import fiDark from "@/public/webfi-dark.svg";
import fiLight from "@/public/webfi-light.svg";

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
        <div className={styles.sidebarContainer}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
