import {
  getReports
} from "@/lib/api/reports"

import {
  SearchPageClient
} from "./search-page-client"

export default async function SearchPage() {

  const reports =
    await getReports()

  return (
    <SearchPageClient
      reports={reports}
    />
  )
}