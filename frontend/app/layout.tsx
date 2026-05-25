import type { Metadata, Viewport } from "next";
import { ToasterProvider } from "@/components/toaster-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZYM Dashboard - Gym Management SaaS",
  description: "Complete gym management solution for gym owners and members",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
