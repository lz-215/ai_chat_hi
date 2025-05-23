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
  title: 'Qwen-3 AI Чат — Интеллектуальные беседы с ИИ',
  description: 'Общайтесь с нашим продвинутым AI-ассистентом. Получайте мгновенные ответы, генерируйте тексты и открывайте возможности искусственного интеллекта. Русский интерфейс.',
  keywords: 'Qwen-3, чат-бот, искусственный интеллект, deepseek, беседа, ассистент, русский',
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
