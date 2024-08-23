// import logoSvg from "../../public/images/barnomz-horizontal-logo.svg";
import BBtn from "@/components/dls/BBtn";
import { signOut, useSession } from "next-auth/react";
import NavBarMenu from "@/components/NavBarMenu";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const isLoggedIn = !!session?.data;

  const logout = () => {
    setIsLoading(true);
    signOut({ callbackUrl: "/auth/login" });
    setIsLoading(false);
  };

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
        {/*<Image*/}
        {/*  src={logoSvg}*/}
        {/*  alt="Barnomz Logo"*/}
        {/*  width={120}*/}
        {/*  height={36}*/}
        {/*  priority*/}
        {/*/>*/}
        <img src="/images/barnomz-horizontal-logo.svg" alt="barnomz logo" />
      </Link>
      {isLoggedIn && <NavBarMenu />}
      {isLoggedIn ? navBarEndLoggedIn : navBarEndLoggedOut}
    </div>
  );
}
