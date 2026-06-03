import { apiFetch } from "./client"

import { ApiResponse } from "@/types/api"
import { Report } from "@/types/report"

export async function getReports() {
  const response =
    await apiFetch<ApiResponse<Report[]>>(
      "/reports"
    )

  return response.data
}

export async function getReportBySlug(
  slug: string
) {
  const response =
    await apiFetch<
      ApiResponse<Report>
    >(`/reports/${slug}`)

  return response.data
}

export async function createReport(
  formData: FormData,
  token: string
) {
  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: formData
      }
    )

  if (!response.ok) {
    throw new Error(
      "Failed to create report"
    )
  }

  return response.json()
}

