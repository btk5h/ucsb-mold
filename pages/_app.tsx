import { AppProps } from "next/app";

import "tailwindcss/dist/base.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
