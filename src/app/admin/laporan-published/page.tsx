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

export default async function AdminLaporanPublishedPage() {
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
            <h1 className="text-2xl font-bold">Laporan Dipublikasikan</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Kelola laporan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <StatsCard title="Total Laporan"     value={stats.totalReports}     icon={FileText}    color="blue"   />
            <StatsCard title="Menunggu Review"   value={stats.pendingReports}   icon={Clock}       color="yellow" />
            <StatsCard title="Dipublikasikan"    value={stats.publishedReports} icon={CheckCircle} color="green"  />
            <StatsCard title="Total Pengguna"    value={stats.totalUsers}       icon={Users}       color="purple" />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Laporan Dipublikasikan</h2>
            <AdminReportsTable reports={reports} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}