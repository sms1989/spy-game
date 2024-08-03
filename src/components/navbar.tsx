import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  HeartFilledIcon,
} from "@/components/icons";

export const Navbar = () => {


  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img src="/logo.webp" className="size-10 rounded-xl" />
            <p className="font-bold text-inherit">جاسوس</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className=" gap-2">
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
