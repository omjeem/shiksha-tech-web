import Sidebar from "@/components/Dashboard/Sidebar";
import type { Metadata } from "next";


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
        {/* <Sidebar/> */}
        {children}
      </body>
    </html>
  );
}
