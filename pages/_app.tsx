import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetch from "isomorphic-unfetch";

import "tailwindcss/dist/base.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (...params: Parameters<typeof fetch>) =>
          fetch(...params).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
