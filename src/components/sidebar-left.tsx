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
import { TerminalIcon, AudioLinesIcon, SearchIcon, SparklesIcon, HomeIcon, InboxIcon, CalendarIcon, Settings2Icon, BlocksIcon, Trash2Icon, MessageCircleQuestionIcon } from "lucide-react"
import { NavUser } from "./nav-user"

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
    title: "Home",
    url: "/",
    icon: <HomeIcon className="h-4 w-4" />
  },
  {
    title: "Laporan",
    url: "/reports",
    icon: <SearchIcon className="h-4 w-4" />
  },
  {
    title: "Entitas",
    url: "/entities",
    icon: <BlocksIcon className="h-4 w-4" />
  },
  {
    title: "Kategori",
    url: "/categories",
    icon: <AudioLinesIcon className="h-4 w-4" />
  },
  {
    title: "Buat Laporan",
    url: "/create-report",
    icon: <SparklesIcon className="h-4 w-4" />
  },
  {
    title: "Tersimpan",
    url: "/saved",
    icon: <Trash2Icon className="h-4 w-4" />
  }
],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
      <SidebarRail />
      <NavUser user={data.user} />
    </Sidebar>
  )
}
