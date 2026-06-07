import { cookies } from "next/headers"

// Temporary debug — hapus setelah fix
export async function getSavedReports() {
  const cookieStore = await cookies()

  const cookieHeader = cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join("; ")

  console.log("[getSavedReports] Cookie header:", cookieHeader) // ← ada token?

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/saved`,
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store"
    }
  )

  console.log("[getSavedReports] Status:", response.status)

  const result = await response.json()
  console.log("[getSavedReports] Raw result:", JSON.stringify(result)) // ← apa isinya?

  if (!response.ok) throw new Error("Failed to fetch saved reports")

  return result.data
}