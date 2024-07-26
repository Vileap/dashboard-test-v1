import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { CountryContextProvider } from "@/context/useCountry";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CountryContextProvider>
      <Component {...pageProps} />
    </CountryContextProvider>
  );
};

export default App;
