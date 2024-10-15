"use client"

import Link from 'next/link'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'
import {Calendar, ClipboardList, Drumstick, House, List, Menu, Settings, User as UserIcon} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {SignOutButton} from "@clerk/nextjs"
import settingsRoutes from "./settings/settingsRoutes"
import React from "react";
import {CgProfile} from "react-icons/cg";
import {User} from "@/lib/http/client/users/getCurrentLoggedInUser";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {BiExit} from "react-icons/bi";
import {IoExit} from "react-icons/io5";
import {RxExit} from "react-icons/rx";

const navigation = [
  {name: "Shopping Lists", href: "/lists", comingSoon: false},
  {name: "Items", href: "/items", comingSoon: false},
  {name: "Meal Plans", href: "/plans", comingSoon: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true"},
  {name: "Meals", href: "/meals", comingSoon: process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true"},
]

export default function Navbar({currentUser}: { currentUser: User }) {
  const pathname = usePathname()
  const router = useRouter()

  if (!currentUser) return null;

  return (
    <nav className="w-full z-50 bg-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/lists" className="flex items-center">
                <h1 className="text-white text-2xl font-extrabold">M</h1>
                <h1 className="text-white text-2xl font-extrabold">unchies</h1>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} href={item.href} active={pathname === item.href}
                           comingSoon={item.comingSoon}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ProfileMenu
                avatar={currentUser.image}
                username={`${currentUser.firstName} ${currentUser.lastName}`}
                email={currentUser.email}
              />
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white ml-2 w-10 h-10">
                  <Menu className="min-h-6 min-w-6"/>
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm text-white bg-header">
                <MobileMenu
                  avatar={currentUser.image}
                  username={`${currentUser.firstName} ${currentUser.lastName}`}
                  navigation={navigation}
                  email={currentUser.email}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({href, active, children, comingSoon}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  comingSoon: boolean
}) {
  if (!comingSoon) return <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium ${
    active
      ? "bg-secondary dark:bg-background text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
  }`}>
    {children}
  </Link>
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={"#"}
            className={`relative px-3 py-2 rounded-md text-sm font-medium ${
              active ? "bg-secondary dark:bg-background text-white"
                : comingSoon ? "text-gray-500 hover:bg-gray-700 hover:text-gray-500"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {children}
          </Link></TooltipTrigger>
        <TooltipContent>
          Coming Soon
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ProfileMenu({avatar, username, email}: { avatar: string; username: string; email: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/*<Button variant="ghost" size="icon" className="rounded-full">*/}
          <div
            className="h-10 w-10 bg-gradient-to-r from-blue-400 to-primary rounded-full flex justify-center items-center">
            <Image
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt={`${username}'s avatar`}
              width={40}
              height={40}
            />
          </div>
        {/*</Button>*/}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="flex gap-2 items-center">
          <Image
            className="h-10 w-10 rounded-full"
            src={avatar}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{username}</h3>
            <p className="text-sm text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="my-2"/>
        <DropdownMenuItem asChild>
          <Link href="/settings/profile" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4"/>
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/household" className="flex items-center">
            <House className="mr-2 h-4 w-4"/>
            <span>Household</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2"/>
        <DropdownMenuItem
          className="w-full h-8"
          // variant="destructive"
        >
          <RxExit className="mr-2 h-4 w-4"/>
          <SignOutButton/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileMenu({avatar, username, navigation, email}: {
  avatar: string;
  username: string;
  email: string;
  navigation: { name: string; href: string }[];
}) {
  const router = useRouter()
  return (
    <div className="pt-5 pb-3 space-y-1 bg-header">
      <div className="flex items-center px-4 mb-8">
        <div
          className="h-10 w-10 bg-gradient-to-r from-blue-400 to-primary rounded-full flex justify-center items-center">
          <Image
            className="h-10 w-10 rounded-full"
            src={avatar}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
          />

        </div>
        <div className="ml-3">
          <h3 className="text-base font-medium text-gray-800 dark:text-white">{username}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <MobileNavLink href={"/lists"} icon={<ClipboardList className="h-6 w-6"/>}>
          <SheetClose>
            Lists
          </SheetClose>
        </MobileNavLink>
        <MobileNavLink href={"/items"} icon={<List className="h-6 w-6"/>}>
          <SheetClose>
            Items
          </SheetClose>
        </MobileNavLink>
        <MobileNavLink
          href={"/plans"}
          icon={<Calendar className="h-6 w-6"/>}
          comingSoon={process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true"}
        >
          <SheetClose>
            Meal plans
          </SheetClose>
        </MobileNavLink>
        <MobileNavLink
          href={"/meals"}
          icon={<Drumstick
            className="h-6 w-6"/>}
          comingSoon={process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true"}
        >
          <SheetClose>
            Meals
          </SheetClose>
        </MobileNavLink>
        <MobileNavLink href={settingsRoutes[0].href} icon={<Settings className="h-6 w-6"/>}>
          <SheetClose>
            Settings
          </SheetClose>
        </MobileNavLink>
        <MobileNavLink href={settingsRoutes[0].href} icon={<CgProfile className="h-6 w-6 ml-4"/>}>
          <SheetClose>
            Profile
          </SheetClose>
        </MobileNavLink>
        <MobileNavLink href={settingsRoutes[1].href} icon={<House className="h-6 w-6 ml-4"/>}>
          <SheetClose>
            Household
          </SheetClose>
        </MobileNavLink>
        <div className="px-4 pt-4">
          <Button
            className="w-full h-10 mt-2"
            variant="destructive"
          >
            <SignOutButton/>
          </Button>
        </div>
      </div>
    </div>
  )
}

function MobileNavLink({href, icon, children, comingSoon}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode,
  comingSoon?: boolean
}) {
  return (
    <Link href={comingSoon ? "#" : href}
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-4 py-2 rounded-md text-base">
      <span className="flex items-center">
        {icon}
        <span className={`ml-3 ${comingSoon ? "text-muted-foreground" : ""}`}>{children}</span>
        {comingSoon && (
          <span className="ml-3 text-xs text-muted-foreground">(Coming Soon)</span>
        )}
      </span>
    </Link>
  )
}