import { Head, Html, Main, NextScript } from "next/document";

function Document(props) {
  return (
    <Html lang="fa" className="bg-primary-dark">
      <Head>
        <link rel="shortcut icon" href="/images/barnomz-logo.svg" />
        <link
          rel="preload"
          href="/fonts/Vazirmatn/woff2/Vazirmatn-Regular.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/Vazirmatn/woff2/Vazirmatn-Bold.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/Inter/woff2/Inter-Regular.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/Inter/woff2/Inter-Bold.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
      </Head>
      <body dir="rtl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
