import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from 'next/font/google';

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import QueryProvider from "./(provider)/QueryProvider";
import ToastProvider from "./(provider)/ToastProvider";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const APP_NAME = "마인드렉스: 정신건강 용어사전";
const APP_DEFAULT_TITLE = "마인드렉스 - 쉬운 정신건강 용어사전";
const APP_TITLE_TEMPLATE = "%s | 마인드렉스";
const APP_DESCRIPTION = "정신건강 용어를 쉽고 친절하게, 도식과 함께 설명하는 온라인 사전입니다.";

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
    statusBarStyle: "default",
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
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};



const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${notoSansKR.variable} antialiased min-h-screen flex flex-col `}>
        <QueryProvider>
          <ToastProvider />
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
