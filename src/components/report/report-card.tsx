import Link from "next/link"

import {
  Card,
  CardContent
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import {
  MessageCircle,
  ThumbsUp,
  MapPin,
  Building2
} from "lucide-react"

import EvidencePreview from "./evidence-preview"

import { FeedReport } from "@/types/feed-report"

import { formatCurrency } from "@/lib/format-currency"
import { getImpactLevel } from "@/lib/get-impact-level"

interface ReportCardProps {
  report: FeedReport
}

export default function ReportCard({
  report
}: ReportCardProps) {

  const impact =
    getImpactLevel(
      report.estimated_amount
    )

  return (
    <Link
      href={`/reports/${report.slug}`}
    >
      <Card className="transition-all mb-4 hover:bg-muted/30">

        <CardContent className="space-y-4 p-5">

          <div className="flex items-center gap-2 text-sm font-medium">

            <Building2 className="size-4" />

            <span>
              {report.entity.display_name}
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            <Badge variant="outline">
              {report.category.name}
            </Badge>

            {report.has_response ? (
              <Badge>
                Sudah Ditanggapi
              </Badge>
            ) : (
              <Badge
                variant="secondary"
              >
                Menunggu Tanggapan
              </Badge>
            )}

            {impact && (
              <Badge
                variant={
                  impact.variant as any
                }
              >
                {impact.label}
              </Badge>
            )}

          </div>

          <h2 className="text-xl font-semibold leading-tight">
            {report.title}
          </h2>

          <p className="line-clamp-3 text-muted-foreground">
            {report.description}
          </p>

          <EvidencePreview
            evidences={
              report.evidences
            }
          />

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">

            {report.location && (
              <div className="flex items-center gap-1">

                <MapPin className="size-4" />

                {report.location}

              </div>
            )}

            {report.estimated_amount && (
              <div>
                {formatCurrency(
                  report.estimated_amount
                )}
              </div>
            )}

          </div>

          <div className="flex items-center gap-5 text-sm text-muted-foreground">

            <div className="flex items-center gap-1">

              <ThumbsUp className="size-4" />

              {report.reaction_count}

            </div>

            <div className="flex items-center gap-1">

              <MessageCircle className="size-4" />

              {report.comment_count}

            </div>

          </div>

          <p className="text-xs text-muted-foreground">
            Dilaporkan secara anonim
          </p>

        </CardContent>

      </Card>
    </Link>
  )
}