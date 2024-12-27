import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          {/*@ts-ignore*/}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        </Head>
        <body style={{margin: 0}}>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
