export async function saveReport(
  reportId: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/save`,
      {
        method: "POST",
        credentials: "include"
      }
    )

  const result =
    await response.text()

  console.log(
    response.status
  )

  console.log(
    result
  )

  if (!response.ok) {

    throw new Error(
      result
    )

  }

  return JSON.parse(result)
}

export async function unsaveReport(
  reportId: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/save`,
      {
        method: "DELETE",

        credentials: "include"
      }
    )

  if (!response.ok) {

    throw new Error(
      "Failed to unsave report"
    )

  }

  return response.json()
}