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
  title: 'Qwen-3 हिंदी - एआई के साथ बुद्धिमान बातचीत',
  description: 'हमारे उन्नत एआई सहायक के साथ बातचीत करें। त्वरित उत्तर प्राप्त करें, पाठ उत्पन्न करें, और कृत्रिम बुद्धिमत्ता के अवसरों को अनलॉक करें। हिंदी इंटरफेस।',
  keywords: 'क्वेन-3, चैट-बॉट, कृत्रिम बुद्धिमत्ता, डीपसीक, बातचीत, सहायक, हिंदी',
  icons: {
    icon: '/qwen-3.svg',
    shortcut: '/qwen-3.svg',
    apple: '/qwen-3.svg',
  },
  verification: {
    google: 'H3dawRx-lRfFUhoVCEnRGv4o-jxXsw2JEjQ8yGCRNs0',
  },
  alternates: {
    languages: {
     'en': 'https://www.aigoutaobao.com',
     'ru': 'https://www.ailishasock.com',
     'hi': 'https://www.aimosheying.com',
     'es': 'https://www.airwrapdysons.com',
     'fr': 'https://www.aishangxiyi.com',
     'ar': 'https://www.aiuhangzhou.com',
     'pt': 'https://www.aiushenyang.com',
     'bn': 'https://www.aiushanghai.com',
    },
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
          src="https://www.googletagmanager.com/gtag/js?id=G-PK8M5SQBT2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PK8M5SQBT2');
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s2qzd6et6p");
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
