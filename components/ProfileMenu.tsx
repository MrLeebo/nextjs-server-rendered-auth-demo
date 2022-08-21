import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOptionalUser } from "hooks/auth";
import Form from "./Form";
import Button from "./Button";

function ProfileMenu() {
  const router = useRouter();
  const user = useOptionalUser();

  return (
    <div className="flex gap-2">
      <Link href="/login">
        <a className="hover:underline">
          {user && user.role !== "guest" ? (
            <>Logged in as {user?.username ?? "guest"}</>
          ) : (
            "Login"
          )}
        </a>
      </Link>

      {user && user.role !== "guest" ? (
        <Form
          key={router.pathname}
          action="/api/logout"
          method="post"
          className="font-medium"
        >
          <Button buttonStyle="link">Logout</Button>
        </Form>
      ) : null}
    </div>
  );
}

export default memo(ProfileMenu);
