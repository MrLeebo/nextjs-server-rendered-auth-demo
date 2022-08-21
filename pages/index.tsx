import Image from "next/image";
import { useOptionalUser } from "hooks/auth";

export default function IndexPage() {
  const user = useOptionalUser();

  return (
    <>
      <p className="text-center">Hello, {user?.username ?? "guest"}!</p>
      <div className="flex justify-center">
        <Image
          src="https://www.fillmurray.com/300/200"
          width={300}
          height={200}
          alt="The actor Bill Murray"
          priority
        />
      </div>
    </>
  );
}
