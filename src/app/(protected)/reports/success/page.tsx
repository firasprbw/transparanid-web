import Link from "next/link"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export default function ReportSuccessPage() {
  return (
    <div className="container max-w-2xl py-10 items-center justify-center">

      <Card>

        <CardHeader className="text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

          </div>

          <CardTitle>
            Laporan Berhasil Dikirim
          </CardTitle>

          <CardDescription>
            Terima kasih telah berpartisipasi dalam transparansi publik.
          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="rounded-lg border p-4">

            <p className="text-sm text-muted-foreground">
              Laporan Anda telah diterima dan akan melalui proses
              moderasi sebelum dipublikasikan kepada masyarakat.
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <Button asChild className="flex-1">

              <Link href="/">
                Lihat Feed Laporan
              </Link>

            </Button>

            <Button
              variant="outline"
              asChild
              className="flex-1"
            >

              <Link href="/reports/create">
                Buat Laporan Lagi
              </Link>

            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}