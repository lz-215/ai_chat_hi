import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Qwen-3 AI Chat-Engage in Intelligent Conversations',
  description: 'Chat with our advanced AI assistant. Get instant answers, generate text, and explore the power of AI. English interface.',
  keywords: 'Qwen-3, chatbot, artificial intelligence, deepseek, conversation, assistant, English',
  icons: {
    icon: '/qwen-3.svg',
    shortcut: '/qwen-3.svg',
    apple: '/qwen-3.svg',
  },
  verification: {
    google: 'XgPdZyI8vssINHNw4crODgt9jViPEDJBoLdiuHAJaBY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5KVY54T4PX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5KVY54T4PX');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
