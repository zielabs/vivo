import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "vivo X300 Pro - Photography. Redefined.",
  description: "Experience the ultimate in mobile photography with the vivo X300 Pro, co-engineered with ZEISS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
