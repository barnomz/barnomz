import NavBarMenu from "@/components/NavBarMenu";
import Link from "next/link";
import BBtn from "@/components/dls/BBtn.js";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import InfoDialog from "@/components/InfoDialog";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="flex items-center gap-2">
        <BBtn
          to="https://github.com/barnomz/barnomz"
          icon={faGithub}
          target="_blank"
          iconSize="2xl"
          color="primary"
          className="!p-2"
        />
        <BBtn
          icon={faInfo}
          iconSize="xl"
          color="primary"
          className="!py-[11.5px]"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <InfoDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
