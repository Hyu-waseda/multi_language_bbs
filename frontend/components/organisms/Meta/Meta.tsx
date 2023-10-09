import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

const Meta: React.FC<Props> = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charSet="utf-8" />
  </Head>
);

export default Meta;
