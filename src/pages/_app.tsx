import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ToastProvider from "@/components/dls/toast/ToastProvider";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider as JotaiProvider } from "jotai";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

config.autoAddCss = false;

type AppTypeArguments = {
  userAgent:
    | {
        isMobile: boolean;
        isTablet: boolean;
      }
    | undefined;
};

const MyApp: AppType<AppTypeArguments> = ({ Component, pageProps, router }) => {
  return (
    <JotaiProvider>
      <ToastProvider>
        <Head>
          {(pageProps.userAgent?.isMobile || pageProps.userAgent?.isTablet) && (
            <meta name="viewport" content="width=1280" />
          )}
        </Head>
        <div className="min-h-screen">
          <NavBar />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full min-h-[calc(100vh-3.75rem)] flex-col"
            >
              <Component key={router.asPath} {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </ToastProvider>
    </JotaiProvider>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userAgent = context.req?.headers["user-agent"];
  if (!userAgent) return {};
  return {
    props: {
      userAgent: {
        isMobile: /mobile/i.test(userAgent),
        isTablet: /tablet/i.test(userAgent),
      },
    },
  };
}

export default api.withTRPC(MyApp);
