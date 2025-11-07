import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jakub Łącki Portfolio",
  description: "Blockchain Architect & Full-Stack Developer - Building innovative Web3 applications and DeFi platforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}