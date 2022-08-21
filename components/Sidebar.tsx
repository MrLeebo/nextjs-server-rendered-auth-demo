import { memo } from "react";
import Link from "next/link";
import { useOptionalUser } from "hooks/auth";

function Sidebar() {
  const user = useOptionalUser();

  if (!user || user.role === "guest") return null;

  return (
    <div className="bg-blue-50 col-start-1 col-end-2 w-40 border-r border-solid border-gray-400 p-4">
      <h3 className="text-gray-400 text-xs mb-4">Authenticated Sidebar</h3>
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/sets">
            <a className="hover:underline">Sets</a>
          </Link>
        </li>
        <li>
          <Link href="/minifigs">
            <a className="hover:underline">Minifigs</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(Sidebar);
