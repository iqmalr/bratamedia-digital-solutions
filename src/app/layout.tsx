import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Inter — variable font used as the primary typeface.
 * Font decision is TBD; Inter serves as the placeholder.
 * Exposed as the --font-inter CSS custom property so globals.css
 * can reference it via --font-sans.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Geist Mono — monospace font for code blocks and technical content.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Minimal base metadata — locale-aware metadata is generated in
 * src/app/[lang]/layout.tsx via generateMetadata().
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the [lang]/layout sets the correct lang
    // attribute on the client; suppressing prevents a hydration mismatch.
    // Default "id" reflects the application defaultLocale.
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
