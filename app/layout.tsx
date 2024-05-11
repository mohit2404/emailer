import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://emailer-nine.vercel.app"),
  title: "Emailer App",
  description: "Send Bulk Emails",
  openGraph: {
    type: "website",
    url: "https://emailer-nine.vercel.app",
    title: "Emailer Nine",
    description: "Send bulk emails through SMTP server",
    siteName: "Emailer",
    images: [
      {
        url: "https://images.staybook.in/Jagat-Niwas-Palace-Hotel/Jagat-Niwas-Palace-Hotel-deluxe-room-4.webp",
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
