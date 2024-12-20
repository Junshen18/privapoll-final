import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

config.autoAddCss = false

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const oakesGrotesk = localFont({
  src: [
    {
      path: "./fonts/Oakes Grotesk Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Oakes Grotesk Regular Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Oakes Grotesk Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Oakes Grotesk Light Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Oakes Grotesk Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Oakes Grotesk Medium Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Oakes Grotesk SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Oakes Grotesk SemiBold Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Oakes Grotesk Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Oakes Grotesk Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-oakes",
});

export const metadata: Metadata = {
  title: "Privapoll",
  description: "A Web3 Voting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/privapoll.svg" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oakesGrotesk.variable} antialiased`}
      >
        <NavBar/>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}