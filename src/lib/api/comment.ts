export interface Comment {
  id: string
  content: string
  parent_comment_id: string | null
  created_at: string

  users: {
    id: string
    username: string
  }
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

export async function getComments(
  reportId: string
): Promise<Comment[]> {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/comments`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      }
    )

  const result =
    await parseApiResponse<{ data: Comment[] }>(response)

  return result.data
}

export const createComment = async (
  reportId: string,
  content: string,
  parentCommentId?: string  // ← pastikan parameter ini ada
): Promise<Comment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/comments`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        parentCommentId: parentCommentId ?? null  // ← dan ini
      })
    }
  )

  const result = await parseApiResponse<{ data: Comment }>(response)
  return result.data
}

export async function getCommentCount(
  reportId: string
): Promise<number> {
  const comments = await getComments(reportId)
  return comments.length
}