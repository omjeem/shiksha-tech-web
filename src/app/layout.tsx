import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import ClientProvider from "./ClientProvider";

export const metadata: Metadata = {
  title: "Shiksha Tech Education - School Management System",
  description: "Comprehensive school management solution for modern educational institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <ClientProvider>
          <Navbar />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
