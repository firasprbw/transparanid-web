import {
  getDashboardStats,
  getPublishedReports,
  getAllUsers
} from "@/lib/api/admin"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminReportsTable } from "@/components/admin/admin-reports-table"
import { AdminUsersTable } from "@/components/admin/admin-users-table"
import { StatsCard } from "@/components/admin/stats-card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FileText, Clock, CheckCircle, Users } from "lucide-react"
import * as React from "react"

export default async function AdminAccountsPage() {
  const [stats, reports, users] = await Promise.all([
    getDashboardStats(),
    getPublishedReports(),
    getAllUsers()
  ])

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)"
      } as React.CSSProperties}
    >
      <AdminSidebar variant="inset" />

      <SidebarInset>
        <div className="p-6 space-y-8">

          <div>
            <h1 className="text-2xl font-bold">Akun Pengguna</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Kelola akun pengguna
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Semua Akun</h2>
            <AdminUsersTable users={users} />
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}