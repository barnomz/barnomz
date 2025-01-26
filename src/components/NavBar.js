import NavBarMenu from "@/components/NavBarMenu";
import Link from "next/link";
import BBtn from "@/components/dls/BBtn";
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import InfoDialog from "@/components/InfoDialog";
import { useState } from "react";
import { cn } from "@/utils/helpers";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const tooltip = (title, className) => {
    return (
      <span
        className={cn(
          "top-13 fixed z-50 mt-1 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          className,
        )}
      >
        {title}
      </span>
    );
  };

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
        <div className="group relative">
          <BBtn
            to="https://t.me/barnomzchie"
            icon={faTelegram}
            target="_blank"
            iconSize="2xl"
            color="primary"
            className="!p-2"
          />
          {tooltip("کانال تلگرام", "left-[108px]")}
        </div>
        <div className="group relative">
          <BBtn
            to="https://github.com/barnomz/barnomz"
            icon={faGithub}
            target="_blank"
            iconSize="2xl"
            color="primary"
            className="!p-2"
          />
          {tooltip("گیت‌هاب", "left-16")}
        </div>
        <div className="group relative">
          <BBtn
            icon={faInfo}
            iconSize="xl"
            color="primary"
            className="!py-[11.5px]"
            onClick={() => setIsOpen(true)}
          />
          {tooltip("درباره ما", "left-4")}
        </div>
      </div>

      <InfoDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
