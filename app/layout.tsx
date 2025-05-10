import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: 'Qwen-3 AI Chat-Engage in Intelligent Conversations',
  description: 'Chat with our advanced AI assistant. Get instant answers, generate text, and explore the power of AI. Russian interface.',
  keywords: 'Qwen-3, chatbot, artificial intelligence, deepseek, conversation, assistant, Russian',
  icons: {
    icon: '/qwen-3.svg',
    shortcut: '/qwen-3.svg',
    apple: '/qwen-3.svg',
  },
  verification: {
    google: 'zM8fQGX-bdHSku-OAgInh2oLEXcb6j4_XVAOp15R3bc',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QP5RYWJDQ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QP5RYWJDQ9');
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
