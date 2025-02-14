import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PWAPrompt } from '@/components/pwa-prompt';
import type { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "Visit Pondy";
const APP_DEFAULT_TITLE = "Visit Pondy";
const APP_TITLE_TEMPLATE = "%s - Visit Pondy";
const APP_DESCRIPTION = "Puducherry Tourism Application";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: APP_DEFAULT_TITLE,
      // startUpImage: [],
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
    twitter: {
      card: "summary",
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    }
  };
  
  export const viewport: Viewport = {
    themeColor: "#FFFFFF",    
    maximumScale: 1,
    userScalable: false
  };


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
        <PWAPrompt />
      </body>
    </html>
  );
}
