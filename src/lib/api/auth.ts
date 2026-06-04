export async function login(
  email: string,
  password: string
) {

  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    )

  const data =
    await response.json()

  if (!response.ok) {
    throw new Error(
      data.message
    )
  }

  return data
}

export async function register(data: {
  username: string
  email: string
  password: string
  phoneNumber: string
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || "Register failed"
    )
  }

  return result
}