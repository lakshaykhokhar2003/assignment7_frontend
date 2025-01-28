import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Toaster} from "sonner";
import ReactQueryProvider from "@/components/ReactQueryContext/ReactQueryContext";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Order Management",
    description: "Create, Read, Update and Delete orders",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ReactQueryProvider>
            <div id="loading-root"/>
            <div id="modal-root"/>
            {children}
            <Toaster position="top-right"/>
        </ReactQueryProvider>
        </body>
        </html>
    );
}
