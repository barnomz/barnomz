import BBtn from "@/components/dls/BBtn";
import { signOut, useSession } from "next-auth/react";
import NavBarMenu from "@/components/NavBarMenu";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const logout = () => {
    setIsLoading(true);
    signOut({ callbackUrl: "/auth/login" }).then();
    setIsLoading(false);
  };

  const navBarEndLoading = (
    <div className="flex gap-4">
      <div className="h-[2.25rem] w-[4.5rem] animate-pulse rounded bg-white/10"></div>
      <div className="h-[2.25rem] w-[4.5rem] animate-pulse rounded bg-white/10"></div>
    </div>
  );

  const navBarEndLoggedIn = (
    <BBtn
      color="primary"
      className="h-[2.25rem]"
      onClick={logout}
      loading={isLoading}
    >
      خروج
    </BBtn>
  );

  const navBarEndLoggedOut = (
    <div className="flex gap-4">
      <BBtn to="/auth/login" color="primary" className="h-[2.25rem]">
        ورود
      </BBtn>
      <BBtn to="/auth/register" className="h-[2.25rem]">
        ثبت‌نام
      </BBtn>
    </div>
  );

  return (
    <div className="sticky flex h-[3.75rem] w-full items-center justify-between bg-primary/50 px-[1.5rem] py-[0.75rem] backdrop-blur">
      <Link href="/">
        <img
          src="/images/barnomz-horizontal-logo.svg"
          alt="barnomz logo"
          width="100px"
        />
      </Link>
      {session.status === "authenticated" && <NavBarMenu />}
      <div className="flex items-center gap-2">
        {session.status === "loading" && navBarEndLoading}
        {session.status === "authenticated" && navBarEndLoggedIn}
        {session.status === "unauthenticated" && navBarEndLoggedOut}
      </div>
    </div>
  );
}
