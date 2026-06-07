export async function updateProfile(
  username: string,
  email: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: "PATCH",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          username,
          email
        })
      }
    )

  if (!response.ok) {
    throw new Error(
      "Failed to update profile"
    )
  }

  const result =
    await response.json()

  return result.data
}