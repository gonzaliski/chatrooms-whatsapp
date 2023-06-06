import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Chatrooms</title>
      </head>
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
