import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps, type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "bootstrap-icons/font/bootstrap-icons.css";
import { NextPageWithLayout } from "../components/layouts";
import "../styles/globals.css";
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
