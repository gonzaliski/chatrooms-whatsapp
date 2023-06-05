import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { Suspense } from "react";
import Loading from "./Loading";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Chatrooms</title>
      </Head>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <div className="relative flex h-screen bg-wpp-green.100  overflow-auto">
              {children}
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
