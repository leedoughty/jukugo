import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jukugo",
  description: "Interactive app exploring kanji compounds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
