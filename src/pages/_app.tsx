import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ToastProvider from "@/components/dls/toast/ToastProvider";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <div className="min-h-screen">
          <NavBar />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full min-h-[calc(100vh-3.75rem)] flex-col justify-center"
            >
              <Component key={router.asPath} {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </ToastProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
