import { Report } from "@/types/report"
import { FeedReport } from "@/types/feed-report"

export function mapReportToFeedReport(
  report: Report
): FeedReport {

  return {
    id: report.id,

    title: report.title,

    slug: report.slug,

    description: report.description,

    location:
      report.location ?? undefined,

    estimated_amount:
      report.estimated_amount ??
      undefined,

    reaction_count: 0,

    comment_count: 0,

    has_response: false,

    created_at:
      report.created_at,

    category: {
      id: report.categories_id,
      name: report.category.name,
    },

    entity: {
      id: report.target_entities_id,
      display_name:
        report.entity.display_name,
    },

    evidences:
      report.evidences.map(
        (evidence, index) => ({
          id: String(index),
          file_url:
            evidence.file_url,
          file_type: "IMAGE",
        })
      ),
  }
}