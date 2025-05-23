import type { Metadata } from "next";
import { Raleway, Roboto } from "next/font/google";
import 'react-calendar/dist/Calendar.css';
import "./globals.css";
import ToastProvider from "@/components/common/ToastProvider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"]
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TuMedicoNicaragua",
  description: "Aplicación de gestión de pacientes y doctores - Beta",
  icons: {
    icon: "/logos/light_icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${roboto.variable} flex-col antialiased flex h-dvh`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
