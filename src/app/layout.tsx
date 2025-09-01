import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import LenisWrapper from "@/components/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appDescription =
  "Easily transfer and enjoy the lyrics of your favorite albums on your Kindle. Discover, learn, and immerse yourself in music like never before!";
const appShortTitle = "Kindle Lyrics: Your music, your Kindle, your way";

const slogan = "Kindle Lyrics - Transfer Album Lyrics to Kindle";
export const metadata: Metadata = {
  title: "Kindle Lyrics | Transfer Album Lyrics to Kindle",
  description: appDescription,
  keywords: [
    "lyrics",
    "music albums",
    "kindle",
    "album lyrics",
    "lyrics on kindle",
  ],
  authors: { name: "Brandon Porcel", url: "https://github.com/brandonporcel" },
  creator: "Brandon Porcel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kindle-lyrics.vercel.app",
    title: appShortTitle,
    description: appDescription,
    siteName: "Kindle Lyrics",
    images: [
      {
        url: "https://kindle-lyrics.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: slogan,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appShortTitle,
    description: appDescription,
    images: [
      {
        url: "https://kindle-lyrics.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: slogan,
      },
    ],
  },
  icons: [
    {
      type: "favicon",
      url: "favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <LenisWrapper />
            <Toaster richColors />
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
