import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import SearchIcon from "./components/searchIcon";

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
      <body>
        <Header />
        {children}
        <SearchIcon />
      </body>
    </html>
  );
}
