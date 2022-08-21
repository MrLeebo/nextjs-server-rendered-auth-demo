import Link from "next/link";
import { withSsrSession } from "auth/sessionUtils";
import Button from "components/Button";
import Form from "components/Form";

// even though the login page doesn't require any server-side data
// fetching, this produces an anonymous session and CSRF token for
// the login form.
export const getServerSideProps = withSsrSession();

export default function LoginPage() {
  return (
    <div className="grid place-items-center h-screen">
      <Form action="/api/login" method="post">
        <fieldset className="bg-blue-50 flex flex-col gap-2 border border-solid rounded shadow-md p-4">
          <legend className="ml-2 px-1">Login</legend>

          <div>
            <label>Username</label>
            <input
              name="username"
              type="text"
              className="block rounded"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="block rounded"
              required
            />
          </div>

          <div className="flex gap-4 mt-4 items-baseline">
            <Button>Login</Button>
            <Link href="/">
              <a className="text-blue-500 underline hover:text-blue-700">
                Proceed as guest
              </a>
            </Link>
          </div>
          <p className="text-xs text-gray-400 w-56">
            Hint: Try logging in as "admin" to have administrative access.
          </p>
        </fieldset>
      </Form>
    </div>
  );
}

LoginPage.getLayout = (page) => page;
