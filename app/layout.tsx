import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emailer App",
  description: "Send Bulk Emails",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "My Website",
    description: "My Website Description",
    siteName: "My Website",
    images: [
      {
        url: "https://staybook.in/_next/image?url=https%3A%2F%2Fimages.staybook.in%2FJagat-Niwas-Palace-Hotel%2FJagat-Niwas-Palace-Hotel-deluxe-room-4.webp&w=1920&q=75",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
