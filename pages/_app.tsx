import React from 'react';
import Head from 'next/head';
import '../public/global.css';

declare global {
  interface Window {
    NODE_ENV?: string,
  }
}

export default function AdaptApp({
  Component,
  pageProps,
}) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto"
          rel="stylesheet"
        />
        <title>ChefSteps</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
