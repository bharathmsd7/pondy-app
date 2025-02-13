import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Viewport } from "next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Pondy App",
  description: "Puducherry Tourism Application",
  icons: {
    icon: [{ url: "/icons/web-app-manifest-192x192.png", sizes: "196x196", type: "image/png" }],
    apple: [{ url: "/icons/web-app-manifest-192x192.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
    maximumScale: 1,
    userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="HandheldFriendly" content="true" />
      </head>
      <body
        className={inter.className}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <Toaster richColors  />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
