// src/app/layout.jsx
import "./globals.css";
import Navbar from "@/components/master/Navbar";
import AdminNavbar from "@/components/adminProfile/AdminNavbar";
import Footer from "@/components/master/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "My Portfolio",
  description: "My Next.js Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 antialiased flex flex-col min-h-screen">
        
        <NextTopLoader color="#3B82F6" height={3} showSpinner={false} />

        <Navbar />
        <AdminNavbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />

        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        
      </body>
    </html>
  );
}
