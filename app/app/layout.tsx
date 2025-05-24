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
  title: 'क्वेन-3 एआई चैट - एआई के साथ बुद्धिमान बातचीत',
  description: 'हमारे उन्नत एआई सहायक के साथ बातचीत करें। त्वरित उत्तर प्राप्त करें, पाठ उत्पन्न करें, और कृत्रिम बुद्धिमत्ता के अवसरों को अनलॉक करें। हिंदी इंटरफेस।',
  keywords: 'क्वेन-3, चैट-बॉट, कृत्रिम बुद्धिमत्ता, डीपसीक, बातचीत, सहायक, हिंदी',
  icons: {
    icon: '/qwen-3.svg',
    shortcut: '/qwen-3.svg',
    apple: '/qwen-3.svg',
  },
  verification: {
    google: 'J7rWeorEZa5c-HX_AozMVO1fzZyC4xOJYqjPm2wbCGQ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1525PE305F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1525PE305F');
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
