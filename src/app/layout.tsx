import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import SmoothScroll from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sapone.example.com"),
  title: {
    default: "Saponé — Handcrafted Botanical Soap",
    template: "%s · Saponé",
  },
  description:
    "Small-batch botanical soap, hand-cut and cured for six weeks. Vegan, cruelty-free and plastic-free bars for every kind of skin.",
  keywords: [
    "handmade soap",
    "artisan soap",
    "botanical soap",
    "natural soap",
    "vegan soap",
    "cold process soap",
  ],
  openGraph: {
    title: "Saponé — Handcrafted Botanical Soap",
    description:
      "Small-batch botanical soap, hand-cut and cured for six weeks. Vegan, cruelty-free and plastic-free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <CartProvider>
            <SmoothScroll>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScroll>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
