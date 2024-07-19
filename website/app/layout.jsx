import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "./head";
import GetUser from "./getuser";
import { Inter } from "next/font/google";
import ReactGA from 'react-ga4';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
config.autoAddCss = false;

export default function RootLayout({ children, params }) {
  const TRACKING_ID = "G-QLRT9ML5H4"; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);
  return (
    <html lang={params.lang} className={inter.className}>
      <Head />
      <body>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3524983749365405"
          crossOrigin="anonymous"
        ></script>
        <GetUser>{children}</GetUser>
      </body>
    </html>
  );
}
