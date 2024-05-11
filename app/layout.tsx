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
        url: "https://drive.google.com/uc?id=1t7p6LQ0VUHjKfx5DH0LE2kIk3r3MnWPZ",
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
