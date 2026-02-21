"use client";
import { SessionResponse } from "@/app/api/my-auth/session/route";
import { NEXTJS_AUTH_API } from "@/app/APIs";
import useAssignedLocations from "@/app/react-query/hooks/ramzan-monitoring/useAssignedLocations";
import {
  Calendar02Icon,
  ChartRoseIcon,
  CustomerService02Icon,
  Notebook02Icon,
  Upload03Icon,
  WorkHistoryIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Avatar,
  Badge,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import classnames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import AppBrand from "./AppBrand";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [isClient, setClient] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClient(true);

    axios
      .get<SessionResponse>(`${NEXTJS_AUTH_API}/session`)
      .then((res) => setSession(res.data))
      .catch(() => setSession({ authenticated: false }));
  }, []);

  return (
    <>
      <nav className="bg-white">
        <div className="px-6.75 ">
          <Flex align="center" justify="between" wrap="wrap">
            <AppBrand />
            <div className="px-6.75 hidden! lg:block!">
              <Flex
                align="center"
                className="gap-5.25"
                wrap="wrap"
                justify="center"
              >
                <Flex className="py-3! px-6.5! bg-light-gray! rounded-[10px]! text-slate-gray! gap-2.5!">
                  <HugeiconsIcon icon={Calendar02Icon} size={24} />
                  <Text size="3" className="font-semibold!">
                    Day 3 of 30
                  </Text>
                </Flex>
                <Badge
                  color="green"
                  className="py-3! px-6.5! rounded-[10px]! xs:hidden md:block"
                >
                  <Flex align="center" className="gap-2.5!">
                    <FaCircle className="text-(--green-9)" size={9} />
                    <Text size="3" className="font-semibold!">
                      Submitted Today
                    </Text>
                  </Flex>
                </Badge>

                <div className="h-10 w-px bg-[#D3D3D3]"></div>

                <IconButton
                  className="block lg:!hidden"
                  radius="full"
                  variant="soft"
                  size="4"
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  {showDropDown ? (
                    <RxCross2 size={28} />
                  ) : (
                    <GiHamburgerMenu size={28} />
                  )}
                </IconButton>
                {/* <Box className="!hidden lg:!block">
                  <AuthStatus
                    session={session}
                    onLogout={() => setSession(null)}
                  />
                </Box> */}
              </Flex>
            </div>
            <Box className="lg:hidden">
              <AuthStatus session={session} onLogout={() => setSession(null)} />
            </Box>
          </Flex>
        </div>
        <div className="border-b border-[#3A3A3A]/10"></div>
        <Box position="relative">
          <Flex
            ref={containerRef}
            position="absolute"
            left="0"
            top="0"
            className="block lg:!hidden !z-30 !w-full bg-theme !rounded-3xl !overflow-hidden !transition-all !duration-500"
            style={{
              maxHeight: showDropDown ? containerRef.current?.scrollHeight : 0,
            }}
          >
            <Container>
              {/* <MobileNavLinks
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
              /> */}
            </Container>
          </Flex>
        </Box>
        {/* <div className="hidden lg:block border border-medium-gray px-2 sm:px-10 lg:px-12.5 xl:px-25">
          {session?.user?.userId && <NavLinks userId={session?.user?.userId} />}
        </div> */}
      </nav>
    </>
  );
};

const NavLinks = ({ userId }: { userId: string }) => {
  // const links = getLinks();
  const { data, isLoading, isFetching } = useAssignedLocations(userId);

  // {
  //   label: "Daily Submission",
  //   href: "/",
  //   icon: <HugeiconsIcon size={20} icon={Upload03Icon} />,
  // },

  const links = data?.map((d) => {
    return {
      label: d.name,
      href: `/?bazar=${d.id}`,
      icon: <HugeiconsIcon size={20} icon={Upload03Icon} />,
    };
  });

  const currentPath = usePathname();
  return (
    <ul className={`flex space-x-6 items-center bg-theme rounded-full h-10`}>
      {links?.map((link) => (
        <li key={link.href} className="!ml-0">
          <Link
            href={link.href}
            className={classnames("nav-link flex items-center gap-2", {
              "bg-[#F4F5FA] text-dark-blue border-b border-dark-blue":
                link.href.split("/")[1] === currentPath.split("/")[1],
              "text-slate-gray hover:text-dark-blue":
                link.href.split("/")[1] !== currentPath.split("/")[1],
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

interface Props {
  showDropDown: boolean;
  setShowDropDown: Dispatch<SetStateAction<boolean>>;
}

const getLinks = () => [
  {
    label: "Daily Submission",
    href: "/",
    icon: <HugeiconsIcon size={20} icon={Upload03Icon} />,
  },
  {
    label: "Submission History",
    href: "/submission-history",
    icon: <HugeiconsIcon size={20} icon={WorkHistoryIcon} />,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <HugeiconsIcon size={20} icon={ChartRoseIcon} />,
  },
  {
    label: "Guidelines",
    href: "/guidelines",
    icon: <HugeiconsIcon size={20} icon={Notebook02Icon} />,
  },
  {
    label: "Support",
    href: "/support",
    icon: <HugeiconsIcon size={20} icon={CustomerService02Icon} />,
  },
];

// const MobileNavLinks = ({ showDropDown, setShowDropDown }: Props) => {
//   const theme = useThemeContext();
//   const currentPath = usePathname();
//   const router = useRouter();
//   const links = getLinks();

//   return (
//     <>
//       <ul className="!block lg:!hidden ">
//         {links.map((link) => (
//           <li
//             key={link.href}
//             className={classnames({
//               "nav-link py-3 px-5": true,
//               "!text-white": theme.appearance === "dark",
//               "bg-[var(--accent-9)] !text-white":
//                 link.href.split("/")[1] === currentPath.split("/")[1],
//             })}
//             onClick={() => {
//               router.push(link.href);
//               setShowDropDown(!showDropDown);
//             }}
//           >
//             {link.label}
//           </li>
//         ))}
//         <li className="nav-link py-3 px-5">
//           <Box>
//             <AuthStatus />
//           </Box>
//         </li>
//       </ul>
//     </>
//   );
// };

const AuthStatus = ({
  session,
  onLogout,
}: {
  session: SessionResponse | null;
  onLogout: () => void;
}) => {
  const router = useRouter();

  if (!session) return null;

  if (!session.authenticated) {
    return (
      <Link
        href="/login"
        className="bg-white px-3 py-1 rounded-lg text-sm font-medium"
      >
        Login
      </Link>
    );
  }

  const handleLogout = async () => {
    try {
      await axios.post(NEXTJS_AUTH_API + "/logout");
      toast.success("Logged out successfully");
      onLogout();
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Box className="block! md:hidden! text-red-500" onClick={handleLogout}>
        <IoIosLogOut />
      </Box>

      <Box className="hidden! md:block! ">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Box className="bg-[rgba(245,247,250,0.3)] rounded-full pe-4 p-1">
              <Flex align="center" gap="4">
                <Box>
                  <Avatar
                    src="/images/user.png"
                    fallback="?"
                    radius="full"
                    size="3"
                  />
                </Box>
                <Flex direction="column" gap="1">
                  <Heading
                    as="h6"
                    className="!text-[0.938rem] !font-semibold !leading-[100%] text-dark!"
                  >
                    {session.user?.fullName}
                  </Heading>
                  <Text as="p" className="text-[0.563rem] text-cool-gray!">
                    {session.user?.email ?? "asd"}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {/* <DropdownMenu.Label>
            <Text size="2">admin@gmail.com</Text>
          </DropdownMenu.Label> */}
            {/* <DropdownMenu.Item>
            <Link href="/settings">Settings</Link>
          </DropdownMenu.Item> */}
            <DropdownMenu.Item onClick={handleLogout}>Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    </>
  );
};

export default Navbar;

{
  /* <Box className="hidden md:block">
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Box className="bg-theme rounded-full pe-4">
              <Flex align="center" gap="3">
                <FaChevronDown size={12} />
                <Box>
                  <Heading className="text-dark!" align="right" size="3">
                    Ahmad Khan
                  </Heading>
                  <Text
                    align="right"
                    as="p"
                    className="font-semibold!"
                    size="3"
                  >
                    admin@gmail.com
                  </Text>
                </Box>
                <Avatar
                  src="/images/user-image.png"
                  fallback="?"
                  radius="full"
                  className="cursor-pointer"
                  size="4"
                />
              </Flex>
            </Box>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">admin@gmail.com</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item onClick={() => router.push("/settings")}>
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => router.push("/signout")}>
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box> */
}
