import { cookies } from "next/headers"
import { getDashboardStats, getPendingReports } from "@/lib/api/admin"

import { ModeratorSidebar } from "@/components/admin/moderator-sidebar"
import { ModeratorReportsTable } from "@/components/admin/moderator-reports-table"
import { StatsCard } from "@/components/admin/stats-card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Clock } from "lucide-react"
import * as React from "react"
import { useAuth } from "@/contexts/auth-context"


export default async function ModeratorDashboardPage() {
  const [stats, pendingReports] = await Promise.all([
    getDashboardStats(),
    getPendingReports(),
  ])

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)"
      } as React.CSSProperties}
    >
      <ModeratorSidebar variant="inset" />

      <SidebarInset>
        <div className="p-6 space-y-8">

          <div>
            <h1 className="text-2xl font-bold">Dashboard Moderator</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Tinjau dan moderasi laporan yang masuk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <StatsCard
              title="Menunggu Review"
              value={stats.pendingReports}
              icon={Clock}
              color="yellow"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">
              Laporan Menunggu Review
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({pendingReports.length} laporan)
              </span>
            </h2>
            <ModeratorReportsTable reports={pendingReports} />
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}