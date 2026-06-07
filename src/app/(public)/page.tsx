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

export default async function HomePage() {

  const reports =
    await getReports()

  const feedReports =
    reports.map(
      mapReportToFeedReport
    )

  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between ">

  <div>

    {/* <h1 className="text-2xl font-bold">
      Feed Laporan
    </h1> */}
    <p className="text-muted-foreground">
      Laporan masyarakat yang telah dipublikasikan
    </p>

  </div>

  <Button>

    <Link href={"/reports/create"}>
      + Buat Laporan
    </Link>

  </Button>

</div>

      <ReportFeed
        reports={feedReports}
      />

    </div>
  )
}