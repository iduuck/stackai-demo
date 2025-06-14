import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactScan } from "@/components/utils/react-scan";
import { IntlProvider } from "@/lib/intl";
import { TanstackQueryProvider } from "@/lib/rq-client";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen bg-cover tracking-[-0.015em] antialiased [background-image:_url(/bg.png)]`}
			>
				<TanstackQueryProvider>
					<IntlProvider>{children}</IntlProvider>
				</TanstackQueryProvider>

				<ReactScan />
			</body>
		</html>
	);
}
