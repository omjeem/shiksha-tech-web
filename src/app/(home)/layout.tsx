import { requireAuth } from "@/utils/nextCookies";
import type { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Shiksha Tech Education - School Management System",
  description: "Comprehensive school management solution for modern educational institutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireAuth()
  if(!user){
    redirect("/login")
  }
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        {/* <Sidebar/> */}
        {children}
      </body>
    </html>
  );
}
