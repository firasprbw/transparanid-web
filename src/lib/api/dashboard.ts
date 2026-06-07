import { cookies } from "next/headers"

export interface UserReport {
  id: string
  title: string
  slug: string
  status: string
  created_at: string
}

export async function getMyReports(): Promise<UserReport[]> {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/my`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reports: ${response.status} ${response.statusText}`
    )
  }

  const result = await response.json()
  return result.data
}