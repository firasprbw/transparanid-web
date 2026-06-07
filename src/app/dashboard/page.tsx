import { TransparanLayout } from "@/components/layout/transparan-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  getMyReports
} from "@/lib/api/dashboard"

import Link from "next/link"

export default async function DashboardPage() {

  const reports =
    await getMyReports()

  const totalReports =
    reports.length

  const publishedReports =
    reports.filter(
      report =>
        report.status ===
        "PUBLISHED"
    ).length

  const pendingReports =
    reports.filter(
      report =>
        report.status ===
        "PENDING_REVIEW"
    ).length

  const rejectedReports =
    reports.filter(
      report =>
        report.status ===
        "REJECTED"
    ).length

  return (
    <TransparanLayout>
        <div className="space-y-6">

      <div>

        <h1 className="text-xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Ringkasan aktivitas akun Anda
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-4">

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Reports
            </p>

            <h2 className="text-3xl font-bold">
              {totalReports}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Published
            </p>

            <h2 className="text-3xl font-bold">
              {publishedReports}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Pending
            </p>

            <h2 className="text-3xl font-bold">
              {pendingReports}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Rejected
            </p>

            <h2 className="text-3xl font-bold">
              {rejectedReports}
            </h2>
          </CardContent>
        </Card>

      </div>

      <Card>

        <CardHeader>

          <CardTitle>
            Recent Reports
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            {
              reports.length === 0 && (

                <p className="text-muted-foreground">
                  Belum ada laporan
                </p>

              )
            }

            {
              reports.map(
                report => (

                  <Link
                    key={report.id}
                    href={`/reports/${report.slug}`}
                    className="
                      block
                      rounded-lg
                      border
                      p-4
                      transition
                      hover:bg-muted
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-medium">
                          {report.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            report.created_at
                          ).toLocaleDateString(
                            "id-ID"
                          )}
                        </p>

                      </div>

                      <span className="text-sm font-medium">
                        {report.status}
                      </span>

                    </div>

                  </Link>

                )
              )
            }

          </div>

        </CardContent>

      </Card>

    </div>
    </TransparanLayout>

    

  )
}