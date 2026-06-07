"use client"

import {
  useMemo,
  useState
} from "react"

import Link from "next/link"

import {
  Input
} from "@/components/ui/input"

import {
  Card,
  CardContent
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { TransparanLayout } from "@/components/layout/transparan-layout"
import { description } from "@/components/chart-area-interactive"

interface Props {
  reports: any[]
}

export function SearchPageClient({
  reports
}: Props) {

  const [
    search,
    setSearch
  ] = useState("")

  const [
    category,
    setCategory
  ] = useState("all")

  const categories =
    [
      "all",

      ...new Set(
        reports
          .map(
            report =>
              report
                .report_categories
                ?.name
          )
          .filter(Boolean)
      )
    ]

  const filteredReports =
    useMemo(() => {

      return reports.filter(
        report => {

          const matchesSearch =

            report.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesCategory =

            category === "all"

              ? true

              : report.category?.name === category

          return (
            matchesSearch &&
            matchesCategory
          )
        }
      )

    }, [
      reports,
      search,
      category
    ])

  return (

    <TransparanLayout>
        <div
      className="
        container
        mx-auto
        max-w-5xl
        py-8
        space-y-6
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Search Reports
        </h1>

        <p
          className="
            text-muted-foreground
          "
        >
          Cari laporan berdasarkan judul
          dan kategori
        </p>

      </div>

      <div
        className="
          grid
          gap-4
          md:grid-cols-4
        "
      >

        <div
          className="
            md:col-span-3
          "
        >

          <Input
            placeholder="
              Cari laporan...
            "
            value={search}
            onChange={e =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <Select
          value={category}
          onValueChange={
            setCategory
          }
        >

          <SelectTrigger>

            <SelectValue />

          </SelectTrigger>

          <SelectContent>

            {
              categories.map(
                item => (

                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>

                )
              )
            }

          </SelectContent>

        </Select>

      </div>

      <div
        className="
          space-y-4
        "
      >

        {
          filteredReports.length === 0 && (

            <Card>

              <CardContent
                className="
                  p-8
                  text-center
                "
              >

                Tidak ada laporan ditemukan

              </CardContent>

            </Card>

          )
        }

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

      <img
        src={
          report.evidences?.[0]
            ?.file_url
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

      <div
        className="
          flex-1
        "
      >

        <h3
          className="
            font-semibold
          "
        >
          {
            report.title
          }
        </h3>

        <p
      className="
        text-sm
        text-muted-foreground
        mt-2
      "
    >
      Terlapor : {
        report.entity
          ?.display_name
      }
    </p>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          {
            report
              .report_categories
              ?.name
              .description
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