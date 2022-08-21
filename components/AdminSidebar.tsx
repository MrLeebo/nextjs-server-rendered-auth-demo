import { memo } from "react";
import Link from "next/link";
import { useOptionalUser } from "hooks/auth";

function AdminSidebar() {
  const user = useOptionalUser();

  if (user?.role !== "admin") return null;

  return (
    <div className="col-start-3 col-end-4 w-40 border-l border-solid border-gray-400 p-4">
      <h3 className="text-gray-400 text-xs mb-4">Administrative sidebar</h3>
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/admin">
            <a className="hover:underline">Admin Console</a>
          </Link>
        </li>
        <li>
          <Link href="/csrf">
            <a className="hover:underline">CSRF Tester</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(AdminSidebar);
