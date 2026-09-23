import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  title: {
    default: "CoderDojo Braga",
    template: "%s | CoderDojo Braga",
  },
  description:
    "O CoderDojo Braga é um clube de programação gratuito e voluntário para crianças e jovens dos 7 aos 17 anos em Braga.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
