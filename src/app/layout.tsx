import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const customfont = Roboto_Serif({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kaiton Feedback",
  description: "xoxo by kaiton and team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={customfont.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
