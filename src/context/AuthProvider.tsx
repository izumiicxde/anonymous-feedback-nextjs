"use client";
import react from "react";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: react.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
