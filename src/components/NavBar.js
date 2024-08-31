import NavBarMenu from "@/components/NavBarMenu";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="sticky flex h-[3.75rem] w-full items-center justify-between bg-primary/50 px-[1.5rem] py-[0.75rem] backdrop-blur">
      <Link href="/">
        <img
          src="/images/barnomz-horizontal-logo.svg"
          alt="barnomz logo"
          width="100px"
        />
      </Link>
      <NavBarMenu />
      {/* TODO: add info and github*/}
      <div></div>
    </div>
  );
}
