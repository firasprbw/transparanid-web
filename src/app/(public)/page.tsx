import ReportFeed from "@/components/report/report-feed"
import ReportError from "@/components/report/report-error"
import {Card} from "@/components/ui/card"

import {
  getReports
} from "@/lib/api/reports"

import {
  mapReportToFeedReport
} from "@/lib/mappers/report.mapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function HomePage() {

  const reports =
    await getReports()

  const feedReports =
    reports.map(
      mapReportToFeedReport
    )

  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between gap-4 p-6 rounded-xl border bg-background">
  <div>
    <h1 className="text-xl font-medium">Feed Laporan</h1>
    <p className="text-sm text-muted-foreground mt-1">
      Laporan masyarakat yang telah dipublikasikan
    </p>
  </div>

  <Button asChild>
    <Link href="/reports/create">
      <Plus className="size-4" />
      Buat Laporan
    </Link>
  </Button>
</div>

      <ReportFeed
        reports={feedReports}
      />

    </div>
  )
}