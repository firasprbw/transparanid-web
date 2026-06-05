"use client"

import { usePathname } from "next/navigation"

import { ReactNode } from "react"

import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"

interface TransparanLayoutProps {
  children: ReactNode
}

export function TransparanLayout({
  children,
}: TransparanLayoutProps) {

  const pathname = usePathname()
  const segments =
  pathname
    .split("/")
    .filter(Boolean)

  return (
    
    <SidebarProvider>
      <SidebarLeft />

      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />

            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>

  <BreadcrumbItem>

    <BreadcrumbLink href="/">
      Home
    </BreadcrumbLink>

  </BreadcrumbItem>

  {segments.map(
    (segment, index) => {

      const href =
        "/" +
        segments
          .slice(
            0,
            index + 1
          )
          .join("/")

      const isLast =
        index ===
        segments.length - 1

      return (
        <React.Fragment
          key={href}
        >

          <BreadcrumbSeparator />

          <BreadcrumbItem>

            {isLast ? (

              <BreadcrumbPage>
                {segment}
              </BreadcrumbPage>

            ) : (

              <BreadcrumbLink href={href}>
                {segment}
              </BreadcrumbLink>

            )}

          </BreadcrumbItem>

        </React.Fragment>
      )
    }
  )}

</BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 p-4">
          {children}
        </main>
      </SidebarInset>

      <SidebarRight />
    </SidebarProvider>
  )
}