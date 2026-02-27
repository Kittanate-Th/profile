import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kittanate | Jr. Programmer",
  description:
    "My portfolio of a Full Stack Developer in C#, Python, SQL, Next.js, and IoT systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-surface-bg text-slate-100 antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}