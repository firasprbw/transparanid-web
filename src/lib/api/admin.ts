import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ── TYPES ────────────────────────────────────────────

export interface AdminReport {
  id: string
  title: string
  slug: string
  location: string
  status: string
  estimated_amount: number
  created_at: string
  moderated_at: string | null
  entities: { id: string; display_name: string; type: string }
  report_categories: { id: string; name: string }
  report_evidences: { id: string; file_url: string }[]
  report_comments: {
    id: string
    content: string
    created_at: string
    status: string
    users: { id: string; username: string }
  }[]
}

export interface PendingReport {
  id: string
  title: string
  slug: string
  location: string
  status: string
  estimated_amount: number
  created_at: string
  entities: { id: string; display_name: string; type: string }
  report_categories: { id: string; name: string }
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  is_banned: boolean
  created_at: string
}

export interface DashboardStats {
  totalReports: number
  pendingReports: number
  publishedReports: number
  totalUsers: number
}

// ── HELPER ───────────────────────────────────────────

const getAuthHeader = async (): Promise<Record<string, string>> => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  return token ? { Cookie: `token=${token}` } : {}
}

const fetchJson = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const authHeader = await getAuthHeader()

  const headers: HeadersInit = {
    Accept: "application/json",
    ...authHeader,
    ...(options.headers as Record<string, string> | undefined)
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    cache: "no-store",
    ...options,
    headers
  })

  const text = await response.text()

  if (!response.ok) {
    try {
      const result = JSON.parse(text)
      throw new Error(result?.message || `Request failed (${response.status})`)
    } catch {
      throw new Error(`Request failed (${response.status})`)
    }
  }

  return JSON.parse(text)
}

// ── API FUNCTIONS ────────────────────────────────────

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const result = await fetchJson<{ data: DashboardStats }>("/admin/stats")
  return result.data
}

export const getPendingReports = async (): Promise<PendingReport[]> => {
  const result = await fetchJson<{ data: PendingReport[] }>("/admin/reports/pending")
  return result.data
}

export const getPublishedReports = async (): Promise<AdminReport[]> => {
  const result = await fetchJson<{ data: AdminReport[] }>("/admin/reports/published")
  return result.data
}

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const result = await fetchJson<{ data: AdminUser[] }>("/admin/users")
  return result.data
}

export const publishReport = async (reportId: string): Promise<void> => {
  await fetchJson(`/admin/reports/${reportId}/publish`, { method: "PATCH" })
}

export const rejectReport = async (reportId: string, rejectionReason: string): Promise<void> => {
  await fetchJson(`/admin/reports/${reportId}/reject`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rejectionReason })
  })
}

export const getReportDetail = async (
  reportId: string
): Promise<AdminReport> => {

  const result =
    await fetchJson<{
      data: AdminReport
    }>(
      `/reports/${reportId}`
    )

  return result.data
}

// ─────────────────────────────────────────────────────────────
// 4. FRONTEND — tambahkan di src/lib/api/admin.ts
// ─────────────────────────────────────────────────────────────

export interface ModeratorReportDetail {
  id: string
  title: string
  slug: string
  description: string
  location: string
  estimated_amount: number
  incident_date: string
  created_at: string
  status: string
  entities: { id: string; display_name: string; type: string }
  report_categories: { id: string; name: string }
  evidences: { id: string; file_url: string; file_type: string }[]
}

export const getModeratorReportDetail = async (
  slug: string
): Promise<ModeratorReportDetail> => {
  const result = await fetchJson<{ data: ModeratorReportDetail }>(
    `/admin/reports/${slug}/detail`
  )
  return result.data
}