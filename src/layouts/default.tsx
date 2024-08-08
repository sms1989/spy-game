import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import {
  GithubIcon,
  HeartFilledIcon,
} from "@/components/icons";
import { siteConfig } from '@/config/site';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <img src="/background.jpg" className="absolute left-1/2 -translate-x-1/2 object-cover max-w-sm w-full z-0" />
      <main className="container mx-auto max-w-sm px-6 flex-grow flex items-center">
        {children}
      </main>
      <footer className="w-full flex items-center max-w-sm py-3 h-20 justify-between mx-auto">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-default-600"
          href={siteConfig.links.sponsor}
        >
          یه قهوه مهمونمون کن! ☕️
        </Button>
      </footer>
    </div>
  );
}
