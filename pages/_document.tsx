import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document";

export default function Document(ctx) {
  const { __NEXT_DATA__: nextData } = ctx;
  const { user } = nextData.props;

  return (
    <Html>
      <Head>
        <script src="https://cdn.tailwindcss.com?plugins=forms" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.user = ${JSON.stringify(user)};`
          }}
        />
      </body>
    </Html>
  );
}

Document.getInitialProps = (ctx: DocumentContext) =>
  NextDocument.getInitialProps(ctx);
