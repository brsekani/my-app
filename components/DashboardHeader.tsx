"use client";

import Link from "next/link";
import profileDropdown from "@/assets/svgs/profile-dropdown.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useGetCustomerStoreQuery } from "@/redux/api/storeApi";

export default function DashboardHeader() {
  const {
    data: userData,
    isLoading: userDataLoading,
    isError,
    error,
  } = useGetCustomerStoreQuery();

  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full leading-[100%] px-5 py-3 sm:py-4 max-w-360 mx-auto flex items-center justify-between">
      <Link
        href="/"
        className="py-[14px] px-[18px] w-[100px] h-[39px] flex justify-center items-center gap-4 rounded-full bg-[#004466] text-white"
      >
        Logo
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full outline-none transition-opacity hover:opacity-80">
            <Image src={profileDropdown} alt="Profile menu" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-semibold">My Account</span>
              <span className="text-xs text-muted-foreground">
                {userDataLoading ? (
                  <span className="inline-block h-3 w-32 animate-pulse rounded bg-[#E5E7EB]" />
                ) : (
                  userData?.data?.store?.email
                )}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href={"/settings/profile"}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>

            <Link href={"/settings/themes"}>
              <DropdownMenuItem>Themes</DropdownMenuItem>
            </Link>

            <Link href={"/settings/security"}>
              <DropdownMenuItem>Security</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
