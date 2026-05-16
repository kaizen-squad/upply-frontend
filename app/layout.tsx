import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NotificationProvider from "@/components/ui/Notification/NotificationProvider";
import NotificationContainer from "@/components/ui/Notification/NotificationContainer";
import { cookies } from "next/headers";
import ClientAuthProvider from "./ClientAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upply",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  let user = null;
  if (userCookie?.value) {
    try {
      user = JSON.parse(userCookie.value);
      console.log('[RootLayout] Parsed user from cookie', user);
    } catch {
      console.error('Failed to parse user cookie');
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="notification-root"></div>
        <NotificationProvider> 
          <ClientAuthProvider initialUser={user}>
            {children}
          </ClientAuthProvider>
           <NotificationContainer/>
        </NotificationProvider>
       
      </body>
    </html>
  );
}
