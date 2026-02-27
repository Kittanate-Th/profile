import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedFavicon from "@/components/AnimatedFavicon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kittanate Thanee",
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
      <body className={`${inter.className} antialiased selection:bg-brand-accent selection:text-white`}>
        {/* เราจะเอา Navbar ออกจากการครอบรวมก่อน เพื่อให้หน้าเว็บคลีนที่สุด เดี๋ยวค่อยจัดตำแหน่ง Navbar ใหม่ */}
        <AnimatedFavicon />
        <Navbar />
        {children}
      </body>
    </html>
  );
}