import "./globals.css";
import { Teachers, Geist, Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

const teachers = Teachers({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, instrumentSerif.variable)}
    >
      <body className={teachers.className}>
        <ReduxProvider>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            closeButton={false}
            icon={false}
            toastStyle={{
              background: "transparent",
              boxShadow: "none",
              padding: 0,
              textAlign: "center",
              width: "fit-content",
            }}
          />

          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
