import type { Metadata } from "next";
import { Instrument_Sans, Inter, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const display = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Orbius — The Operating System for Student Life",
  description:
    "Orbius merges your syllabus, group chats, and campus feed into one login for students &mdash; plus attendance, broadcasts, and course tools for lecturers. Join the waitlist.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
  title: "Orbius — The Operating System for Student Life",
    description:
      "Deadlines, group chats, and campus life for students. Attendance, broadcasts, and course tools for lecturers. All in orbit around one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#141310",
              color: "#f4efe4",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
            },
          }}
        />
      </body>
    </html>
  );
}
