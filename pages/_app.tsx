import NextApp from "next/app";
import { getSession } from "auth/session";
import ErrorBoundary from "components/ErrorBoundary";
import Layout from "components/Layout";
import { CurrentUserContext } from "hooks/auth";
import "styles.css";

export default function App({ Component, pageProps, user = global.user }) {
  // This is a common nextjs pattern to allow individual pages to
  // define their own layouts, with a default that is used most of the
  // time. See /login.tsx for an example of a custom layout.
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <ErrorBoundary>
      <CurrentUserContext.Provider value={user}>
        {getLayout(<Component {...pageProps} />)}
      </CurrentUserContext.Provider>
    </ErrorBoundary>
  );
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const { req, res } = appContext.ctx;

  // I _think_ getInitialProps only ever fires server-side from _app,
  // but per the docs it can also fire client-side so this checks to
  // make sure we only get the session server-side.
  if (req) {
    const session = await getSession(req, res);
    return { ...appProps, user: session.user };
  }

  return appProps;
};
