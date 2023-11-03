import Head from "next/head";
import Script from "next/script";

interface Props {
  title: string;
  description: string;
}

const Meta: React.FC<Props> = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
      <meta
        name="google-site-verification"
        content="unSXB7r8lGx_zsadSbX2OYASTSNHQDrhQ0MA7KUdsGA"
      />
    </Head>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
           `,
      }}
    />
  </>
);

export default Meta;
