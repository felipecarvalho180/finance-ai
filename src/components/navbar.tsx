"use client";

import { routes } from "@/utils/constants/routes";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance Ai" width={173} height={39} />

        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={pathname === route.href ? "text-primary" : ""}
          >
            {route.label}
          </Link>
        ))}
      </div>

      <UserButton showName />
    </nav>
  );
};

export default Navbar;
