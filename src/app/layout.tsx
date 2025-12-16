import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import ThemeProvider from "./ThemeProvider";

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
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
