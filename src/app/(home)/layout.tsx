import Sidebar from "@/components/SideNavBars/Sidebar";
import { getToken, getUserRole } from "@/utils/nextCookies";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AdminLayoutWrapper } from "./admin/AdminLayoutWrapper";


export const metadata: Metadata = {
  title: "Shiksha Tech Education - School Management System",
  description: "Comprehensive school management solution for modern educational institutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const token = await getToken()
  if (!token) {
    redirect("/login")
  }
  const userRole = await getUserRole()
  console.log("User role is >>>", userRole)

  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <AdminLayoutWrapper>
          <Toaster />
          <Sidebar />
          <div className="ms-20">
            {children}
          </div>
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}
