import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Lato} from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/router";

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <div className={lato.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
