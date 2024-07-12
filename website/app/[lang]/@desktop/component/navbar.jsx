"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { SearchIcon } from "./icon/search";
import { usePathname } from "next/navigation";

export default function NavbarMobile({ lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const dataItems = ["Block", "Transaction", "Operation"];
  const datapath = ["block", "tx", "op"];
  const statusItems = ["Network", "Migration", "Activity"];
  const statuspath = ["network", "statistic", "activity"];
  const menuItems = ["Developer", "Github", "Privacy"];
  const menupath = [
    "https://kaikai-beryl.vercel.app/",
    "https://github.com/0205miss/explorepi",
    "/policy.html",
  ];
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      className="md:hidden"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          placeholder="Block/TX/Account"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>
      <NavbarMenu >
        {dataItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link prefetch={false}
              color={
                pathname.includes(menupath[index]) ? "primary" : "foreground"
              }
              className="w-full"
              href={`/${lang}/${datapath[index]}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}

        <Divider />

        {statusItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link prefetch={false}
              color={
                pathname.includes(menupath[index]) ? "primary" : "foreground"
              }
              className="w-full"
              href={`/${lang}/${statuspath[index]}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}

        <Divider />
        <NavbarMenuItem key={`pi-lab`}>
          <Link prefetch={false}
            color={
              "foreground"
            }
            className="w-full"
            href={"https://pi-laboratory.vercel.app/#?network=TestNet"}
            size="lg"
          >
            {"Pi BlockChain Lab"}
          </Link>
        </NavbarMenuItem>
        <Divider />

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link prefetch={false}
              color={
                pathname.includes(menupath[index]) ? "primary" : "foreground"
              }
              className="w-full"
              href={menupath[index]}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
