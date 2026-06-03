import EvidenceGallery from "@/components/report/evidence-gallery"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  getReportBySlug
} from "@/lib/api/reports"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function
ReportDetailPage({
  params
}: PageProps) {

  const { slug } =
    await params

  const report =
  await getReportBySlug(slug)

console.log(
  JSON.stringify(
    report,
    null,
    2
  )
)

  return (

    <Card className="max-w-4xl mx-auto p-6">

    <div className="space-y-6">

      {/* Header */}

      <div className="space-y-3">

        <div className="flex items-center gap-2">

          <Badge variant="secondary">
            {report.report_categories.name}
          </Badge>

          <Badge variant="outline">
            Dipublikasikan
          </Badge>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            {report.entities.display_name}
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {report.title}
          </h1>

        </div>

      </div>

      {/* Deskripsi */}

      <div>

        <p className="leading-7">
          {report.description}
        </p>

      </div>

      {/* Evidence */}

      {report.evidences?.length > 0 && (

        <div className="space-y-3">

          <h2 className="font-semibold">
            Bukti Pendukung
          </h2>

          <EvidenceGallery
            evidences={report.evidences}
          />

        </div>

      )}

      {/* Informasi */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-4
        pt-4
        border-t
      "
      >

        <div>

          <p className="text-sm text-muted-foreground">
            Lokasi
          </p>

          <p className="font-medium">
            {report.location ?? "-"}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Tanggal Kejadian
          </p>

          <p className="font-medium">
            {report.incident_date}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Estimasi Kerugian
          </p>

          <p className="font-medium">
            Rp{" "}
            {report.estimated_amount?.toLocaleString(
              "id-ID"
            ) ?? "-"}
          </p>

        </div>

      </div>

    </div>

  </Card>

  )
}