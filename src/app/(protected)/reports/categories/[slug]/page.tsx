import Link from "next/link"

import {
  getReports
} from "@/lib/api/reports"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { TransparanLayout } from "@/components/layout/transparan-layout"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({
  params
}: Props) {

  const {
    slug
  } = await params

  const decodedCategory =
    decodeURIComponent(slug)

  const reports =
    await getReports()

  // const decodedCategory =
  //   decodeURIComponent(
  //     category
  //   )

  const filteredReports =
    reports.filter(
      report =>

        report.category?.name ===
        decodedCategory
    )

  return (
    <TransparanLayout>
      <div
      className="
        container
        mx-auto
        max-w-6xl
        py-8
      "
    >

      <h1
        className="
          mb-6
          text-xl
          font-bold
        "
      >
        {decodedCategory}
      </h1>

      <div
        className="
          space-y-4
        "
      >

        {
          filteredReports.map(
            report => (

              <Link
                key={report.id}
                href={
                  `/reports/${report.slug}`
                }
              >

                <Card className="hover:bg-muted mt-4">

                  <CardContent
                    className="
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        gap-4
                      "
                    >

                      {
                        report
                          .evidences?.[0]
                          ?.file_url && (

                          <img
                            src={
                              report
                                .evidences[0]
                                .file_url
                            }
                            alt={
                              report.title
                            }
                            className="
                              h-24
                              w-32
                              rounded-lg
                              object-cover
                            "
                          />

                        )
                      }

                      <div>

                        <h2
                          className="
                            font-semibold
                          "
                        >
                          {
                            report.title
                          }
                        </h2>

                        <p
                          className="
                            text-sm
                            text-muted-foreground
                          "
                        >
                          Terlapor : {
                            report
                              .entity
                              ?.display_name
                          }
                        </p>

                        <p
                          className="
                            text-sm
                            text-muted-foreground
                          "
                        >
                          📍 {
                            report.location
                          }
                        </p>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              </Link>

            )
          )
        }

      </div>

    </div>
    </TransparanLayout>

    

  )
}