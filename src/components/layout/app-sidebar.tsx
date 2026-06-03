"use client"

import Link from "next/link"
import {
  Home,
  Building2,
  Folder,
  Bookmark,
  PlusCircle
} from "lucide-react"

const items = [
  {
    title: "Home",
    href: "/",
    icon: Home
  },
  {
    title: "Entities",
    href: "/entities",
    icon: Building2
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Folder
  },
  {
    title: "Saved",
    href: "/saved",
    icon: Bookmark
  },
  {
    title: "Create Report",
    href: "/create-report",
    icon: PlusCircle
  }
]

export default function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Transparan ID
        </h1>
      </div>

      <nav className="space-y-2 px-3">
        {items.map(item => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <Icon className="h-5 w-5" />

              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}