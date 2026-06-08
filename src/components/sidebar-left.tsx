"use client"

import * as React from "react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TerminalIcon, AudioLinesIcon, SearchIcon, SparklesIcon, HomeIcon, InboxIcon, CalendarIcon, Settings2Icon, BlocksIcon, Trash2Icon, MessageCircleQuestionIcon, BookmarkIcon, Pen, LayoutDashboard } from "lucide-react"
import { NavUser } from "./nav-user"
import { Separator } from "./ui/separator"
import { useAuth } from "@/contexts/auth-context"

// This is sample data.
const data = {
  teams: [
    {
      name: "TransparanID",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
  {
    title: "Beranda",
    url: "/",
    icon: <HomeIcon className="h-4 w-4" />
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />
  },
  {
    title: "Chatbot",
    url: "/chatbot",
    icon: <SparklesIcon className="h-4 w-4" />
  },
  {
    title: "Laporan",
    url: "/reports",
    icon: <InboxIcon className="h-4 w-4" />
  },
  {
    title: "Cari",
    url: "/search",
    icon: <SearchIcon className="h-4 w-4" />
  },
  // {
  //   title: "Kategori",
  //   url: "/categories",
  //   icon: <BlocksIcon className="h-4 w-4" />
  // },
  {
    title: "Buat Laporan",
    url: "/reports/create",
    icon: <Pen className="h-4 w-4" />
  },
  // {
  //   title: "Tersimpan",
  //   url: "/saved-reports",
  //   icon: <BookmarkIcon className="h-4 w-4" />
  // }
],
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
}



export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
const {
  user,
  loading
} = useAuth()

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {
  !loading &&
  user && (

    <NavUser
      user={{
        name: user.username,
        email: user.email,
        avatar: ""
      }}
    />

  )
}
      </SidebarContent>
      <SidebarRail />
      
    </Sidebar>
  )
}
