import Link from "next/link"

import {
  getPendingReports
} from "@/lib/api/admin"

export default async function ReportsPage() {

  const reports =
    await getPendingReports()

  return (
    <div className="space-y-4">

      <h1 className="text-2xl font-bold">
        Moderation Queue
      </h1>

      {
        reports.map(report => (

          <Link
            key={report.id}
            href={`/admin/reports/${report.id}`}
          >
            {report.title}
          </Link>

        ))
      }

    </div>
  )
}