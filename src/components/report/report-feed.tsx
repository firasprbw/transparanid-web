import ReportCard from "./report-card"
import ReportEmpty from "./report-empty"

import { FeedReport }
  from "@/types/feed-report"

interface ReportFeedProps {
  reports: FeedReport[]
}

export default function ReportFeed({
  reports
}: ReportFeedProps) {

  if (reports.length === 0) {
    return <ReportEmpty />
  }

  return (
    <div className="space-y-4">

      {reports.map(report => (
        <ReportCard
          key={report.id}
          report={report}
        />
      ))}

    </div>
  )
}