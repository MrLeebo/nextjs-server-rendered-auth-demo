import { useRouter } from "next/router";
import Button from "components/Button";
import useCsrfToken from "hooks/useCsrfToken";

export const getServerSideProps = () => ({ props: {} });

export default function CsrfPage() {
  const router = useRouter();
  const csrfToken = useCsrfToken();

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>CSRF Testing Utility</h2>
        <p>Token: {csrfToken}</p>
      </div>

      <div className="flex-grow flex flex-wrap items-center gap-10 my-10">
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await fetch("/api/refreshCsrf");
              router.reload();
            }}
          >
            <Button buttonStyle="default">Request New Token</Button>
          </form>
        </div>

        <form
          key={csrfToken}
          encType="x-www-form-urlencoded"
          className="w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const csrfToken = String(fd.get("__csrf"));
            const res = await fetch("/api/hello", {
              method: "POST",
              body: new URLSearchParams({ __csrf: csrfToken })
            });
            alert(res.ok ? "your token is correct!" : "csrf token mismatch");
          }}
        >
          <div>
            <label htmlFor="csrf">CSRF Token</label>
            <input
              id="csrf"
              name="__csrf"
              type="text"
              defaultValue={csrfToken}
              className="rounded w-full"
            />
          </div>

          <div className="mt-4">
            <Button buttonStyle="default">Submit Form with Token</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
