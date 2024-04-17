'use client'
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
} from "@nextui-org/react";
import { SearchIcon } from "./icon/search";
import { usePathname } from 'next/navigation'

export default function NavbarMobile({lang}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  const menuItems = [
    "Block",
    "Transaction",
    "Operation",
    "Network",
    "Migration",
    "Activity",
  ];
  const menupath =[
    'block',
    'tx',
    'op',
    'network',
    'statistic',
    'activity'
  ]
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred={false} className="md:hidden">
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
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                pathname.includes(menupath[index])
                  ? "primary"
                  : "foreground"
              }
              className="w-full"
              href={`/${lang}/${menupath[index]}`}
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
