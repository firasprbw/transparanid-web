import Link from "next/link"

import {
  getReports
} from "@/lib/api/reports"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { TransparanLayout } from "@/components/layout/transparan-layout"

export default async function CategoriesPage() {

  const reports =
    await getReports()

  const categories = [
  ...new Set(
    reports
      .map(
        report =>
          report.category?.name
      )
      .filter(Boolean)
  )
]

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
        Categories
      </h1>

      <div
        className="
          grid
          gap-4
          md:grid-cols-3
        "
      >

        {
          categories.map(
            category => (

              <Link
                key={category}
                href={
                  `/reports/categories/${encodeURIComponent(category)}`
                }
              >

                <Card>

                  <CardContent
                    className="
                      p-6
                    "
                  >

                    <h2
                      className="
                        text-lg
                        font-semibold
                      "
                    >
                      {category}
                    </h2>

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