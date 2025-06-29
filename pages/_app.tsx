import React from "react";
import Head from "next/head";
import "../public/global.css";

declare global {
  interface Window {
    NODE_ENV?: string;
  }
}

export default function AdaptApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <title>ChefSteps</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
