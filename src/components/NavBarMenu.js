import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigations = [
  {
    id: 1,
    title: "برنومز",
    link: "/schedules",
  },
  // {
  //   id: 2,
  //   title: 'جستجو برنامه',
  //   link: '/auth/login',
  // },
  {
    id: 3,
    title: "امتحانات",
    link: "/exams",
  },
  // {
  //   id: 4,
  //   title: 'اساتید',
  //   link: '/lecturers',
  // },
];

export default function NavBarMenu() {
  const router = useRouter();

  const [activeNavIndex, setActiveNavIndex] = useState(
    navigations.findIndex((nav) => router.asPath.startsWith(nav.link)) || 0,
  );

  useEffect(() => {
    setActiveNavIndex(
      navigations.findIndex((nav) => router.asPath.startsWith(nav.link)) || 0,
    );
  }, [router.asPath]);

  return (
    <Tab.Group defaultIndex={activeNavIndex}>
      <Tab.List className="flex h-full gap-2">
        {navigations.map((nav) => (
          <Tab key={nav.id} as={Fragment} className="h-full">
            {({ selected }) => (
              <Link
                href={nav.link}
                className={classNames(
                  "ripple h-full text-sm font-bold",
                  "hover:bg-primary rounded-t-md px-4 py-2 focus-visible:outline-none",
                  selected
                    ? "border-secondary border-b-4 border-solid text-white"
                    : "text-grey-200 hover:text-white",
                )}
              >
                {nav.title}
              </Link>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
