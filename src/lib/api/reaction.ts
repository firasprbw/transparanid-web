export interface TrustInfo {
  trustCount: number
  trusted: boolean
}

async function parseApiResponse<T>(
  response: Response
): Promise<T> {
  const text = await response.text()
  const contentType =
    response.headers
      .get("content-type")
      ?.includes("application/json")

  if (!response.ok) {
    if (contentType) {
      try {
        const result = JSON.parse(text)
        throw new Error(
          result?.message ||
            `Request failed with status ${response.status}`
        )
      } catch {
        throw new Error(
          `Request failed with status ${response.status}: ${text.slice(0,200)}`
        )
      }
    }

    throw new Error(
      `Request failed with status ${response.status}: ${text.slice(0,200)}`
    )
  }

  if (!contentType) {
    throw new Error(
      `Expected JSON response but received ${response.statusText}`
    )
  }

  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error(
      `Invalid JSON response: ${text.slice(0,200)}`
    )
  }
}

export async function getTrustInfo(
  reportId: string
): Promise<TrustInfo> {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/trust`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      }
    )

  const result =
    await parseApiResponse<{ data: TrustInfo }>(response)

  return result.data
}

export async function trustReport(
  reportId: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/trust`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      }
    )

  return parseApiResponse(response)
}

export async function untrustReport(
  reportId: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/trust`,
      {
        method: "DELETE",
        credentials: "include"
      }
    )

  return parseApiResponse(response)
}