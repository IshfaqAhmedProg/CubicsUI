import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { ReactNode } from "react";
import "nextra-theme-docs/style.css";
import "@/public/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Make beautiful websites with Next.js & MDX.",
  metadataBase: new URL("https://nextra.site"),
  keywords: [
    "Nextra",
    "Next.js",
    "React",
    "JavaScript",
    "MDX",
    "Markdown",
    "Static Site Generator",
  ],
  generator: "Next.js",
  applicationName: "Nextra",
  appleWebApp: {
    title: "Nextra",
  },
  title: {
    default: "Nextra – Next.js Static Site Generator",
    template: "%s | Nextra",
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: "./",
    siteName: "Nextra",
    locale: "en_US",
    type: "website",
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://nextra.site",
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: "./",
  },
};

const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>;
const navbar = (
  <Navbar
    logo={<b>Nextra</b>}
    // ... Your additional navbar options
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>;

export default async function RootLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
