import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retrade | Trading Cashback",
  description: "One platform for multi-broker trading cashback.",
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
