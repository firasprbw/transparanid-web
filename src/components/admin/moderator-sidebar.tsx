"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  CommandIcon,
  Settings2Icon,
  CircleHelpIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/moderator/dashboard",
      icon: <LayoutDashboardIcon />
    },
    // {
    //   title: "Laporan Pending",
    //   url: "/moderator/dashboard",
    //   icon: <FileTextIcon />
    // }
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "/moderator/settings",
  //     icon: <Settings2Icon />
  //   },
  //   {
  //     title: "Bantuan",
  //     url: "#",
  //     icon: <CircleHelpIcon />
  //   }
  // ]
}

type Props = React.ComponentProps<typeof Sidebar>

export function ModeratorSidebar({ ...props }: Props) {
  const { user, loading } = useAuth()

  return (
    <Sidebar collapsible="offcanvas" {...props}>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/moderator/dashboard">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">TransparanID</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        {!loading && user && (
          <NavUser
            user={{
              name: user.username,
              email: user.email,
              avatar: ""
            }}
          />
        )}
      </SidebarContent>

      <SidebarFooter>
        
      </SidebarFooter>

    </Sidebar>
  )
}