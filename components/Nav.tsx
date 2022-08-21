import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileMenu from "./ProfileMenu";

function Nav() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => setLoading(true);
    const handleRouteComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router]);

  return (
    <>
      <h1>
        <Link href="/">
          <a>App</a>
        </Link>
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/about">
              <a className="hover:underline">About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="hover:underline">Contact</a>
            </Link>
          </li>
        </ul>
      </nav>

      <ProfileMenu />

      {loading ? (
        <div className="inset-0 -mb-12 absolute grid place-items-center">
          <div className="bg-orange-400 text-white rounded shadow px-2">
            Loading...
          </div>
        </div>
      ) : null}
    </>
  );
}

export default memo(Nav);
