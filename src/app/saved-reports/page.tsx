import Link from "next/link"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  getSavedReports
} from "@/lib/api/server/saved-reports"
import { TransparanLayout } from "@/components/layout/transparan-layout"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function SavedReportsPage() {

  const reports =
  (await getSavedReports()) ?? []

  return (
<TransparanLayout>
    <div className="space-y-6">

      <div>

        <h1 className="text-xl font-bold">
          Saved Reports
        </h1>

        <p className="text-muted-foreground">
          Laporan yang telah Anda simpan
        </p>

      </div>

      <Card>

        <CardHeader>

          <CardTitle>
            Daftar Laporan
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            {
              reports.length === 0 && (

                <div
                  className="
                    rounded-lg
                    border
                    p-8
                    text-center
                  "
                >

                  <p className="text-muted-foreground">
                    Belum ada laporan yang disimpan
                  </p>

                </div>

              )
            }

            {
              reports.map(
                  (                item: { reports: { id: Key | null | undefined; slug: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; created_at: string | number | Date; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined } }) => (

                  <Link
                    key={
                      item.reports.id
                    }
                    href={
                      `/reports/${item.reports.slug}`
                    }
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
                          {
                            item.reports.title
                          }
                        </h3>

                        <p className="text-sm text-muted-foreground">

                          {
                            new Date(
                              item.reports.created_at
                            ).toLocaleDateString(
                              "id-ID"
                            )
                          }

                        </p>

                      </div>

                      <span
                        className="
                          text-xs
                          font-medium
                        "
                      >

                        {
                          item.reports.status
                        }

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