import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { TWITTER_CARD_IMG_URL } from "../../../const";

interface Props {
  title: string;
  description: string;
}

const Meta: React.FC<Props> = (props) => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

  const pageview = (url: string) => {
    if (!GA_ID) {
      return;
    }
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  };

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={TWITTER_CARD_IMG_URL} />
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
};

export default Meta;
